import { test, expect } from '@playwright/test'


test('should display h1 title "Projets"', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/')
  // Find an element with the text 'About Page' and click on it
  await page.pause()
  // The new page should contain an h1 with "About Page"
  await expect(page).toHaveTitle(/Projets/)
})