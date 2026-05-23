<script setup lang="ts">
import HeaderLink from "./HeaderLink.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { t } from "../i18n/utils/translate";
import { lenis } from "../composables/useScroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeaderTheme } from "../composables/useHeaderTheme";
import { projectId } from "../composables/useRouteObserver";
import { NAV_SECTIONS, type NavSection } from "../content/navigation";

const handleLinkClick = (link: string) => {
  if (!lenis.value) return;
  lenis.value.scrollTo(link);
};

const sections = NAV_SECTIONS;
type ActiveLink = NavSection;

const activeLink = ref<ActiveLink | null>(null);
const isMounted = ref(false);
const itemWidth = ref(112);

const barStyle = computed(() => {
  const index = sections.indexOf(activeLink.value as ActiveLink);
  if (index < 0) return { transform: "translateX(0)" };
  return { transform: `translateX(${index * itemWidth.value}px)` };
});

const barWidthStyle = computed(() => ({
  width: `${itemWidth.value}px`,
}));

const { isDarkTheme, hasScrolledIntoView } = useHeaderTheme();

const updateItemWidth = () => {
  itemWidth.value = window.innerWidth < 1200 ? 88 : 112;
};

onMounted(() => {
  updateItemWidth();
  window.addEventListener("resize", updateItemWidth);

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: `#${section}`,
      start: section === "about" ? "top 22.5%" : "top center",
      end: "bottom center",
      onEnter: () => {
        activeLink.value = section;
      },
      onEnterBack: () => {
        activeLink.value = section;
      },
      onLeave: () => (activeLink.value = null),
      onLeaveBack: () => (activeLink.value = null),
    });
  });

  ScrollTrigger.refresh();
  isMounted.value = true;
});

onUnmounted(() => {
  window.removeEventListener("resize", updateItemWidth);
});
</script>

<template>
  <div
    :class="[
      'header-home',
      { 'header-home-mounted': isMounted, 'header-home-isProjectPage': projectId !== null },
      { 'header-home-compact': itemWidth === 88 },
    ]"
  >
    <div :class="['header-home-links', { 'header-home-links-dark': isDarkTheme }]">
      <div
        :class="[
          'header-home-bar',
          { 'header-home-bar-active': activeLink !== null && hasScrolledIntoView, 'header-home-bar-dark': isDarkTheme },
        ]"
        :style="{ ...barStyle, ...barWidthStyle }"
      ></div>
      <HeaderLink
        v-for="section in sections"
        :key="section"
        :is-active="activeLink === section"
        :class="[
          'header-home-link',
          { 'header-home-link-active': activeLink === section && hasScrolledIntoView },
          'children-unclickable',
        ]"
        :style="{ width: `${itemWidth}px` }"
        @click="handleLinkClick('#' + section)"
        :is-dark-theme="isDarkTheme"
        :aria-label="t(section)"
        data-sound="click"
        data-hoversound="hover"
      >
        {{ t(section) }}
      </HeaderLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-home {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-index-header-home);
  height: var(--height-header);
  align-items: center;
  justify-content: center;
  display: none;
  opacity: 0;
  max-width: calc(100vw - var(--space-outer) * 2);
  transition:
    opacity 0.3s ease-in-out,
    transform var(--transition-route-duration) var(--transition-route-ease);

  &-isProjectPage {
    transform: translateX(-50%) translateY(-100%);
  }

  &-mounted {
    opacity: 1;
  }

  @include mixins.mq("lg") {
    display: flex;
  }

  &-links {
    position: relative;
    display: flex;
    padding: 3px;
    background-color: var(--color-beige-500);
    border-radius: 100px;
    color: var(--color-text-400);
    transition:
      color 0.1s ease-in-out,
      background-color 0.1s ease-in-out;

    &-dark {
      background-color: var(--color-dark-blue-500);
      color: var(--color-white-400);
    }
  }

  &-bar {
    position: absolute;
    top: 3px;
    left: 3px;
    height: calc(100% - 6px);
    width: 112px;
    background: var(--color-orange-400);
    border-radius: 100px;
    transition:
      transform 0.3s var(--ease-smooth),
      width 0.2s ease,
      opacity 0.1s ease-in-out,
      background-color 0.1s ease-in-out;
    z-index: 1;
    opacity: 0;

    &-dark {
      background-color: var(--color-cyan-500);
    }

    &-active {
      opacity: 1;
    }
  }

  &-link {
    position: relative;
    z-index: 2;
    letter-spacing: 0.02em;
    font-weight: 700;
    border: none;
    background: none;
    transition:
      color 0.1s ease-in-out,
      width 0.2s ease,
      font-size 0.2s ease;
    font-size: var(--font-size-sm);
    width: 112px;
    white-space: nowrap;
    text-transform: uppercase;

    &-active {
      color: var(--color-white-400);
    }
  }

  &-compact &-link {
    font-size: 0.65rem;
    letter-spacing: 0.01em;
  }
}
</style>
