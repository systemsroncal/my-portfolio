<script setup lang="ts">
import { computed, ref } from "vue";
import { educationEntries } from "../../../content/education";
import { locale } from "../../../i18n/store";
import { t } from "../../../i18n/utils/translate";
import SectionHeader from "./SectionHeader.vue";
import { useSectionReveal } from "../../../composables/useSectionReveal";

import type { Locale } from "../../../i18n/types";

const sectionRef = ref<HTMLElement | null>(null);

useSectionReveal(sectionRef, ".education-item", { stagger: 0.1, y: 40 });

const entries = computed(() => {
  const currentLocale = (locale.value ?? "es") as Locale;
  return educationEntries.map((entry) => ({
    id: entry.id,
    title: entry.title[currentLocale],
    institution: entry.institution,
    period: entry.period[currentLocale],
    detail: entry.detail?.[currentLocale],
  }));
});
</script>

<template>
  <section class="education" ref="sectionRef" id="education">
    <div class="grid">
      <SectionHeader :banner="t('education-banner')" :title="t('education')" dark />
    </div>
    <div class="grid education-timeline">
      <div v-for="entry in entries" :key="entry.id" class="education-item">
        <div class="education-item-marker"></div>
        <div class="education-item-content">
          <span class="education-item-period">{{ entry.period }}</span>
          <h3 class="education-item-title">{{ entry.title }}</h3>
          <p class="education-item-institution">{{ entry.institution }}</p>
          <p v-if="entry.detail" class="education-item-detail">{{ entry.detail }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.education {
  width: 100%;
  padding: 96px var(--space-outer);
  background-color: var(--color-dark-blue-500);
  color: var(--color-white-400);
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);

  @include mixins.mq("md") {
    padding-top: 144px;
    padding-bottom: 144px;
    gap: var(--space-xxl);
  }

  &-timeline {
    position: relative;
    gap: var(--space-lg);

    &::before {
      content: "";
      position: absolute;
      left: calc(var(--space-outer) + 5px);
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, var(--color-cyan-400), transparent);

      @include mixins.mq("md") {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  &-item {
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: var(--space-md);
    position: relative;

    @include mixins.mq("md") {
      grid-column: 2 / 12;
      grid-template-columns: 1fr;
      padding-left: var(--space-xl);
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 11;
    }

    &-marker {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: var(--color-cyan-400);
      margin-top: 6px;
      box-shadow: 0 0 12px var(--color-cyan-400);

      @include mixins.mq("md") {
        position: absolute;
        left: calc(var(--space-xl) * -1 + 2px);
        top: 8px;
      }
    }

    &-content {
      border: var(--stroke-sm) solid rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-md);
      padding: var(--space-md);
      background: rgba(255, 255, 255, 0.04);
      display: flex;
      flex-direction: column;
      gap: var(--space-xxs);
      transition: border-color 0.3s ease, background 0.3s ease;

      &:hover {
        border-color: var(--color-cyan-400);
        background: rgba(255, 255, 255, 0.07);
      }
    }

    &-period {
      font-size: var(--font-size-sm);
      font-weight: 700;
      color: var(--color-cyan-400);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    &-title {
      font-size: var(--font-size-title-xxs);
      font-weight: 900;

      @include mixins.mq("md") {
        font-size: var(--font-size-title-xs);
      }
    }

    &-institution {
      font-size: var(--font-size-md);
      opacity: 0.9;
    }

    &-detail {
      font-size: var(--font-size-sm);
      opacity: 0.7;
    }
  }
}
</style>
