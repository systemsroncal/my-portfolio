<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  educationCategoryOrder,
  educationEntries,
  type EducationCategory,
} from "../../../content/education";
import { useEducationHorizontalScroll } from "../../../composables/useEducationHorizontalScroll";
import { locale } from "../../../i18n/store";
import { t } from "../../../i18n/utils/translate";
import SectionHeader from "./SectionHeader.vue";

import type { Locale } from "../../../i18n/types";

const sectionRef = ref<HTMLElement | null>(null);
const pinRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const viewportRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const motionEnabled = ref(
  typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true,
);

const categoryLabels: Record<EducationCategory, string> = {
  degree: "education-section-degree",
  language: "education-section-language",
  certification: "education-section-certification",
  training: "education-section-training",
};

const slides = computed(() => {
  const currentLocale = (locale.value ?? "es") as Locale;
  return educationCategoryOrder.flatMap((category) => {
    const categoryLabel = t(categoryLabels[category]);
    return educationEntries
      .filter((entry) => entry.category === category)
      .map((entry) => ({
        id: entry.id,
        category,
        categoryLabel,
        title: entry.title[currentLocale],
        institution: entry.institution,
        period: entry.period[currentLocale],
        detail: entry.detail?.[currentLocale],
      }));
  });
});

const slideCount = computed(() => slides.value.length);

const { refresh } = useEducationHorizontalScroll({
  sectionRef,
  pinRef,
  trackRef,
  viewportRef,
  slideCount,
  activeIndex,
  enabled: motionEnabled,
});

watch(locale, () => {
  refresh();
});
</script>

