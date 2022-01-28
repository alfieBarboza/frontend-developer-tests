export type User = {
  email: string,
  location: {
    country: string,
    city: string,
    state: string
  },
  name: {
    first: string,
    last: string
  },
  registered: {
    date: string
  },
  gender: string
};

export type Country = {
  name: string,
  qty: number
};