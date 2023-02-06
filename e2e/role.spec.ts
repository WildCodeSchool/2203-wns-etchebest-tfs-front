import { test, expect } from '@playwright/test'

test('when ADMIN go to "/", add project button should be visible', async ({ page }) => {
	await page.goto('http://localhost:3000/login')
	await page.getByPlaceholder('email@exemple.com').click()
	await page.getByPlaceholder('email@exemple.com').fill('admin@structure.com')
	await page.getByPlaceholder('Saisissez votre mot de passe').click()
	await page.getByPlaceholder('Saisissez votre mot de passe').fill('00000000')
	await page.getByRole('button', { name: 'Connexion' }).click()

	const addProjectButton = page
		.locator('header')
		.getByRole('button', { name: 'Ajouter un projet' })
	await expect(addProjectButton).toBeVisible()
})

test('when DEV go to "/", add project button should NOT be visible', async ({ page }) => {
	await page.goto('http://localhost:3000/login')
	await page.getByPlaceholder('email@exemple.com').click()
	await page.getByPlaceholder('email@exemple.com').fill('dev@structure.com')
	await page.getByPlaceholder('Saisissez votre mot de passe').click()
	await page.getByPlaceholder('Saisissez votre mot de passe').fill('00000000')
	await page.getByRole('button', { name: 'Connexion' }).click()

	const addProjectButton = page
		.locator('header')
		.getByRole('button', { name: 'Ajouter un projet' })
	if (!addProjectButton) {
		throw new Error(
			'Le bouton "ajouter un projet" est absent alors que le rôle est défini sur ADMIN'
		)
	}
})

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBzdHJ1Y3R1cmUuY29tIiwiaWF0IjoxNjc0OTc5MTYzLCJleHAiOjE2NzQ5ODI3NjN9.5Olwq5_kHMgHfwTklJ1ZCDh7y4R95BHiDwZTSo4ngsY
