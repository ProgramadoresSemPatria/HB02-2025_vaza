import * as z from "zod";

const LoginFormSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export default LoginFormSchema;