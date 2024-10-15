import { expect, test } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

const suits = '♥♦♣♠';

// Will fail since no code written in Compare Hands yet for the method
// isFullHouse
test('Test that isFullHouse returns truthy is three- and two of a kind', () => {
  let hand = new Hand('♥7', '♦7', '♣7', '♠3', '♠3');
  expect(CompareHands.isFullHouse(hand)).toBeTruthy();
});