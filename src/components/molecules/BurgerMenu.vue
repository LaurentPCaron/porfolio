<template>
  <div>
    <button class="w-10 aspect-square" @click="togglingMenu">
      <i
        class="fa fa-solid fa-bars block text-5xl text-white w-10 aspect-square"
      ></i>
    </button>
    <div
      class="absolute top-0 right-0 transition-colors duration-700"
      :class="[{ 'bg-black/50 w-full h-screen': isOpen }, backgroundState]"
      @[isOpen&&`click`]="togglingMenu"
    ></div>
    <div
      class="flex justify-end pr-10 bg-brown fixed top-0 right-0 h-screen w-full transition-all duration-700"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="w-full flex flex-col justify-between">
        <ul class="text-right" :class="menuItemsState">
          <div
            class="absolute -top-96"
            aria-hidden
            tabindex="0"
            @keyup.tab.shift.prevent="goToLastElement()"
          ></div>
          <li class="mb-6 mt-4">
            <button
              class="w-10 aspect-square z-20"
              @click="togglingMenu"
              ref="closeBtn"
            >
              <i
                class="fa fa-solid fa-x block text-5xl text-white w-10 aspect-square"
              ></i>
            </button>
          </li>
          <li
            v-for="({ href, label }, index) in links"
            :key="href"
            class="border-y border-lighter text-left w-screen py-5"
          >
            <a :href="href" ref="element" @click="togglingMenu">{{ label }}</a>
          </li>
          <div
            class="absolute -top-96"
            aria-hidden
            tabindex="0"
            @keyup.prevent.tab="goToFirstElement()"
          ></div>
        </ul>
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
      backgroundState: '-z-10',
    };
  },
  props: ['links'],
  watch: {
    isOpen(isOpen) {
      if (!isOpen) {
        setTimeout(() => {
          this.menuItemsState = 'hidden';
          this.backgroundState = '-z-10';
        }, 700);
      }
    },
  },
  methods: {
    togglingMenu() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.menuItemsState = 'block';
        this.backgroundState = 'z-0';
      }
    },
    goToFirstElement() {
      this.$refs.closeBtn.focus();
    },
    goToLastElement() {
      console.log('allo');
      this.$refs.element[this.$refs.element.length - 1].focus();
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  @apply w-screen h-full  pl-5 flex items-center;
}
li {
  @apply text-4xl;
}
</style>
