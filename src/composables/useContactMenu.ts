import { ref } from "vue";

export const contactMenuOpen = ref(false);

export const openContactMenu = () => {
  contactMenuOpen.value = true;
};

export const closeContactMenu = () => {
  contactMenuOpen.value = false;
};
