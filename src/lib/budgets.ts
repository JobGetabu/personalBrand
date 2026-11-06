// Kept separate from the zod schema so the client bundle doesn't ship zod.
export const budgets = ["Not sure yet", "< $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Full-time role"] as const;
