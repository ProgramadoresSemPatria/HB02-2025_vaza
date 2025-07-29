import * as z from "zod";

const RegisterFormSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required' }),
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

export default RegisterFormSchema;