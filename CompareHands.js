export default class CompareHands {

  static suits = '♥♦♣♠';
  static ranks = '23456789TJQKA';

  // return the winning hand
  static comparer(hand1, hand2) {

    let comparers = [
      'isStraightFlush',
      'isFourOfAKind',
      'isFullHouse',
      'isFlush',
      'isStraight',
      'isThreeOfAKind',
      'isTwoPair',
      'isOnePair',
      'isHighestCard'
    ];

    for (let comparer of comparers) {
      let hand1Score = this[comparer](hand1);
      let hand2Score = this[comparer](hand2);
      console.log(comparer, 'hand1Score', hand1Score, 'hand2Score', hand2Score);
      // nobody has this kind combination - continue to next comparer
      if (hand1Score === 0 && hand2Score === 0) { continue; }
      // at least has one hand has this kind of combination
      // which hand won?
      if (hand1Score === hand2Score) { return [hand1, hand2]; }
      else if (hand1Score > hand2Score) { return hand1; }
      else { return hand2; }
    }

  }

  static isStraightFlush(hand) {
    // if not straight or not flush -> 0
    // otherwise score of flush
    return this.isStraight(hand) && this.isFlush(hand);
  }

  static isFourOfAKind(hand) {
    const rankCounts = {};

    // Räkna antalet kort per rang
    for (let card of hand.cards) {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    }

    // Kontrollera om det finns fyra kort med samma rang
    for (let rank in rankCounts) {
      if (rankCounts[rank] === 4) {
        return this.rankToPoint(rank) * 4; // Returnera poängen för fyra av samma rang
      }
    }

    return 0; // Ingen Four of a Kind hittades
  }


  static isFullHouse(hand) {
    const rankCounts = {};

    // Räkna antalet kort per rang
    for (let card of hand.cards) {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    }

    let hasThree = false;
    let hasTwo = false;

    // Kontrollera om det finns en rang med tre och en rang med två
    for (let count of Object.values(rankCounts)) {
      if (count === 3) {
        hasThree = true;
      } else if (count === 2) {
        hasTwo = true;
      }
    }

    return (hasThree && hasTwo) ? 1 : 0; // Returnera 1 om det finns både tre och två, annars 0
  }


  static isFlush(hand) {
    let suits = [];
    for (let card of hand.cards) {
      suits.push(card.suit);
    }
    // not a flush -> 0
    if ([...new Set(suits)].length !== 1) {
      return 0;
    }
    // return points depending of strength of flush
    this.sortByRank(hand);
    let score = 0, counter = 0;
    for (let card of hand.cards) {
      score += this.rankToPoint(card.rank) * 10 ** counter;
      counter += 2;
    }
    return score;
  }

  static isStraight(hand) {
    // sort from low to high
    this.sortByRank(hand);
    // get the ranks of the cards
    let ranks = '';
    for (let card of hand.cards) {
      ranks += card.rank;
    }
    // if both 2 and A then place A first
    if (ranks.includes('2') && ranks.includes('A')) {
      ranks = 'A' + ranks.slice(0, 4);
    }
    // not a straight -> 0
    if (!('A' + this.ranks).includes(ranks)) { return 0; };
    // return points depending on strength of straight
    return this.rankToPoint(ranks[4]);
  }

  
  static isThreeOfAKind(hand) {
    const rankCounts = {};

    // Räkna antalet kort per rang
    for (let card of hand.cards) {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    }

    // Kontrollera om det finns tre kort med samma rang
    for (let rank in rankCounts) {
      if (rankCounts[rank] === 3) {
        return this.rankToPoint(rank) * 3; // Returnera poängen för tre av samma rang
      }
    }

    return 0; // Ingen Three of a Kind hittades
  }


  static isTwoPair(hand) {
    const rankCounts = {};

    // Räkna antalet kort per rang
    for (let card of hand.cards) {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    }

    let pairs = 0;

    // Kontrollera antalet par
    for (let count of Object.values(rankCounts)) {
      if (count === 2) {
        pairs++;
      }
    }

    return pairs === 2 ? 1 : 0; // Returnera 1 om det finns exakt två par, annars 0
  }


  static isOnePair(hand) {
    const rankCounts = {};

    // Räkna antalet kort per rang
    for (let card of hand.cards) {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    }

    let hasPair = false;

    // Kontrollera om det finns ett par
    for (let count of Object.values(rankCounts)) {
      if (count === 2) {
        hasPair = true;
        break; // Ingen anledning att fortsätta om vi redan har ett par
      }
    }

    return hasPair ? 1 : 0; // Returnera 1 om det finns ett par, annars 0
  }



  static isHighestCard(hand) {
    this.sortByRank(hand);
    return this.rankToPoint(hand.cards[hand.cards.length - 1].rank); // Returnera högsta kortets värde
  }

  // helper functions below:

  static rankToPoint(rank) {
    return this.ranks.indexOf(rank) + 2;
  }

  static sortByRank(hand) {
    hand.cards = hand.cards.sort((a, b) => {
      return this.rankToPoint(a.rank) < this.rankToPoint(b.rank) ?
        -1 : 1;
    });
  }


}

