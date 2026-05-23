<script setup lang="ts">
import { watch, ref, onUnmounted } from "vue";
import gsap from "gsap";
import { NAV_SECTIONS } from "../content/navigation";
import { t } from "../i18n/utils/translate";
import { lenis } from "../composables/useScroll";
import { mobileNavOpen, closeMobileNav } from "../composables/useMobileNav";
import { projectId } from "../composables/useRouteObserver";
import LangSwitch from "./LangSwitch.vue";
import { social } from "../content/social";
import Link from "./Link.vue";

const overlayRef = ref<HTMLElement | null>(null);
const linksRef = ref<HTMLElement | null>(null);

const handleNavClick = (section: string) => {
  if (!lenis.value) return;
  lenis.value.scrollTo(`#${section}`);
  closeMobileNav();
};

watch(mobileNavOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "";

  if (!overlayRef.value) return;

  if (isOpen) {
    gsap.fromTo(
      overlayRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
    );

    if (linksRef.value) {
      gsap.fromTo(
        linksRef.value.querySelectorAll(".mobile-nav-link"),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power3.out", delay: 0.08 },
      );
    }
  } else {
    gsap.to(overlayRef.value, { opacity: 0, duration: 0.25, ease: "power2.in" });
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="projectId === null"
      ref="overlayRef"
      :class="['mobile-nav', { 'mobile-nav-open': mobileNavOpen }]"
      :aria-hidden="!mobileNavOpen"
    >
      <div class="mobile-nav-backdrop" @click="closeMobileNav"></div>
      <div class="mobile-nav-panel">
        <div class="mobile-nav-top">
          <p class="mobile-nav-label">{{ t("menu") }}</p>
          <button
            class="mobile-nav-close"
            type="button"
            :aria-label="t('menu-close')"
            @click="closeMobileNav"
            data-sound="click"
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <nav ref="linksRef" class="mobile-nav-links" :aria-label="t('menu')">
          <button
            v-for="section in NAV_SECTIONS"
            :key="section"
            type="button"
            class="mobile-nav-link"
            @click="handleNavClick(section)"
            data-sound="click"
          >
            {{ t(section) }}
          </button>
        </nav>
        <div class="mobile-nav-footer">
          <LangSwitch />
          <Link
            :href="social.find((item) => item.name === 'mail')?.url ?? ''"
            external
            class="mobile-nav-mail"
            data-sound="click"
          >
            {{ t("get-in-touch") }}
          </Link>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.mobile-nav {
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-index-header) + 2);
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: visibility 0.35s ease;

  &-open {
    pointer-events: auto;
    visibility: visible;
  }

  &-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(9, 20, 52, 0.72);
    backdrop-filter: blur(6px);
  }

  &-panel {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    padding: calc(var(--height-header) + var(--space-md)) var(--space-outer) var(--space-xl);
    background: linear-gradient(165deg, var(--color-dark-blue-500) 0%, #0f1a35 100%);
    color: var(--color-white-400);
  }

  &-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-xl);
  }

  &-label {
    font-size: var(--font-size-sm);
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.7;
  }

  &-close {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: var(--stroke-sm) solid rgba(255, 255, 255, 0.25);
    background: transparent;
    position: relative;
    cursor: pointer;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 18px;
      height: 2px;
      background: var(--color-white-400);
      border-radius: 2px;

      &:first-child {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &:last-child {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }

  &-links {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-sm);
  }

  &-link {
    border: none;
    background: none;
    text-align: left;
    font-size: clamp(1.75rem, 8vw, 2.75rem);
    font-weight: 900;
    letter-spacing: 0.02em;
    color: var(--color-white-400);
    padding: var(--space-xs) 0;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
      color: var(--color-cyan-400);
      transform: translateX(8px);
    }
  }

  &-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-md);
    padding-top: var(--space-lg);
    border-top: var(--stroke-sm) solid rgba(255, 255, 255, 0.12);
  }

  &-mail {
    font-weight: 700;
    font-size: var(--font-size-md);
    color: var(--color-cyan-400);
  }
}
</style>
