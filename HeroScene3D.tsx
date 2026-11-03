import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type MaterialFinishPreset = 'obsidian' | 'silver' | 'wireframe';

interface HeroScene3DProps {
  finishPreset: MaterialFinishPreset;
}

const _dummyObj = new THREE.Object3D();
const _targetRot = new THREE.Vector2(0, 0);

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
    grad.addColorStop(0.55, 'rgba(8, 9, 11, 0.32)');
    grad.addColorStop(1, 'rgba(8, 9, 11, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createBrushedMetalRoughnessTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#404040';
    ctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 2) {
      const shade = 45 + ((y * 17) % 38);
      ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
      ctx.fillRect(0, y, 256, 1);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  return tex;
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ finishPreset }) => {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const presetRef = useRef<MaterialFinishPreset>(finishPreset);
  const [webglAvailable, setWebglAvailable] = useState(true);

  const materialsRef = useRef<{
    primaryShell?: THREE.MeshPhysicalMaterial;
    secondaryShell?: THREE.MeshPhysicalMaterial;
    coreMesh?: THREE.MeshStandardMaterial;
    ringMat?: THREE.MeshPhysicalMaterial;
  }>({});

  useEffect(() => {
    presetRef.current = finishPreset;
    const mats = materialsRef.current;
    if (!mats.primaryShell || !mats.secondaryShell || !mats.coreMesh || !mats.ringMat) return;

    if (finishPreset === 'obsidian') {
      mats.primaryShell.color.setHex(0x0b0d11);
      mats.primaryShell.roughness = 0.09;
      mats.primaryShell.metalness = 0.96;
      mats.primaryShell.wireframe = false;

      mats.secondaryShell.color.setHex(0xc4c9d0);
      mats.secondaryShell.roughness = 0.22;
      mats.secondaryShell.metalness = 0.94;
      mats.secondaryShell.wireframe = false;

      mats.coreMesh.wireframe = false;
      mats.ringMat.wireframe = false;
    } else if (finishPreset === 'silver') {
      mats.primaryShell.color.setHex(0xd8dde4);
      mats.primaryShell.roughness = 0.14;
      mats.primaryShell.metalness = 0.98;
      mats.primaryShell.wireframe = false;

      mats.secondaryShell.color.setHex(0x1b1f24);
      mats.secondaryShell.roughness = 0.28;
      mats.secondaryShell.metalness = 0.88;
      mats.secondaryShell.wireframe = false;

      mats.coreMesh.wireframe = false;
      mats.ringMat.wireframe = false;
    } else {
      mats.primaryShell.color.setHex(0xc4c9d0);
      mats.primaryShell.wireframe = true;
      mats.secondaryShell.color.setHex(0x71869b);
      mats.secondaryShell.wireframe = true;
      mats.coreMesh.wireframe = true;
      mats.ringMat.wireframe = true;
    }
  }, [finishPreset]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglAvailable(false);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const width = container.clientWidth || 720;
    const height = container.clientHeight || 640;
    renderer.setSize(width, height);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglAvailable(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090b, 0.065);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 7.2);
    camera.lookAt(0, 0, 0);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    const hemiLight = new THREE.HemisphereLight(0xdce6f2, 0x08090b, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xf6f7f9, 2.6);
    keyLight.position.set(4.5, 6.0, 5.0);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -4;
      keyLight.shadow.camera.right = 4;
      keyLight.shadow.camera.top = 4;
      keyLight.shadow.camera.bottom = -4;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x88a8cc, 2.2);
    rimLight.position.set(-5.5, 2.5, -4.0);
    scene.add(rimLight);

    const seamLightCyan = new THREE.PointLight(0x38bdf8, 3.2, 5.5);
    seamLightCyan.position.set(-0.6, 1.45, 0.9);
    scene.add(seamLightCyan);

    const seamLightViolet = new THREE.PointLight(0x818cf8, 2.6, 5.0);
    seamLightViolet.position.set(0.5, 1.2, 0.6);
    scene.add(seamLightViolet);

    const seamLightAmber = new THREE.PointLight(0xf59e0b, 1.6, 4.5);
    seamLightAmber.position.set(-0.9, -0.7, 1.2);
    scene.add(seamLightAmber);

    const brushedRoughness = createBrushedMetalRoughnessTexture();
    brushedRoughness.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // PART 1: Primary silhouette — Cleaved Dark Obsidian Chrome Hemisphere Shell
    const primaryShellGeo = new THREE.SphereGeometry(
      1.78,
      48,
      48,
      0,
      Math.PI * 1.38,
      0.12,
      Math.PI * 0.88
    );
    const primaryShellMat = new THREE.MeshPhysicalMaterial({
      color: 0x0b0d11,
      metalness: 0.96,
      roughness: 0.09,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      iridescence: 0.75,
      iridescenceIOR: 1.4,
      side: THREE.DoubleSide,
    });
    const primaryShellMesh = new THREE.Mesh(primaryShellGeo, primaryShellMat);
    primaryShellMesh.rotation.set(0.35, -0.45, 0.25);
    primaryShellMesh.castShadow = !isSoftwareGl;
    primaryShellMesh.receiveShadow = !isSoftwareGl;
    sculptureGroup.add(primaryShellMesh);

    // PART 2: Secondary read — Counter-nested Brushed Silver Spherical Fin
    const secondaryShellGeo = new THREE.SphereGeometry(
      1.62,
      48,
      48,
      Math.PI * 1.15,
      Math.PI * 0.95,
      0.18,
      Math.PI * 0.82
    );
    const secondaryShellMat = new THREE.MeshPhysicalMaterial({
      color: 0xc4c9d0,
      metalness: 0.94,
      roughness: 0.22,
      roughnessMap: brushedRoughness,
      anisotropy: 0.8,
      anisotropyRotation: 0.5,
      clearcoat: 0.6,
      side: THREE.DoubleSide,
    });
    const secondaryShellMesh = new THREE.Mesh(secondaryShellGeo, secondaryShellMat);
    secondaryShellMesh.rotation.set(-0.28, 0.5, -0.2);
    sculptureGroup.add(secondaryShellMesh);

    // PART 3: Detached Floating Upper Crescent Wing
    const wingGeo = new THREE.SphereGeometry(
      1.86,
      36,
      24,
      Math.PI * 0.68,
      Math.PI * 0.34,
      0.25,
      Math.PI * 0.32
    );
    const wingMesh = new THREE.Mesh(wingGeo, secondaryShellMat);
    wingMesh.position.set(-0.22, 0.18, 0.08);
    wingMesh.rotation.set(0.42, 0.22, 0.38);
    sculptureGroup.add(wingMesh);

    // PART 4: Inner Recessed Faceted Icosahedral Core
    const coreGeo = new THREE.IcosahedronGeometry(1.06, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x161a20,
      metalness: 0.65,
      roughness: 0.62,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);

    // PART 5: Inner Prismatic Cleft Seam Ring
    const seamRingGeo = new THREE.TorusGeometry(1.36, 0.045, 24, 96);
    const seamRingMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1f2f4,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.42,
      metalness: 0.9,
      roughness: 0.1,
      iridescence: 1.0,
      iridescenceIOR: 1.5,
    });
    const seamRingMesh = new THREE.Mesh(seamRingGeo, seamRingMat);
    seamRingMesh.rotation.set(1.05, 0.42, -0.3);
    sculptureGroup.add(seamRingMesh);

    // PART 6: Precision Lower Orbital Rim Ring
    const orbitalRingGeo = new THREE.TorusGeometry(1.94, 0.016, 16, 120);
    const orbitalRingMat = new THREE.MeshPhysicalMaterial({
      color: 0xe2e6ec,
      metalness: 0.98,
      roughness: 0.12,
    });
    const orbitalRingMesh = new THREE.Mesh(orbitalRingGeo, orbitalRingMat);
    orbitalRingMesh.position.set(0.05, -0.45, 0);
    orbitalRingMesh.rotation.set(1.28, -0.22, 0.15);
    sculptureGroup.add(orbitalRingMesh);

    // PART 7: Secondary Equatorial Gimbal Arc
    const gimbalArcGeo = new THREE.TorusGeometry(2.12, 0.01, 12, 100, Math.PI * 1.25);
    const gimbalArcMesh = new THREE.Mesh(gimbalArcGeo, orbitalRingMat);
    gimbalArcMesh.rotation.set(-0.85, 0.65, 0.4);
    sculptureGroup.add(gimbalArcMesh);

    materialsRef.current = {
      primaryShell: primaryShellMat,
      secondaryShell: secondaryShellMat,
      coreMesh: coreMat,
      ringMat: orbitalRingMat,
    };

    // PART 8: Instanced Floating Metallic Micro-Particles
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 16 : 28;
    const particleGeo = new THREE.OctahedronGeometry(0.038, 0);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xc4c9d0,
      metalness: 0.92,
      roughness: 0.18,
    });
    const particleInstanced = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    const particleOrbits: {
      radius: number;
      angle: number;
      speed: number;
      yOffset: number;
      scale: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.25 + (i % 7) * 0.24;
      const angle = (i / particleCount) * Math.PI * 2;
      const speed = 0.08 + (i % 5) * 0.025;
      const yOffset = ((i % 9) - 4) * 0.35;
      const scale = 0.75 + (i % 4) * 0.18;
      particleOrbits.push({ radius, angle, speed, yOffset, scale });

      _dummyObj.position.set(
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius
      );
      _dummyObj.scale.setScalar(scale);
      _dummyObj.updateMatrix();
      particleInstanced.setMatrixAt(i, _dummyObj.matrix);
    }
    particleInstanced.instanceMatrix.needsUpdate = true;
    particleInstanced.computeBoundingSphere();
    scene.add(particleInstanced);

    const shadowTex = createContactShadowTexture();
    const shadowPlaneGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.35;
    scene.add(shadowPlane);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 720;
      const newH = container.clientHeight || 640;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', onResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync =
        gl && typeof gl.fenceSync === 'function'
          ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0)
          : null;
      if (gl && typeof gl.flush === 'function') gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!prefersReducedMotion) {
        elapsed += dt;
        const dampFactor = 1 - Math.exp(-4.5 * dt);
        _targetRot.x = THREE.MathUtils.lerp(_targetRot.x, pointerY * 0.28, dampFactor);
        _targetRot.y = THREE.MathUtils.lerp(_targetRot.y, pointerX * 0.38, dampFactor);

        sculptureGroup.position.y = Math.sin(elapsed * 1.15) * 0.11;
        sculptureGroup.rotation.y = elapsed * 0.22 + _targetRot.y;
        sculptureGroup.rotation.x = _targetRot.x + Math.cos(elapsed * 0.7) * 0.06;

        secondaryShellMesh.rotation.y = 0.5 - elapsed * 0.14;
        coreMesh.rotation.x = elapsed * 0.32;
        coreMesh.rotation.z = elapsed * 0.18;
        orbitalRingMesh.rotation.z = 0.15 + elapsed * 0.25;
        gimbalArcMesh.rotation.y = 0.65 - elapsed * 0.2;

        for (let i = 0; i < particleCount; i++) {
          const p = particleOrbits[i];
          const currentAngle = p.angle + elapsed * p.speed;
          _dummyObj.position.set(
            Math.cos(currentAngle) * p.radius,
            p.yOffset + Math.sin(elapsed * 1.2 + i) * 0.08,
            Math.sin(currentAngle) * p.radius
          );
          _dummyObj.rotation.set(elapsed * 0.4, currentAngle, 0);
          _dummyObj.scale.setScalar(p.scale);
          _dummyObj.updateMatrix();
          particleInstanced.setMatrixAt(i, _dummyObj.matrix);
        }
        particleInstanced.instanceMatrix.needsUpdate = true;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);

      primaryShellGeo.dispose();
      primaryShellMat.dispose();
      secondaryShellGeo.dispose();
      secondaryShellMat.dispose();
      wingGeo.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      seamRingGeo.dispose();
      seamRingMat.dispose();
      orbitalRingGeo.dispose();
      orbitalRingMat.dispose();
      gimbalArcGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      shadowPlaneGeo.dispose();
      shadowPlaneMat.dispose();
      shadowTex.dispose();
      brushedRoughness.dispose();
      envTexture.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglAvailable) {
    return (
      <div
        data-testid="hero-3d-fallback"
        className="w-full h-full flex items-center justify-center p-8"
      >
        <div className="relative w-72 h-72 rounded-full bg-gradient-to-br from-[#1B1F24] via-[#08090B] to-[#121417] border border-[#C4C9D0]/30 shadow-2xl flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-[#71869B]/40 rotate-45" />
          <span className="font-mono-tech text-xs tracking-widest text-[#C4C9D0]/70 uppercase">
            BFN · 3D Core
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={canvasMountRef}
      data-testid="hero-3d-canvas"
      aria-label="Interactive 3D metallic geometric sculpture centerpiece"
      className="w-full h-full min-h-[380px] lg:min-h-[600px] cursor-grab active:cursor-grabbing"
    />
  );
};
