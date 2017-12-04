import _ from 'lodash';
import {flipCard} from './util';
import cards from './playing-cards';


const piles = [1,2,3,4,5,6,7,8];
const deck = _.shuffle(cards);
const stacks = [];

piles.forEach(n => {
  stacks.push(deck.splice(0, n).map((card, index, array) => flipCard(card, index, array.length)));
});

export default [
	{stack: 0, cards: deck },
	{stack: 1, cards: [] },

	{stack: 2, cards: [] },
	{stack: 3, cards: [] },
	{stack: 4, cards: [] },
	{stack: 5, cards: [] },

	{stack: 6, cards: stacks[0] },
	{stack: 7, cards: stacks[1] },
	{stack: 8, cards: stacks[2] },
	{stack: 9, cards: stacks[3] },
	{stack: 10, cards: stacks[4] },
	{stack: 11, cards: stacks[5] },
	{stack: 12, cards: stacks[6] },
	{stack: 13, cards: stacks[7] }
];
