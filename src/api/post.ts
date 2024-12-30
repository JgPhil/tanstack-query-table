import { useMutation, useQueryClient } from 'react-query';
import { Post } from '@/types/post';

const BASE_URL = 'http://localhost:3010';

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();
  return data;
};

export const addPost = async (newPost: Post) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  return response.json();
};

export const postQueriesKeys = {
  all: () => ['post'],
  list: () => [...postQueriesKeys.all(), 'list'],
  byId: (postId: number) => [...postQueriesKeys.all(), postId],
  // withFilters: (filters: any[]) => [...userQueriesKeys.list(), ...filters],
  // withSort: (sort: any[]) => [...userQueriesKeys.list(), ...sort],
};

export const useAddPost = () => {
  const queryClient = useQueryClient();

  const getNextId = (): number => {
    const posts = queryClient.getQueryData<Post[]>(postQueriesKeys.list());
    return posts?.length ? Math.max(...posts.map(post => post.id)) + 1 : 1;
  };

  return useMutation({
    mutationFn: async (vars: Post) => {
      const newPost = { ...vars, id: getNextId() };
      return addPost(newPost); // Envoie du post avec le bon ID
    },
    onMutate: async (vars: Post) => {
      const newPost = { ...vars, id: getNextId() };

      queryClient.setQueryData<Post[]>(postQueriesKeys.list(), oldPosts =>
        oldPosts ? [...oldPosts, newPost] : [newPost]
      );

      return { previousPosts: queryClient.getQueryData<Post[]>(postQueriesKeys.list()) };
    },
    onError: (error, vars, context) => {
      console.error('Error:', error);

      if (context?.previousPosts) {
        queryClient.setQueryData(postQueriesKeys.list(), context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(postQueriesKeys.list());
    },
  });
};

