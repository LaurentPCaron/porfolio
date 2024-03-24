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
      <div class="w-full flex flex-col">
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
            v-for="{ href, label } in internals"
            :key="href"
            class="border-y border-lighter text-left w-screen"
          >
            <a class="py-5 pl-5" :href="href" @click="togglingMenu">{{
              label
            }}</a>
          </li>
        </ul>
        <ul class="mt-5 pl-5 flex gap-7 text-3xl">
          <li v-for="{ href, label, icon } in externals" :key="href">
            <a
              :href="href"
              target="_blank"
              rel="noopener noreferrer"
              :title="label"
              ref="element"
              ><i :class="icon"></i
            ></a>
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
      backgroundState: '-z-10',
    };
  },
  props: ['internals', 'externals'],
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
      this.$refs.element[this.$refs.element.length - 1].focus();
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  @apply h-full  flex items-center;
}
li {
  @apply text-4xl;
}
</style>
