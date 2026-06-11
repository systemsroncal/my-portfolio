import { ref, watchEffect } from "vue";
import { lenis } from "./useScroll";
import { sizes } from "../utils/sizes";

const getHeaderHeight = () => {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--height-header").trim();
  return parseFloat(value) || 72;
};

const isUnderHeader = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return rect.top < getHeaderHeight() && rect.bottom > 0;
};

const isDarkTheme = ref(false);
const hasScrolledIntoView = ref(false);
let listenerInitialized = false;

const handleScroll = () => {
  const aboutElement =
    typeof window !== "undefined" ? (document.querySelector("#about") as HTMLElement | null) : null;
  const educationElement =
    typeof window !== "undefined" ? (document.querySelector("#education") as HTMLElement | null) : null;

  let aboutDark = false;
  let isScrolledIntoViewNext = false;

  if (aboutElement) {
    const aboutBounding = aboutElement.getBoundingClientRect();
    const isLandscape = sizes.isLandscape;
    isScrolledIntoViewNext = aboutBounding.top - (isLandscape ? sizes.height * 0.225 : 0) < 0;
    const isScrolledPast = aboutBounding.bottom - 36 < 0;
    aboutDark = isScrolledIntoViewNext && !isScrolledPast;
  }

  const educationDark = educationElement ? isUnderHeader(educationElement) : false;
  const nextDarkTheme = aboutDark || educationDark;

  if (hasScrolledIntoView.value !== isScrolledIntoViewNext) {
    hasScrolledIntoView.value = isScrolledIntoViewNext;
  }

  if (isDarkTheme.value !== nextDarkTheme) {
    isDarkTheme.value = nextDarkTheme;
  }
};

const initScrollListener = () => {
  if (listenerInitialized || typeof window === "undefined") return;
  listenerInitialized = true;

  watchEffect((onInvalidate) => {
    if (!lenis.value) return;

    lenis.value.on("scroll", handleScroll);
    handleScroll();

    onInvalidate(() => {
      lenis.value?.off("scroll", handleScroll);
    });
  });
};

export const useHeaderTheme = () => {
  initScrollListener();

  return {
    isDarkTheme,
    hasScrolledIntoView,
  };
};
