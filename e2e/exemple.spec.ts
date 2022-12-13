import { test, expect } from '@playwright/test'


// test('should right url and display h1 title "Projets"', async ({ page }) => {
//   // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
//   await page.goto('http://localhost:3000/')
//   await expect(page).toHaveURL("http://localhost:3000/")
//   await expect(page).toHaveTitle(/Projets/)
//   const btn = page.getByRole('button', { name: "Ajouter un projet" })
  
//   await expect(btn).toBeVisible();

// })
test('Register', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/register')

    const registerBtn = page.getByRole('button', {name:"S'inscrire"})
    
    // await expect(page).toHaveTitle(/Connexion/)
    // await expect(page.getByText("Welcome")).toBeVisible()
    // await expect(page.getByText("LOGIN TO YOUR STRUCTURE ACCOUNT")).toBeVisible()
    await expect(registerBtn).toBeVisible()
    await page.getByLabel('Prénom').fill('Geoffrey');
    await page.getByLabel('Nom').fill('Morizot');
    await page.getByLabel('Email').fill('e2e2@test.com');
    await page.getByLabel('Mot de passe').fill('00000000');
    await page.getByLabel('Confirmation de passe').fill('00000000');
    registerBtn.click()
    await expect(page).toHaveURL('/')
  })

test('Login', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/login')

    const loginBtn = page.getByRole('button', {name:"Connexion"})
    
    await expect(page).toHaveTitle(/Connexion/)
    await expect(page.getByText("Welcome")).toBeVisible()
    await expect(page.getByText("LOGIN TO YOUR STRUCTURE ACCOUNT")).toBeVisible()
    await expect(loginBtn).toBeVisible()
    await page.getByLabel('Email').fill('e2e@test.com');
    await page.getByLabel('Mot de passe').fill('00000000');
    loginBtn.click()
    await expect(page).toHaveURL('/')
  })