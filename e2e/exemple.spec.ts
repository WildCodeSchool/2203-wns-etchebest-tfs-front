import { test, expect } from '@playwright/test'
import { useMutation, gql } from '@apollo/client'
import {idEmailTest} from './constant'


// test('should right url and display h1 title "Projets"', async ({ page }) => {
//   // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
//   await page.goto('http://localhost:3000/')
//   await expect(page).toHaveURL("http://localhost:3000/")
//   await expect(page).toHaveTitle(/Projets/)
//   const btn = page.getByRole('button', { name: "Ajouter un projet" })
  
//   await expect(btn).toBeVisible();

// })


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

  test.only('Should register then logout then login', async ({ page, browserName }) => {
    
    await page.goto('http://localhost:3000/register');
    await page.getByPlaceholder('Votre prénom').click();
    await page.getByPlaceholder('Votre prénom').fill('test');
    await page.getByPlaceholder('Votre nom').click();
    await page.getByPlaceholder('Votre nom').fill('test');
    await page.getByPlaceholder('email@exemple.com').click();
    await page.getByPlaceholder('email@exemple.com').fill(`test-${browserName}@test.com`);
    await page.getByPlaceholder('Saisissez votre mot de passe').click();
    await page.getByPlaceholder('Saisissez votre mot de passe').fill('123456789');
    await page.getByPlaceholder('Comfirmez votre mot de passe').click();
    await page.getByPlaceholder('Comfirmez votre mot de passe').fill('123456789');
    await page.getByRole('button', { name: 'S\'inscrire' }).click();
    await expect(page).toHaveURL('/')
    await page.locator('.absolute').first().click();
    await page.getByRole('button', { name: 'Se déconnecter' }).click();
    await expect(page).toHaveURL('/login')
    await page.getByPlaceholder('email@exemple.com').click();
    await page.getByPlaceholder('email@exemple.com').fill('test50@gmail.com');
    await page.getByPlaceholder('Saisissez votre mot de passe').click();
    await page.getByPlaceholder('Saisissez votre mot de passe').fill('123456789');
    await page.getByRole('button', { name: 'Connexion' }).click();
});



// test('test', async ({ page }) => {
//   await page.goto('http://localhost:3000/');
//   await page.goto('http://localhost:3000/register');
//   await page.getByPlaceholder('Votre prénom').click();
//   await page.getByPlaceholder('Votre prénom').fill('test');
//   await page.getByPlaceholder('Votre nom').click();
//   await page.getByPlaceholder('Votre nom').fill('test');
//   await page.getByPlaceholder('email@exemple.com').click();
//   await page.getByPlaceholder('email@exemple.com').fill('test50@gmail.com');
//   await page.getByPlaceholder('Saisissez votre mot de passe').click();
//   await page.getByPlaceholder('Saisissez votre mot de passe').fill('123456789');
//   await page.getByPlaceholder('Comfirmez votre mot de passe').click();
//   await page.getByPlaceholder('Comfirmez votre mot de passe').fill('123456789');
//   await page.getByRole('button', { name: 'S\'inscrire' }).click();
//   await page.locator('.avatar').first().click();
//   await page.getByRole('button', { name: 'Se déconnecter' }).click();
//   await page.getByPlaceholder('email@exemple.com').click();
//   await page.getByPlaceholder('email@exemple.com').fill('test50@gmail.com');
//   await page.getByPlaceholder('Saisissez votre mot de passe').click();
//   await page.getByPlaceholder('Saisissez votre mot de passe').fill('123456789');
//   await page.getByRole('button', { name: 'Connexion' }).click();
// });

  