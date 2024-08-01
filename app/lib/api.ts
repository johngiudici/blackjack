import { DeckContext, DrawResponse } from "../types";


const API_URL = "https://www.deckofcardsapi.com/api";
const DECK_COUNT = 1;

type ApiCardData = {
  images: {
    png: string
  },
  value: string,
  suit: string
};

export async function draw(context: DeckContext, numberOfCards: number): Promise<DrawResponse> {
  let deckId = context.deck_id;
  if (deckId.length < 1 || context.remaining < numberOfCards) {
    deckId = "new";
  }
  const res = await fetch(`${API_URL}/deck/${deckId}/draw/?count=${numberOfCards}&deck_count=${DECK_COUNT}`)

  const data = await res.json();

  return {
    context: {
      deck_id: data.deck_id,
      remaining: data.remaining
    },
    cards: data.cards.map((card: ApiCardData) => {
      return {
        image: card.images.png,
        value: card.value,
        suit: card.suit
      }
    })
  }
}
