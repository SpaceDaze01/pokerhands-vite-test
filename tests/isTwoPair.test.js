import { expect, test } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

const suits = '♥♦♣♠';


// isTwoPair
test('Test that isFullHouse returns truthy is two pair', () => {
  let hand = new Hand('♥7', '♦7', '♣5', '♠5', '♠3');
  expect(CompareHands.isTwoPair(hand)).toBeTruthy();
});