import { describe, expect, it } from "vitest";
import { getAllWork } from "@/lib/work";
import { media } from "@/lib/media";
import { site, socials } from "@/lib/site";

describe("case studies", () => {
  const work = getAllWork();
  it("loads six valid case studies in order", () => {
    expect(work.map((w) => w.slug)).toEqual(["wer1", "getmyboat", "sendy", "kazi", "shackle", "360score"]);
  });
  it("every cover exists in the media map", () => {
    for (const w of work) expect(media[w.cover]).toBeDefined();
  });
  it("keeps tech chips to 6 or fewer", () => {
    for (const w of work) expect(w.stack.length).toBeLessThanOrEqual(6);
  });
});

describe("privacy allow-list", () => {
  const publicText = JSON.stringify({ site, socials, work: getAllWork() });
  it("has no phone numbers", () => {
    expect(publicText).not.toMatch(/(\+?254|\b0)7\d{2}[ -]?\d{3}[ -]?\d{3}/);
  });
  it("has no personal email addresses", () => {
    expect(publicText).not.toMatch(/@(gmail|yahoo|outlook|hotmail|icloud)\./i);
  });
  it("does not link Facebook", () => {
    expect(publicText).not.toMatch(/facebook\.com/i);
  });
});
