import { z } from "zod";

import { budgets } from "./budgets";
export { budgets };

export const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please tell me your name.").max(100),
  company: z.string().trim().max(120).optional().default(""),
  email: z.email("Please enter a valid email so I can reply.").max(200),
  budget: z.enum(budgets).optional().default("Not sure yet"),
  message: z.string().trim().min(20, "A couple of sentences helps (20+ characters).").max(4000),
  // Spam traps
  website: z.string().max(0).optional().default(""),
  startedAt: z.coerce.number().optional(),
  "cf-turnstile-response": z.string().max(4096).optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;
