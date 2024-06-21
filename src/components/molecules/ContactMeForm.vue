<template>
	<form class="mx-auto flex max-w-3xl flex-col gap-y-5" @submit.prevent="submitForm" ref="form">
		<label for="name">Nom</label>
		<input type="text" name="name" v-model="name" required />
		<label for="email">Adresse couriel</label>
		<input type="email" name="email" v-model="email" required />
		<label for="message">Message</label>
		<textarea name="message" v-model="message" rows="5" required></textarea>
		<div class="h-captcha" data-captcha="true" ref="captcha"></div>
		<button type="submit">Envoyé message</button>
	</form>

	<dialog ref="modal">
		<button autofocus>Close</button>
		<p>This modal dialog has a groovy backdrop!</p>
	</dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const WEB3FORMS_ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY

const name = ref('')
const email = ref('')
const message = ref('')
const form = ref('')
const modal = ref<HTMLDialogElement>()

const submitForm = async () => {
	if ((form.value[3] as any).name !== 'h-captcha-response' || (form.value[3] as any).value === '')
		return

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
		console.log(result)
		modal.value?.showModal()
	}
}
</script>

<style lang="scss">
input,
textarea {
	@apply text-black;
}
</style>
