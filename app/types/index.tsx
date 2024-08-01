export type CardData = {
  image: string
  value: string
  suit: "CLUBS" | "DIAMONDS" | "HEARTS" | "SPADES"
}

export type DeckContext = {
  deck_id: string
  remaining: number
}

export type DrawResponse = {
  context: DeckContext
  cards: CardData[]
}
