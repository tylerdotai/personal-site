import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.env.SITE_URL || 'http://localhost:8138/personal-site/';
const artifacts = process.env.E2E_ARTIFACTS || path.join(__dirname, '..', 'artifacts', 'e2e');
fs.mkdirSync(artifacts, { recursive: true });
let browser;
after(async () => { if (browser) await browser.close(); });

async function pageFor(viewport) {
  browser ||= await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: 'networkidle' });
  return page;
}

async function command(page, text) {
  const input = page.getByRole('textbox', { name: 'Terminal command input' });
  await input.fill(text);
  await input.press('Enter');
}

test('visitor can skip boot and reach three real projects without knowing commands', async () => {
  const page = await pageFor({ width: 1280, height: 800 });
  try {
    await page.getByRole('button', { name: /skip boot/i }).click();
    await page.getByRole('button', { name: /projects/i }).click();
    const text = await page.locator('body').innerText();
    for (const title of ['Agent Builders Club', 'Agent Loop System', 'Worst Captcha Challenge']) assert.ok(text.includes(title), title);
    for (const stale of ['Jarvis AI', 'Titan AI', 'Flume - Task']) assert.ok(!text.includes(stale), stale);
    for (const href of ['https://www.agentbuildersclub.dev/', 'https://github.com/tylerdotai/agent-loop-system', 'https://worst-captcha-challenge.vercel.app/']) {
      assert.ok(await page.locator(`a[href="${href}"]`).count(), href);
    }
    await page.screenshot({ path: path.join(artifacts, 'desktop-projects.png'), fullPage: true });
  } finally { await page.close(); }
});

test('terminal commands remain useful and render input as text, not HTML', async () => {
  const page = await pageFor({ width: 1280, height: 800 });
  try {
    if (await page.getByRole('button', { name: /skip boot/i }).isVisible()) await page.getByRole('button', { name: /skip boot/i }).click();
    await page.getByRole('textbox', { name: 'Terminal command input' }).waitFor();
    await command(page, 'help');
    assert.match(await page.locator('body').innerText(), /cd.*open.*history/s);
    await command(page, 'cd projects');
    await command(page, 'ls');
    await command(page, 'cat abc');
    assert.match(await page.locator('body').innerText(), /Agent Builders Club/);
    await command(page, 'cat https://example.invalid/\"><svg/id=untrusted-probe>');
    assert.equal(await page.locator('#untrusted-probe').count(), 0);
    await page.screenshot({ path: path.join(artifacts, 'terminal-commands.png'), fullPage: true });
  } finally { await page.close(); }
});

test('phone presentation has a usable prompt, no clipped welcome, and no overlapping hint bar', async () => {
  const page = await pageFor({ width: 390, height: 844 });
  try {
    await page.getByRole('button', { name: /skip boot/i }).click();
    await page.getByRole('button', { name: /projects/i }).click();
    const dimensions = await page.evaluate(() => {
      const welcome = document.querySelector('[data-welcome]')?.getBoundingClientRect();
      const input = document.querySelector('input[aria-label="Terminal command input"]')?.getBoundingClientRect();
      const hints = document.querySelector('[data-hints]')?.getBoundingClientRect();
      return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, welcomeRight: welcome?.right, inputRight: input?.right, inputBottom: input?.bottom, hintsTop: hints?.top };
    });
    assert.ok(dimensions.scrollWidth <= dimensions.width, JSON.stringify(dimensions));
    assert.ok(dimensions.welcomeRight <= dimensions.width, JSON.stringify(dimensions));
    assert.ok(dimensions.inputRight <= dimensions.width, JSON.stringify(dimensions));
    assert.ok(dimensions.hintsTop >= dimensions.inputBottom, JSON.stringify(dimensions));
    await page.screenshot({ path: path.join(artifacts, 'phone-projects.png'), fullPage: true });
  } finally { await page.close(); }
});

test('deployed page describes current portfolio without a broken font request', async () => {
  const page = await pageFor({ width: 1280, height: 800 });
  const failures = [];
  page.on('response', response => { if (response.status() >= 400) failures.push({ status: response.status(), url: response.url() }); });
  try {
    await page.reload({ waitUntil: 'networkidle' });
    assert.match(await page.title(), /Tyler Delano/);
    assert.ok(await page.locator('meta[property="og:title"]').count());
    assert.ok(!failures.some(({ url }) => new URL(url).hostname === 'fonts.gstatic.com'), JSON.stringify(failures));
  } finally { await page.close(); }
});
