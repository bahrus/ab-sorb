import { test, expect } from '@playwright/test';
test('soakUp', async ({ page }) => {
    await page.goto('./tests/test1.html');
    await page.waitForTimeout(3000);
    const editor = page.locator('#target');
    await expect(editor).toHaveAttribute('mark', 'good');
});
