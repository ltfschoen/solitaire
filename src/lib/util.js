export function flipCard(card, index, length) {
  if(index === (length - 1)) {
    return {
      ...card,
      flipped: !card.flipped
    };
  } else {
    return card;
  }
}

export function isNextCard(lastCard, card) {
  // 2 < 8 && 2 > (8 - 2)
  // 7 < 8 && 7 > (6)
  return card.value < lastCard.value && card.value >= (lastCard.value - 1);
}

export function canMoveCardToStack(cards, card, stack) {
  console.log(`stack: ${JSON.stringify(stack, null, 2)}`);
  console.log(`card: ${JSON.stringify(card, null, 2)}`);
  console.log(`cards: ${JSON.stringify(cards, null, 2)}`);

  const lastCard = cards[cards.length - 1];
  
  // place card on empty stack if ace
  switch(stack) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      if(cards.length === 0 && card.value === 1) {
        return true;
      }
    
      if(cards.length === 0 && card.value !== 1) {
        console.log('not ace and empty');
        return false;
      }

      if(!isNextCard(card, lastCard)){ 
        console.log('not next card');
        return false;
      } 

      if(lastCard.color !== card.color) {
        console.log('err matching colours!');
        return false;
      }

      if(lastCard.stuit !== card.stuit) {
        console.log('err matching suits!');
        return false;
      }
    break;
    default:
  }

  switch(stack) {
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
      if(cards.length === 0 && card.value === 13) {
        return true;
      }
  
      if(cards.length === 0 && card.value !== 13) {
        console.log('not king and empty');
        return false;
      }

      if(!isNextCard(lastCard, card)){ 
        console.log('not next card');
        return false;
      }
      
      if(lastCard.color === card.color) {
        console.log('err matching colours!');
        return false;
      }
    break;
    default:
  }
  return true;
}
