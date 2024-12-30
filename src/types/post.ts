import z from 'zod';

export const PostSchema = z.object({
  id: z.number().int(),
  title: z.string().min(2),
  author_id: z.number().int(),
});

export type Post = z.infer<typeof PostSchema>;

