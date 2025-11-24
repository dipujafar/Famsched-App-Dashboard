import * as z from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email")
    .refine((value) => {
      // Check if it's a valid email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Check if it's a valid phone number (basic validation)
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }, "Please enter a valid email address or phone number"),
  password: z
    .string()
    .min(1, "Password is required")
});

export type LoginFormValues = z.infer<typeof loginSchema>;
