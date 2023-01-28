import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
	await page.goto('http://localhost:3000/login')
	await page.getByPlaceholder('email@exemple.com').click()
	await page.getByPlaceholder('email@exemple.com').fill('admin@structure.com')
	await page.getByPlaceholder('Saisissez votre mot de passe').click()
	await page.getByPlaceholder('Saisissez votre mot de passe').fill('00000000')
	await page.getByRole('button', { name: 'Connexion' }).click()

	const addProject = page
		.locator('header')
		.getByRole('button', { name: 'Ajouter un projet' })
	await expect(addProject).toBeVisible()
	await addProject.click({
		modifiers: ['Shift'],
		force: true
	})
	await page.getByPlaceholder('Ajouter un titre').click()
	await page.getByPlaceholder('Ajouter un titre').fill('Mon super projet')
	await page.getByPlaceholder('Ajouter un sujet').click()
	await page
		.getByPlaceholder('Ajouter un sujet')
		.fill('Réflexion sur la sécurité dans nos projets')
	await page.getByPlaceholder('Ajouter un code').click()
	await page.getByPlaceholder('Ajouter un code').fill('ASE')
	await page.getByRole('button', { name: 'Ajouter le projet' }).click()
	await page.getByRole('heading', { name: 'Votre projet a été créé' }).click()
})
