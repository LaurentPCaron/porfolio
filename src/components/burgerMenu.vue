<template>
  <div>
    <button @click="togglingMenu">
      OUVRIR
      <!--   <font-awesome-icon icon="fa-solid fa-bars" class="text-4xl text-white" /> -->
    </button>
    <div
      class="absolute top-0 right-0 transition-colors duration-700"
      :class="[{ 'bg-black/50 w-full h-screen': isOpen }, backgroundState]"
      @[isOpen&&`click`]="togglingMenu"
    ></div>
    <div
      class="flex justify-end pr-10 bg-dark fixed top-0 right-0 h-screen w-full transition-all duration-700"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="w-full flex flex-col justify-between">
        <ul class="text-right" :class="menuItemsState">
          <li class="mb-6 mt-4">
            <button @click="togglingMenu" ref="closeBtn">
              X
              <!--  <font-awesome-icon icon="fa-solid fa-xmark" /> -->
            </button>
          </li>
          <li
            v-for="({ href, label }, index) in links"
            :key="href"
            class="border-y border-lighter text-left w-screen py-5"
          >
            <a
              :href="href"
              :ref="links.length - 1 === index ? 'lastElement' : ''"
              @click="togglingMenu"
              @focusin="hasLastElementFocus = !hasLastElementFocus"
              @focusout="hasLastElementFocus = !hasLastElementFocus"
              @keypress.prevent.tab="
                links.length - 1 === index ? goToFirstElement() : ''
              "
              >{{ label }}</a
            >
          </li>
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
      console.log(this.hasLastElementFocus);
      if (this.hasLastElementFocus) {
        console.log('allo');
      }

      /* if (this.$ref.lastElement.hasFocus()) this.$refs.closeBtn.focus(); */
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
