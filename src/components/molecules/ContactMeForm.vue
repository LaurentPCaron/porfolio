<template>
	<form
		class="mx-auto flex max-w-3xl flex-col border border-white p-10"
		@submit.prevent="validateForm"
		ref="form"
		novalidate
	>
		<label for="name">Nom</label>
		<input type="text" name="name" v-model="name" autocomplete="off" />
		<p>{{ errorMessages.name }}</p>
		<label for="email">Adresse couriel</label>
		<input type="email" name="email" v-model="email" autocomplete="off" />
		<p v-if="errorMessages.email">{{ errorMessages.email }}</p>
		<label for="message">Message</label>
		<textarea name="message" v-model="message" rows="5"></textarea>
		<p v-if="errorMessages.message">{{ errorMessages.message }}</p>
		<vue-hcaptcha
			ref="captcha"
			sitekey="b080597d-1f2e-4ee5-aab1-2750b854990a"
			size="invisible"
			theme="dark"
			@verify="submitForm"
			@error="onCaptchError"
		></vue-hcaptcha>
		<button type="submit">Envoyer message</button>
	</form>

	<dialog class="bg-ff7 text-white" ref="modal">
		<div class="flex flex-col">
			<template v-if="isResultOk">
				<h2 class="w-fit">Merci!</h2>
				<p>J'ai bien ressus votre message et je vous repondrai le plus rapidement possible.</p>
			</template>
			<template v-else>
				<h2>Hmmmm...</h2>
				<p>Une erreur lors de l'envois du formulaire s'est produit</p>
			</template>
			<p>Vous pouvez aussi me contacter en m'écrivant à :</p>
			<a class="mx-auto my-10 block underline" href="mailto:info@lpcaron.ninja"
				>info@lpcaron.ninja</a
			>

			<button @click="closeModal" autofocus>Fermer</button>
		</div>
	</dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import { getLangFromUrl, useTranslations } from '../../i18n/utils'

const lang = getLangFromUrl(new URL(document.URL))
const WEB3FORMS_ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY

const name = ref('')
const email = ref('')
const message = ref('')
const form = ref('')
const captcha = ref()
const modal = ref<HTMLDialogElement>()

const errorMessages = ref({ name: '', email: '', message: '' })

let isResultOk = true

const submitForm = async () => {
	const response = await fetch('https://api.web3forms.com/submit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			access_key: WEB3FORMS_ACCESS_KEY,
			name: name.value,
			email: email.value,
			message: message.value
		})
	})
	const result = await response.json()

	if (result.success) {
		isResultOk = true
	} else {
		isResultOk = false
	}
	modal.value?.showModal()
	resetForm()
}
const validateForm = () => {
	const emailReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
	const required = 'Champ requis'

	errorMessages.value.name = ''
	errorMessages.value.email = ''
	errorMessages.value.message = ''

	if (!name.value) errorMessages.value.name = required
	if (!email.value) errorMessages.value.email = required
	if (!emailReg.test(email.value) && !errorMessages.value.email)
		errorMessages.value.email = "Le couriel entré n'est pas valide."
	if (!name.value) errorMessages.value.message = required

	if (errorMessages.value.email || errorMessages.value.name || errorMessages.value.message) {
		return false
	}

	captcha.value.execute()
}

const onCaptchError = () => {
	isResultOk = false
	modal.value?.showModal()
}

const closeModal = () => {
	modal.value?.close()
}

const resetForm = () => {
	name.value = ''
	email.value = ''
	message.value = ''
	captcha.value.reset()
}
</script>

<style lang="scss">
input,
textarea {
	@apply text-black;
}

button {
	@apply mx-auto h-10 w-40 rounded-md border border-black bg-white text-black;
}
form {
	& label:not(first-child),
	button {
		@apply mt-5;
	}
	p {
		@apply text-sm text-red-500;
	}
}

::backdrop {
	@apply bg-black opacity-70;
}
</style>
