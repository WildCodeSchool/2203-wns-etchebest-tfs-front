import { test, expect } from '@playwright/test'
import { useMutation, gql } from '@apollo/client'
import {idEmailTest} from './constant'


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

  test('Should disabled button when form is not valid', async ({ page, browserName }) => {
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
 
})

  