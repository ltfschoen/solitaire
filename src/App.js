import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';

// Components
import Stack from './components/Stack';
import playingCards from './lib/playing-cards';
import deck from './lib/stacks';
import {canMoveCardToStack} from './lib/util';

class App extends Component {

  state = {
    stacks: deck,
    gameOver: false,
    timerId: null,
    gameTimer: null
  }

  startTimer() {
    if(!this.timerId){     
      this.timerId = setInterval(()=>{
        this.setState(({gameTimer}) => ({gameTimer: gameTimer + 1}));
      }, 1000);
    }
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }
  
  stopTimer() {
    clearInterval(this.timerId);
  }

  turnDeck = () => {
    this.setState(({stacks}) => {
      if(stacks[0].cards.length === 0 && stacks[1].cards.length === 0) {
        return null;
      }

      if(stacks[0].cards.length === 0) {
        stacks[0].cards = stacks[1].cards;
        stacks[0].cards.forEach(c => c.flipped = true);
        stacks[1].cards = [];
        return {
          stacks
        };
      }

      const cards = stacks[0].cards.splice(0, 1);
      cards[cards.length -1].flipped = false;
      stacks[1].cards.forEach(c => c.flipped = true);
      stacks[1].cards = [...stacks[1].cards, ...cards];
      
      return {
        stacks
      };
    });
  }

  flipLastCard = (fromStack) => {
    this.setState(({stacks}) => {
      switch(fromStack) {
        case 0:
        case 1:
          if(stacks[1].cards.length > 0) {
            stacks[1].cards[stacks[1].cards.length - 1].flipped = false;
            return stacks;
          }
          return null;
        case 2:
        case 3:
        case 4:
        case 5:
          return null;
        default:
      };

      stacks[fromStack].cards.forEach(card => {
          const lastCard = _.last(stacks[fromStack].cards);
          if(card.id === lastCard.id ) {
            card.flipped = false;
          }
      })    
    
      return {
        stacks  
      };
    }, () => {
      const currentStacks = this.state.stacks.filter((s,i) => i > 1 && i < 6);
      let win = true;

      currentStacks.forEach(stack => {
        if(stack.cards.length !== 12) {
          win = false;
        }
      })

      if(win) {
        this.setState({
          gameOver: true
        }, () => {this.stopTimer() });
      };
    })
  }

  moveCards = (id, fromStack, toStack) => {
    console.log(`moveCards with id: ${id}`);
    this.setState(({stacks}) => {
      const card = playingCards.find(c => (c.id === id))

      if(!canMoveCardToStack(stacks[toStack].cards, card, toStack)) {
        return null;
      }

      let cards = [];

      // mutate stack
      switch(fromStack) {
        case 2:
        case 3:
        case 4:
        case 5:
          // pull last one
          cards = [stacks[fromStack].cards.pop()]
        break;
        default:
          cards = _.remove(stacks[fromStack].cards, (c) => {
            return c.value <= card.value && c.flipped === false
          })
      }

      stacks[toStack].cards = [...stacks[toStack].cards, ...cards];

      return {
        stacks
      };

    }, () => {
      this.flipLastCard(fromStack);
    });
  }

  render() {
    const {stacks, gameOver, gameTimer} = this.state;
    if(gameOver) {
      return (
        <div style={{color: 'white'}}>
          YOU WON! with: {Math.floor(gameTimer / 60)} minutes {Math.floor(gameTimer / 60 / 60)} minutes
        </div>
      );
    }

    const minutes = Math.floor(gameTimer / 60);
    return (
      <div className="App">
        <h2 className="timer">
          React "Solitaire" App built by Ruegen Aschenbrenner — {' '}
          {minutes} {minutes === 1 ? 'minute' : 'minutes'}, {Math.floor(gameTimer%60)} seconds
        </h2>
        <div className="deck" >
          <div onClick={()=> {this.turnDeck()}} >
            <Stack pushToStack={()=>{}} stack={0} cards={stacks[0].cards} />
          </div>
          <Stack pushToStack={this.moveCards} stack={1} cards={stacks[1].cards} />
        </div>

        <div className="stacks"> 
          <Stack pushToStack={this.moveCards} stack={2} cards={stacks[2].cards} />
          <Stack pushToStack={this.moveCards} stack={3} cards={stacks[3].cards} />
          <Stack pushToStack={this.moveCards} stack={4} cards={stacks[4].cards} />
          <Stack pushToStack={this.moveCards} stack={5} cards={stacks[5].cards} />
        </div>

        <div className="piles"> 
          <Stack pushToStack={this.moveCards} stack={6} topOffset cards={stacks[6].cards} />
          <Stack pushToStack={this.moveCards} stack={7} topOffset cards={stacks[7].cards} />
          <Stack pushToStack={this.moveCards} stack={8} topOffset cards={stacks[8].cards} />
          <Stack pushToStack={this.moveCards} stack={9} topOffset cards={stacks[9].cards} />
          <Stack pushToStack={this.moveCards} stack={10} topOffset cards={stacks[10].cards} />
          <Stack pushToStack={this.moveCards} stack={11} topOffset cards={stacks[11].cards} />
          <Stack pushToStack={this.moveCards} stack={12} topOffset cards={stacks[12].cards} />
          <Stack pushToStack={this.moveCards} stack={13} topOffset cards={stacks[13].cards} />
        </div>
      </div>
    );
  }
}

export default App;
