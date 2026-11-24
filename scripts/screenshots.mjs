// Usage: APP_URL=http://127.0.0.1:4178/quiz-app/ node scripts/screenshots.mjs <outDir>
import { mkdirSync } from "node:fs";
import { chromium } from "playwright-core";

const outDir = process.argv[2] ?? "shots";
const url = process.env.APP_URL ?? "http://127.0.0.1:4178/quiz-app/";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome-stable",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function openPage({ theme, width = 1280, height = 900, colorScheme }) {
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => console.error("PAGE ERROR", e.message));
  await page.addInitScript((t) => {
    localStorage.setItem("quiz-app:theme:v1", t);
    localStorage.setItem("quiz-app:motion:v1", "static");
  }, theme);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Choose a deck" }).waitFor();
  return { context, page };
}

async function shot(page, name) {
  const path = `${outDir}/${name}`;
  await page.screenshot({ path, fullPage: true });
  const overflowX = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  console.log(`wrote ${path}${overflowX ? " (WARN horizontal overflow)" : ""}`);
  return overflowX;
}

const overflows = [];
for (const [theme, colorScheme] of [
  ["khaki", "light"],
  ["graphite", "dark"],
]) {
  const picker = await openPage({ theme, colorScheme });
  if (await shot(picker.page, `picker-${theme}-1280.png`)) overflows.push(`picker-${theme}`);
  await picker.context.close();

  const question = await openPage({ theme, colorScheme });
  await question.page.getByRole("button", { name: /Get Started/ }).first().click();
  await question.page.getByText("Which statement about JavaScript and Java is true?").waitFor();
  if (await shot(question.page, `question-${theme}-1280.png`)) overflows.push(`question-${theme}`);
  await question.context.close();
}

await browser.close();
if (overflows.length) {
  console.error("horizontal overflow in:", overflows.join(", "));
  process.exit(1);
}
