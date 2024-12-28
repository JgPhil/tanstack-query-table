import z from 'zod';

export const UserSchema = z.object({
  id: z.number().int(),
  lastName: z.string().min(2),
  firstName: z.string().min(2),
  age: z.number().int().min(18, 'The author must be an adult !'),
  email: z.string().email('Merci de renseigner un email valide !'),
  city: z.string().min(2),
});

export type User = z.infer<typeof UserSchema>;

