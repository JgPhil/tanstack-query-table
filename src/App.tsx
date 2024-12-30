import { useQueryClient } from 'react-query';
// import { Card, CardContent, CardHeader } from './components/ui/card';
// import { Post } from './types/post';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { FormEvent, useRef, useState } from 'react';
import { Button } from './components/ui/button';
import { Combobox } from './ComboBox';
// import { User } from './types/user';
// import { getUsers } from './api/user';
import { useAddPost } from './api/post';
import { useUserTable } from './features/user/hooks/useUserTable';
import { DataTable } from './components/ui/data-tables';
import { useToast } from './hooks/use-toast';
import { usePostTable } from './features/post/hooks/usePostTable';
import { usersFacetedFiltersColumns } from './features/user/facetedFiltersColumns';

function App() {
  // Access the client
  const queryClient = useQueryClient();
  const [author, setAuthor] = useState<{ id: number; value: string } | null>();
  const titleRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const addPost = useAddPost();

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (author && titleRef.current) {
      addPost.mutate({
        title: titleRef.current.value,
        author_id: author.id,
        id: 0,
      });
      titleRef.current.value = '';
      setAuthor(null);
    }
  };

  const {
    usersData = [],
    usersColumns,
    isErrorUsers,
    isLoadingUsers,
    usersErrors,
    usersInitialState,
  } = useUserTable();

  const {
    postsData = [],
    postsErrors,
    isErrorPosts,
    isLoadingPosts,
    postsColumns,
  } = usePostTable();

  const handleChange = (value: any) => {
    if (!value?.id) return;
    setAuthor(value);
    queryClient.invalidateQueries(['posts', 'list']);
  };

  if (isLoadingUsers || isLoadingPosts) return <p>Loading...</p>;
  if (isErrorPosts) return <p>{postsErrors?.message}</p>;
  if (isErrorUsers) return <p>{usersErrors?.message}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <main className="w-full max-w-[1200px] max-h-[1400px] bg-gray-900 rounded-lg p-6 overflow-auto">
        <h1 className="text-2xl mb-4">Posts:</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Label>Titre</Label>
          <Input name="title" id={'title'} ref={titleRef} required />
          <Label>Auteur</Label>
          <Combobox
            items={usersData ? usersData.map(user => ({ id: user.id, value: user.firstName })) : []}
            onChange={handleChange}
            value={author}
            required={true}
            name={'author'}
          />
          <Button className="max-w-[100px]">Envoyer</Button>
        </form>
        <div className="mt-[2rem]">
          <DataTable data={postsData} columns={postsColumns} />
        </div>
        <div className="mt-[2rem]">
          <DataTable
            data={usersData}
            columns={usersColumns}
            facetedFilters={usersFacetedFiltersColumns}
            initialState={usersInitialState}
          />
        </div>
        <Button
          onClick={() =>
            toast({
              title: 'coucou',
              description: 'coucou',
            })
          }
        >
          Toast
        </Button>
      </main>
    </div>
  );
}

export default App;

