import React from 'react';
import { Draggable } from 'react-drag-and-drop';
import './Card.css';

export default function Card({
	id,
	flipped,
	stack,
	position,
	topOffset = 0,
	leftOffset
}) {
  const [left, top] = position;

	// const flip = flipped && leftOffset === 0
	const cardStyle = {
		backgroundPosition: flipped ?  '0px -560px' : `${left}px ${top}px`,
		top: `${topOffset}px`,
		left: `${leftOffset}px`
	};
	
	if(flipped) {
		return (
			<div className="card" style={cardStyle} />
		);
	}

	return (
		<Draggable type="card" data={`${id}, ${stack}`}>
			<div className="card" style={cardStyle} />
		</Draggable>
	);
}
