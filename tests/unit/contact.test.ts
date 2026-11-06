import { describe, expect, it } from "vitest";
import { ContactSchema } from "@/lib/contact-schema";

const valid = { name: "Ada", email: "ada@example.com", message: "We need a React Native app rebuilt for scale.", budget: "Not sure yet" };

describe("contact schema", () => {
  it("accepts a valid message", () => {
    expect(ContactSchema.safeParse(valid).success).toBe(true);
  });
  it("rejects a bad email and a short message", () => {
    const r = ContactSchema.safeParse({ ...valid, email: "nope", message: "hi" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues.map((i) => i.path[0]).sort()).toEqual(["email", "message"]);
  });
  it("flags the honeypot", () => {
    const r = ContactSchema.safeParse({ ...valid, website: "spam.example" });
    expect(r.success).toBe(false);
  });
  it("rejects unknown budgets", () => {
    expect(ContactSchema.safeParse({ ...valid, budget: "a million" }).success).toBe(false);
  });
});
