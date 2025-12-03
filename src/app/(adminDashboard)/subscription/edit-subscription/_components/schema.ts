import { z } from "zod";

export const subscriptionPlanSchema = z.object({
  planName: z
    .string()
    .min(1, "Plan name is required")
    .min(2, "Plan name must be at least 2 characters")
    .max(50, "Plan name must not exceed 50 characters"),
  cost: z
    .string()
    .refine(
      (val) => !isNaN(Number.parseFloat(val)) && Number.parseFloat(val) >= 0,
      "Cost must be a valid number greater than or equal to 0"
    ),
  members: z.string().min(1, "Members must be at least 1"),
  features: z
    .string()
    .min(1, "Features description is required")
    .min(10, "Features description must be at least 10 characters")
    .max(1000, "Features description must not exceed 1000 characters"),
});

export type SubscriptionPlanFormData = z.infer<typeof subscriptionPlanSchema>;
