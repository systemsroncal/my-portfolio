<script setup lang="ts">
import Button from "./Button.vue";
import Logo from "./Logo.vue";
import { computed } from "vue";
import { t } from "../i18n/utils/translate";
import { useHeaderTheme } from "../composables/useHeaderTheme";
import { lenis } from "../composables/useScroll";
import { projectId } from "../composables/useRouteObserver";
import { openContactMenu } from "../composables/useContactMenu";
import ButtonRound from "./ButtonRound.vue";
import ArrowRight from "./icons/ArrowRight.vue";
import SoundsToggle from "./SoundsToggle.vue";
import { isFeatureEnabled } from "../utils/features";
import { useRouter } from "../composables/useRouter";
import { useFirstRoute } from "../composables/useFirstRoute";
import { toggleMobileNav, mobileNavOpen } from "../composables/useMobileNav";
import { isLegalRoute } from "../composables/useLegalRoute";

const router = useRouter();
const { isFirstRoute } = useFirstRoute();

const { isDarkTheme } = useHeaderTheme();

const handleBackClick = () => {
  // If it's the first route the user visited, navigate to home
  // Otherwise, go back in browser history
  if (isFirstRoute.value) {
    router.push("/");
  } else {
    router.back();
  }
};

const handleLogoClick = () => {
  if (isLegalRoute.value) {
    router.push("/");
    return;
  }

  if (!lenis.value) return;
  lenis.value.scrollTo(0);
};

const classNames = computed(() => {
  return {
    header: true,
    "header-dark": isDarkTheme.value,
    [`project-${projectId.value}`]: projectId.value !== null,
  };
});

const getInTouchClassNames = computed(() => {
  return {
    "header-get-in-touch": true,
    "header-get-in-touch-isProjectPage": projectId.value !== null,
  };
});
</script>

<template>
  <header :class="classNames">
    <div class="header-left">
      <button
        v-if="projectId === null"
        type="button"
        class="header-menu-toggle"
        :class="{ 'header-menu-toggle-open': mobileNavOpen }"
        :aria-label="mobileNavOpen ? t('menu-close') : t('menu-open')"
        @click="toggleMobileNav"
        data-sound="click"
        data-cursor="circle-white"
      >
        <span class="header-menu-toggle-line"></span>
        <span class="header-menu-toggle-line"></span>
        <span class="header-menu-toggle-line"></span>
      </button>
      <ButtonRound
        v-if="projectId !== null"
        variant="accent"
        @click="handleBackClick"
        :aria-label="t('back-to-home')"
        :class="{ 'header-back': true, 'header-back-isProjectPage': projectId !== null }"
        data-cursor="circle-white"
        data-sound="click"
        data-hoversound="hover"
      >
        <ArrowRight class="header-back-icon" />
      </ButtonRound>
      <button
        v-if="projectId === null"
        type="button"
        class="header-logo children-unclickable"
        :aria-label="t('back-to-home')"
        @click="handleLogoClick"
        data-sound="click"
        data-hoversound="hover"
        data-cursor="circle-white"
      >
        <Logo class="header-logo-brand" />
      </button>
    </div>
    <div class="header-right">
      <Button
        renderAs="button"
        variant="accent"
        type="button"
        :aria-label="t('get-in-touch')"
        :class="getInTouchClassNames"
        data-cursor="circle-white"
        data-hoversound="hover"
        data-sound="click"
        @click="openContactMenu"
        >{{ t("get-in-touch") }}</Button
      >
      <SoundsToggle class="header-sounds-toggle" :isDarkTheme="isDarkTheme" v-if="isFeatureEnabled('sounds')" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
  width: var(--breakpoint-xxxl);
  padding: 0 var(--space-outer);
  max-width: 100%;
  z-index: var(--z-index-header);
  height: var(--height-header);
  pointer-events: none;

  &-back {
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    transition-delay: 0.1s;
    pointer-events: auto;

    &-icon {
      width: 100%;
      transform: rotate(180deg);
    }

    &-isProjectPage {
      pointer-events: auto;
      opacity: 1;
    }
  }

  &-left {
    position: absolute;
    left: var(--space-outer);
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    pointer-events: auto;
    z-index: 1;
    max-width: min(52vw, 320px);

    @include mixins.mq("lg") {
      max-width: min(38vw, 360px);
    }
  }

  &-menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 44px;
    height: 44px;
    border: var(--stroke-sm) solid var(--color-grayscale-400);
    border-radius: 50%;
    background: var(--color-beige-500);
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      background 0.2s ease;

    @include mixins.mq("lg") {
      display: none;
    }

    &-line {
      display: block;
      width: 18px;
      height: 2px;
      margin: 0 auto;
      background: var(--color-text-400);
      border-radius: 2px;
      transition:
        transform 0.25s ease,
        opacity 0.25s ease;
    }

    &-open {
      .header-menu-toggle-line:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }

      .header-menu-toggle-line:nth-child(2) {
        opacity: 0;
      }

      .header-menu-toggle-line:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }

  .header-dark &-menu-toggle {
    background: var(--color-dark-blue-500);
    border-color: rgba(255, 255, 255, 0.25);

    .header-menu-toggle-line {
      background: var(--color-white-400);
    }
  }

  &-get-in-touch {
    width: fit-content;

    &-isProjectPage {
      opacity: 1 !important;
    }
  }

  &-right {
    position: absolute;
    right: var(--space-outer);
    top: 50%;
    transform: translateY(-50%);
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  &-music-toggle {
    display: flex;
  }

  &-dark {
    color: var(--color-white-400);
    --icon-color: var(--color-white-400);
  }

  &-get-in-touch {
    display: none;

    @include mixins.mq("md") {
      display: flex;
    }
  }

  &-logo {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    min-width: 0;
    transition: color 0.2s ease-in-out;
    pointer-events: auto;

    &-brand {
      min-width: 0;
    }
  }
}
</style>
