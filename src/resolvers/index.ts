const books = [
  {
    title: 'The Awakening',
    description: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    description: 'Paul Auster',
  },
];

export const Resolvers = {
  Query: {
    articles: () => books,
  },
};
