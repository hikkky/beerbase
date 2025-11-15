export type Post = {
  title: string;
  content: string;
  author: string;
  date: string;
};

export const posts: Post[] = [
  {
    title: "Weekend Tap Takeover",
    content:
      "Local breweries unite for a collaborative tap list featuring experimental IPAs and crisp lagers.",
    author: "Hiroki",
    date: "2024/05/12",
  },
  {
    title: "Sour Flight Review",
    content:
      "Tasting notes from the new kettle sour lineup with plenty of berry, citrus, and tropical vibes.",
    author: "Mariko",
    date: "2024/05/10",
  },
  {
    title: "Barrel-Aged Secrets",
    content:
      "Behind the scenes at a small batch brewery aging stout in bourbon barrels for over a year.",
    author: "Ken",
    date: "2024/05/08",
  },
];
