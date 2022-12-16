import { test, expect } from '@playwright/test'
import { useMutation, gql } from '@apollo/client'

const delay = (delayMs:number)=> new Promise((resolve) => setTimeout(resolve, delayMs))


test.describe("Struture App", ()=>{
  test('Should register then logout then login', async ({ page, browserName }) => {
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
    delay(2000).then(async ()=>{

      // await expect(page).toHaveURL('http://localhost:3000/')

      await page.locator('.absolute').first().click();
      await page.getByRole('button', { name: 'Se déconnecter' }).click();
      await expect(page).toHaveURL('/login')
      await page.getByPlaceholder('email@exemple.com').click();
      await page.getByPlaceholder('email@exemple.com').fill('test50@gmail.com');
      await page.getByPlaceholder('Saisissez votre mot de passe').click();
      await page.getByPlaceholder('Saisissez votre mot de passe').fill('123456789');
      await page.getByRole('button', { name: 'Connexion' }).click();
    })
  });

  test('Should disabled button when register form is not valid', async ({ page, browserName }) => {
    await page.goto('http://localhost:3000/register');
    await page.getByPlaceholder('Votre prénom').click();
    await page.getByPlaceholder('Votre prénom').fill('');
    await page.getByPlaceholder('Votre nom').click();
    await page.getByPlaceholder('Votre nom').fill('');
    await page.getByPlaceholder('email@exemple.com').click();
    await page.getByPlaceholder('email@exemple.com').fill(`test-${browserName}test.com`);
    await page.getByPlaceholder('Saisissez votre mot de passe').click();
    await page.getByPlaceholder('Saisissez votre mot de passe').fill('00');
    await page.getByPlaceholder('Comfirmez votre mot de passe').click();
    await page.getByPlaceholder('Comfirmez votre mot de passe').fill('000000');
    await page.getByPlaceholder('Comfirmez votre mot de passe').blur();
    expect(await page.getByRole('button', { name: 'S\'inscrire' })).toHaveAttribute('disabled', "")
    expect(await page.getByRole('button', { name: 'S\'inscrire' })).toBeDisabled()
  })

  // test('Should disabled button when login form is not valid', async ({ page, browserName }) => {
  //   await page.goto('http://localhost:3000/login');
  //   await page.getByPlaceholder('email@exemple.com').click();
  //   await page.getByPlaceholder('email@exemple.com').fill(`test-${browserName}test.com`);
  //   await page.getByPlaceholder('Saisissez votre mot de passe').click();
  //   await page.getByPlaceholder('Saisissez votre mot de passe').fill('00');
  //   expect(await page.getByRole('button', { name: 'Connexion' })).toHaveAttribute('disabled', "")
  //   expect(await page.getByRole('button', { name: 'Connexion' })).toBeDisabled()
  // })
})

  