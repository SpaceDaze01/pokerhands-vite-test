import { expect, test } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

const suits = '♥♦♣♠';


// isOnePair
test('Test that isFullHouse returns truthy is one pair', () => {
  let hand = new Hand('♥7', '♦7', '♣4', '♠5', '♠3');
  expect(CompareHands.isOnePair(hand)).toBeTruthy();
});

