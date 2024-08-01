'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

import { draw } from "./lib/api";
import { ActionRow, CardRow } from "./components";
import { CardData, DeckContext } from "./types";

const PLAYER_WIN_STRING = "You win!";
const DEALER_WIN_STRING = "Dealer wins."

type GameState = {
  dealerHand: CardData[]
  playerHand: CardData[]
  dealerHandSum: number
  playerHandSum: number
  gameIsOver: boolean
  winnerString: string
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    dealerHand: [],
    playerHand: [],
    dealerHandSum: 0,
    playerHandSum: 0,
    gameIsOver: false,
    winnerString: PLAYER_WIN_STRING
  });
  const [deckContext, setDeckContext] = useState<DeckContext>({
    deck_id: "",
    remaining: 0
  });

  const drawCards = async (numberOfCards: number): Promise<CardData[]> => {
    const drawData = await draw(deckContext, numberOfCards);
    setDeckContext(drawData.context);
    return drawData.cards;
  }

  const initialize = async () => {
    const cards = await drawCards(4);
    const dealerCards = cards.slice(0,2)
    const playerCards = cards.slice(2);
    setGameState({
      dealerHand: dealerCards,
      playerHand: playerCards,
      dealerHandSum: getHandSum(dealerCards),
      playerHandSum: getHandSum(playerCards),
      gameIsOver: false,
      winnerString: ""
    });
  }

  const getHandSum = (hand: CardData[]) => {
    let numAces = 0;
    const sumNoAces = hand.reduce((a,v) => {
      if (v.value === 'ACE') {
        numAces = numAces+1;
        return a;
      }
      return a + (parseInt(v.value) || 10);
    }, 0);
    let sum = sumNoAces + numAces;
    for (let i=0; i<numAces; i++) {
      if (sum+10 < 22) {
        sum = sum + 10;
      }
    }
    return sum;
  }

  const endGame = () => {
    let winnerString = PLAYER_WIN_STRING;
    if (gameState.playerHandSum > 21 ||
        gameState.dealerHandSum >= gameState.playerHandSum
    ) {
      winnerString = DEALER_WIN_STRING;
    }
    setGameState(Object.assign({}, gameState, { gameIsOver: true, winnerString }));
  }

  const onHitHandler = async () => {
    const cards = await drawCards(1);
    const playerHand = [...gameState.playerHand, cards[0]];
    const playerHandSum = getHandSum(playerHand);
    setGameState(Object.assign({}, gameState, { playerHand, playerHandSum }));
  }

  const onStandHandler = () => {
    setGameState(Object.assign({}, gameState, { gameIsOver: true }))
  }

  useEffect(() => {
    initialize();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (gameState.playerHandSum > 20) {
      endGame();
    }
  }, [gameState.playerHandSum]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="blackjack">
      <div className="gameOverNotification" style={{ display: (gameState.gameIsOver ? "flex" : "none") }}>
        <div className="winLoseMessage">
          {gameState.winnerString}
        </div>
        <div className="newGame">
          <button className="newGameBtn" onClick={initialize}>New Game</button>
        </div>
      </div>
      <div className="playerLabel">
        Dealer
      </div>
      <CardRow data={gameState.dealerHand} />
      <div className="playerLabel">
        You
      </div>
      <CardRow data={gameState.playerHand} />
      <ActionRow
        onHit={onHitHandler}
        onStand={endGame}
        disabled={gameState.gameIsOver}
      />
    </main>
  );
}
