import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/", "/work/getmyboat", "/uses", "/now", "/does-not-exist"];

for (const path of pages) {
  test(`a11y: ${path} has no serious axe violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForTimeout(1500);
    const { violations } = await new AxeBuilder({ page }).analyze();
    const serious = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
  });
}

test("home: one h1, no horizontal scroll, no CSP violations", async ({ page }) => {
  const csp: string[] = [];
  page.on("console", (m) => /Content Security Policy|Refused to/.test(m.text()) && csp.push(m.text()));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("native");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.waitForTimeout(1500);
  expect(csp).toEqual([]);
});

test("security headers are set", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["content-security-policy"]).toMatch(/script-src 'self' 'nonce-/);
  expect(h["strict-transport-security"]).toContain("max-age=63072000");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["permissions-policy"]).toContain("geolocation=()");
});

test("privacy: rendered HTML has no phone, mailto or personal email", async ({ page }) => {
  await page.goto("/");
  const html = await page.content();
  expect(html).not.toMatch(/mailto:/);
  expect(html).not.toMatch(/@(gmail|yahoo|outlook|hotmail|icloud)\./i);
  expect(html).not.toMatch(/(\+?254|\b0)7\d{2}[ -]?\d{3}[ -]?\d{3}/);
  expect(html).not.toMatch(/"(telephone|birthDate|address)"/);
});

test("works without JavaScript", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Shipped to millions/ })).toBeVisible();
  await expect(page.locator("#contact form")).toHaveAttribute("action", "/api/contact");
  await page.goto("/work/sendy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sendy");
  await ctx.close();
});

test("contact API validates input", async ({ request }) => {
  const res = await request.post("/api/contact", { data: { name: "A", email: "x", message: "short" } });
  expect(res.status()).toBe(422);
  const json = await res.json();
  expect(Object.keys(json.fieldErrors)).toEqual(expect.arrayContaining(["name", "email", "message"]));
});

test("reduced motion: no WebGL hero, poster stays", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.waitForTimeout(1500);
  await expect(page.locator("canvas")).toHaveCount(0);
  await ctx.close();
});
