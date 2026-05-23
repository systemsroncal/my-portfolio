import { ref } from "vue";

export const mobileNavOpen = ref(false);

export const openMobileNav = () => {
  mobileNavOpen.value = true;
};

export const closeMobileNav = () => {
  mobileNavOpen.value = false;
};

export const toggleMobileNav = () => {
  mobileNavOpen.value = !mobileNavOpen.value;
};