<template>
  <section
    class="education"
    :class="{ 'education--static': !motionEnabled }"
    ref="sectionRef"
    id="education"
  >
    <div class="education-pin" ref="pinRef">
      <div class="grid education-header">
        <SectionHeader :banner="t('education-banner')" :title="t('education')" dark />
        <p class="education-intro">{{ t("education-intro") }}</p>
        <p v-if="motionEnabled" class="education-scroll-hint" aria-hidden="true">
          {{ t("education-scroll-hint") }}
        </p>
      </div>

      <div class="education-viewport" ref="viewportRef">
        <div class="education-track" ref="trackRef" role="list">
          <article
            v-for="(slide, index) in slides"
            :key="slide.id"
            class="education-slide"
            :class="{ 'education-slide--active': activeIndex === index }"
            role="listitem"
          >
            <div class="education-slide-card">
              <span class="education-slide-category">{{ slide.categoryLabel }}</span>
              <div class="education-slide-body">
                <span class="education-slide-period">{{ slide.period }}</span>
                <h3 class="education-slide-title">{{ slide.title }}</h3>
                <p class="education-slide-institution">{{ slide.institution }}</p>
                <p v-if="slide.detail" class="education-slide-detail">{{ slide.detail }}</p>
              </div>
              <span class="education-slide-index" aria-hidden="true">
                {{ String(index + 1).padStart(2, "0") }}
              </span>
            </div>
          </article>
        </div>
      </div>

      <div v-if="motionEnabled && slideCount > 1" class="education-progress" aria-hidden="true">
        <div class="education-progress-track">
          <div
            class="education-progress-fill"
            :style="{
              width: `${slideCount > 1 ? (activeIndex / (slideCount - 1)) * 100 : 100}%`,
            }"
          />
        </div>
        <div class="education-dots">
          <span
            v-for="(_, index) in slides"
            :key="index"
            class="education-dot"
            :class="{ 'education-dot--active': activeIndex === index }"
          />
        </div>
        <span class="education-counter">
          {{ activeIndex + 1 }} / {{ slideCount }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.education {
  width: 100%;
  background-color: var(--color-dark-blue-500);
  color: var(--color-white-400);
  position: relative;

  &--static {
    padding: 96px 0 144px;

    .education-pin {
      min-height: auto;
      gap: var(--space-xl);
    }

    .education-viewport {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding-bottom: var(--space-sm);
    }

    .education-track {
      padding-inline: var(--space-outer);
    }

    .education-slide {
      scroll-snap-align: start;
    }
  }

  &-pin {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: var(--space-md);
    padding: calc(72px + var(--space-md)) 0 var(--space-lg);
    box-sizing: border-box;
    overflow: visible;
  }

  &-header {
    padding-inline: var(--space-outer);
  }

  &-intro {
    grid-column: 1 / 13;
    font-size: var(--font-size-md);
    line-height: 1.55;
    opacity: 0.85;
    max-width: 42rem;
    margin-bottom: 0;

    @include mixins.mq("md") {
      grid-column: 2 / 12;
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 11;
    }
  }

  &-scroll-hint {
    grid-column: 1 / 13;
    font-size: var(--font-size-sm);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-cyan-400);
    opacity: 0.9;
    display: flex;
    align-items: center;
    gap: var(--space-xs);

    @include mixins.mq("md") {
      grid-column: 2 / 12;
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 11;
    }

    &::after {
      content: "→";
      display: inline-block;
      animation: education-hint-nudge 1.4s ease-in-out infinite;
    }
  }

  &-viewport {
    width: 100%;
    flex: 1 1 auto;
    min-height: 0;
    overflow-x: clip;
    overflow-y: visible;
    padding-block: var(--space-sm);
    container-type: inline-size;
    container-name: education-carousel;
  }

  &-track {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    width: max-content;
    padding: var(--space-xs) var(--space-outer) var(--space-md);
    will-change: transform;
  }

  &-slide {
    box-sizing: border-box;
    flex: 0 0 calc(100vw - 2 * var(--space-outer));
    height: auto;
    min-height: unset;
    display: flex;
    justify-content: center;

    @supports (width: 100cqw) {
      flex: 0 0 calc(100cqw - 2 * var(--space-outer));
    }

    @include mixins.mq("md") {
      flex: 0 0 calc((100vw - 2 * var(--space-outer) - var(--space-md)) / 2);

      @supports (width: 100cqw) {
        flex: 0 0 calc((100cqw - 2 * var(--space-outer) - var(--space-md)) / 2);
      }
    }
  }

  &-slide-card {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;

    @include mixins.mq("md") {
      max-width: 100%;
    }
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    border: var(--stroke-sm) solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    padding-bottom: calc(var(--space-md) + var(--space-xs));
    background: rgba(255, 255, 255, 0.04);
    transition:
      border-color 0.35s ease,
      background 0.35s ease,
      transform 0.35s ease,
      box-shadow 0.35s ease;
    transform: scale(0.96);
    opacity: 0.72;

    .education-slide--active & {
      border-color: var(--color-cyan-400);
      background: rgba(255, 255, 255, 0.08);
      transform: scale(1);
      opacity: 1;
      box-shadow: 0 0 32px rgba(0, 212, 255, 0.12);
    }

    .education-slide:hover & {
      border-color: var(--color-cyan-400);
    }
  }

  &-slide-category {
    font-size: var(--font-size-xs);
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-cyan-400);
  }

  &-slide-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
    flex: 1;
  }

  &-slide-period {
    font-size: var(--font-size-sm);
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0.85;
  }

  &-slide-title {
    font-size: var(--font-size-title-xxs);
    font-weight: 900;
    line-height: 1.25;
    text-wrap: balance;

    @include mixins.mq("md") {
      font-size: var(--font-size-title-xs);
    }
  }

  &-slide-institution {
    font-size: var(--font-size-md);
    opacity: 0.9;
  }

  &-slide-detail {
    font-size: var(--font-size-sm);
    opacity: 0.72;
    line-height: 1.55;
    margin-top: var(--space-xxs);
  }

  &-slide-index {
    position: absolute;
    top: var(--space-md);
    right: var(--space-md);
    font-size: var(--font-size-sm);
    font-weight: 900;
    opacity: 0.2;
    line-height: 1;
    pointer-events: none;
  }

  &-progress {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    padding-inline: var(--space-outer);
  }

  &-progress-track {
    width: min(420px, 100%);
    height: 3px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    overflow: hidden;
  }

  &-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-cyan-400), rgba(0, 212, 255, 0.5));
    border-radius: inherit;
    transition: width 0.25s ease-out;
  }

  &-dots {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }

  &-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    transition:
      transform 0.25s ease,
      background 0.25s ease;

    &--active {
      background: var(--color-cyan-400);
      transform: scale(1.25);
    }
  }

  &-counter {
    font-size: var(--font-size-sm);
    font-weight: 700;
    letter-spacing: 0.06em;
    opacity: 0.75;
  }
}

@keyframes education-hint-nudge {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .education-scroll-hint::after {
    animation: none;
  }

  .education-track {
    will-change: auto;
  }

  .education-slide-card {
    transform: none;
    opacity: 1;
  }
}
</style>
