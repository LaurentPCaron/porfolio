<template>
	<div>
		<button class="aspect-square w-10" @click="togglingMenu">
			<i class="fa fa-solid fa-bars block aspect-square w-10 text-5xl text-white"></i>
		</button>
		<div
			class="absolute right-0 top-0 transition-colors duration-700"
			:class="[{ 'h-screen w-full bg-black/50': isOpen }, backgroundState]"
			@[isOpen&&`click`]="togglingMenu"
		></div>
		<div
			class="fixed right-0 top-0 flex h-screen w-full justify-end bg-black pr-10 transition-all duration-700"
			:class="isOpen ? 'translate-x-0' : 'translate-x-full'"
		>
			<div class="flex w-full flex-col">
				<ul class="text-right" :class="menuItemsState">
					<div
						class="absolute -top-96"
						aria-hidden
						tabindex="0"
						@keyup.tab.shift.prevent="goToLastElement()"
					></div>
					<li class="mb-6 mt-4">
						<button class="z-20 aspect-square w-10" @click="togglingMenu" ref="closeBtn">
							<i class="fa fa-solid fa-x block aspect-square w-10 text-5xl text-white"></i>
						</button>
					</li>
					<li
						v-for="{ href, label } in internals"
						:key="href"
						class="border-lighter w-screen border-y text-left"
					>
						<a class="py-5 pl-5" :href="href" @click="togglingMenu">{{ label }}</a>
					</li>
				</ul>
				<ul class="mt-5 flex gap-7 pl-5 text-3xl">
					<li class="flex" v-for="{ href, label, icon, haveSeparator } in externals" :key="href">
						<a :href="href" target="_blank" rel="noopener noreferrer" :title="label" ref="element"
							><i v-if="icon" :class="icon"></i> <span v-else>{{ label }}</span></a
						>
						<span v-if="haveSeparator" class="-mt-2 ml-5" aria-hidden="">|</span>
					</li>
				</ul>

				<div
					class="absolute -top-96"
					aria-hidden
					tabindex="0"
					@keyup.prevent.tab="goToFirstElement()"
				></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isOpen: false,
			hasLastElementFocus: false,
			hasFirstElementFocus: false,
			menuItemsState: 'hidden',
			backgroundState: '-z-10'
		}
	},
	props: ['internals', 'externals'],
	watch: {
		isOpen(isOpen) {
			if (!isOpen) {
				setTimeout(() => {
					this.menuItemsState = 'hidden'
					this.backgroundState = '-z-10'
				}, 700)
			}
		}
	},
	methods: {
		togglingMenu() {
			this.isOpen = !this.isOpen
			if (this.isOpen) {
				this.menuItemsState = 'block'
				this.backgroundState = 'z-0'
			}
		},
		goToFirstElement() {
			this.$refs.closeBtn.focus()
		},
		goToLastElement() {
			this.$refs.element[this.$refs.element.length - 1].focus()
		}
	}
}
</script>

<style lang="scss" scoped>
a {
	@apply flex h-full items-center;
}
li {
	@apply text-4xl;
}
</style>
