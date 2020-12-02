const SUITS = ["hearts", "diamonds", "clubs", "spades"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export default function getCards() {
  const cards = [];
  SUITS.forEach((suit) => {
    VALUES.forEach((value) => {
      cards.push({ suit, value });
    });
  });
  return cards;
}
