<template>
	<form
		class="mx-auto flex max-w-3xl flex-col border border-white p-10"
		@submit.prevent="submitForm"
		ref="form"
	>
		<label for="name">Nom</label>
		<input type="text" name="name" v-model="name" reqautocomplete="off" uired />
		<label for="email">Adresse couriel</label>
		<input type="email" name="email" v-model="email" autocomplete="off" required />
		<label for="message">Message</label>
		<textarea name="message" v-model="message" rows="5" required></textarea>
		<div class="h-captcha" data-captcha="true" ref="captcha"></div>
		<button type="submit">Envoyer message</button>
	</form>
	<button class="text-white" @click="openModal">test</button>

	<dialog class="bg-ff7 text-white" ref="modal">
		<div class="flex flex-col">
			<h2 class="w-fit">Merci!</h2>
			<p>J'ai bien ressus votre message et je vous repondrai le plus rapidement possible.</p>
			<p>Vous pouvez aussi me contacter en m'écrivant à :</p>
			<a class="mx-auto my-10 block underline" href="mailto:info@lpcaron.ninja"
				>info@lpcaron.ninja</a
			>
			<button @click="closeModal" autofocus>Fermer</button>
		</div>
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

const openModal = () => {
	modal.value?.showModal()
}

const closeModal = () => {
	modal.value?.close()
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
	& input,
	textarea,
	.h-captcha {
		@apply mb-5;
	}
}

::backdrop {
	@apply bg-black opacity-70;
}
</style>
