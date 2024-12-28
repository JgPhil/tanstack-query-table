import { useMutation, useQueryClient } from 'react-query';
import { Post } from '@/types/post';

const BASE_URL = 'http://localhost:3010';

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();
  console.log('🚀 ~ data:', data);
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

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPost,
    onMutate: (vars: Post) => {
      const posts = queryClient.getQueryData<Post[]>('posts') as Post[];
      const maxId = Math.max(...posts.map(post => post.id));
      return { ...vars, id: maxId + 1 };
    },
    onSuccess: () => queryClient.invalidateQueries(['post', 'list']),
    onError: e => console.log('error:', e),
  });
};

