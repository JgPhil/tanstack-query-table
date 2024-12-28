import { User } from '@/types/user';

const BASE_URL = 'http://localhost:3010';

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  return data;
};

export const addUser = async (newUser: User) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    throw new Error('Failed to add user');
  }

  return response.json();
};

export const userQueriesKeys = {
  all: () => ['users'],
  list: () => [...userQueriesKeys.all(), 'list'],
  byId: (userId: number) => [...userQueriesKeys.all(), userId],
  // withFilters: (filters: any[]) => [...userQueriesKeys.list(), ...filters],
  // withSort: (sort: any[]) => [...userQueriesKeys.list(), ...sort],
};

