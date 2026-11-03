import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_IDENTITY,
  INITIAL_PROJECTS,
  TRAVEL_DESTINATIONS,
  PROFILE_PHOTO_PATH,
  clampSkillProgress,
  filterProjectsByCategory,
  validateContactForm,
  processTravelBooking,
} from './portfolioData';

test('personal identity uses foto.jpg and matches Benyamin Fernando Napitupulu specification', () => {
  assert.equal(INITIAL_IDENTITY.fullName, 'Benyamin Fernando Napitupulu');
  assert.equal(INITIAL_IDENTITY.currentClass, '11.1');
  assert.equal(INITIAL_IDENTITY.school, 'SMAN 1 Tualang');
  assert.equal(INITIAL_IDENTITY.profileImageUrl, 'foto.jpg');
  assert.equal(PROFILE_PHOTO_PATH, 'foto.jpg');
});

test('skill progress clamping preserves bounds [0, 100]', () => {
  assert.equal(clampSkillProgress(120), 100);
  assert.equal(clampSkillProgress(-15), 0);
  assert.equal(clampSkillProgress(78.4), 78);
});

test('project filtering returns expected subsets', () => {
  const all = filterProjectsByCategory(INITIAL_PROJECTS, 'all');
  assert.equal(all.length, 4);

  const systems = filterProjectsByCategory(INITIAL_PROJECTS, 'systems');
  assert.equal(systems.length, 1);
  assert.equal(systems[0].title, 'Travel Agency Management System');
});

test('contact form validation catches invalid fields and passes valid submission', () => {
  const invalid = validateContactForm({
    name: 'B',
    email: 'invalid-email',
    message: 'Short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Benyamin Fernando',
    email: 'benyamin@example.com',
    message: 'Hello Benyamin, I would love to connect regarding C++ and backend engineering!',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('C++ Travel Agency booking simulator validates balance and deducts total cost', () => {
  const dest = TRAVEL_DESTINATIONS[1];
  const failResult = processTravelBooking({
    currentBalanceIdr: 1000000,
    passengerName: 'Benyamin Fernando',
    destination: dest,
    guests: 1,
  });
  assert.equal(failResult.success, false);
  assert.equal(failResult.newBalanceIdr, 1000000);

  const okResult = processTravelBooking({
    currentBalanceIdr: 5000000,
    passengerName: 'Benyamin Fernando',
    destination: dest,
    guests: 2,
  });
  assert.equal(okResult.success, true);
  assert.equal(okResult.newBalanceIdr, 5000000 - 1850000 * 2);
  assert.ok(okResult.transaction);
  assert.equal(okResult.transaction.totalPriceIdr, 3700000);
});
