import React from 'react';
import {Droppable} from 'react-drag-and-drop';
import './Stack.css';
import Card from './Card';

function Stack({
		cards, 
		stack, 
		topOffset=false, 
		leftOffset=false,
		pushToStack
	}) {
		const stackOfCards = cards.map((card, index) => {
			const offSet = topOffset ? (index * 40) : 0;
			let offsetLeft = 0;

			if(leftOffset && index === (cards.length - 3)) {
				offsetLeft = 20;
			} else if(leftOffset && index === (cards.length - 2)) {
				offsetLeft = 50;
			} else if(leftOffset && index === (cards.length - 1)) {
				offsetLeft = 80;
			}

			return (
				<Card 
					key={card.id} 
					{...card}
					leftOffset={offsetLeft} 
					topOffset={offSet} 
					stack={stack} 
				/>
			);
		})

		return (
			<Droppable types={['card']} onDrop={({card}) => {
				const [id, fromStack] = card.split(',').map(x => parseInt(x,10))
				pushToStack(id, fromStack, stack)
				}}>
				<div className="stack">
						{stackOfCards}
				</div>
			</Droppable>
		);
}

export default Stack;
