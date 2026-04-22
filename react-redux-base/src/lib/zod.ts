import { z } from 'zod';

// ── Reusable field schemas ────────────────────────────────────────────────────

export const emailSchema = z.string().min(1, 'Email is required').email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password is too long');

// ── Form schemas ──────────────────────────────────────────────────────────────

/** Login form */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginSchema = z.infer<typeof loginSchema>;

/** Registration form with confirm password */
export const registerSchema = loginSchema
  .extend({
    name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type RegisterSchema = z.infer<typeof registerSchema>;
