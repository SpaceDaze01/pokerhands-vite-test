import { expect, test } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

const suits = '♥♦♣♠';


// isHighestCard
test('Test that isHighestCard returns truthy is highest cards', () => {
  let hand = new Hand('♥K', '♦Q', '♣J', '♠10', '♠9');
  expect(CompareHands.isHighestCard(hand)).toBeTruthy();
});