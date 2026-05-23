<script setup lang="ts">
import { computed, ref } from "vue";
import { experienceEntries } from "../../../content/experience";
import { locale } from "../../../i18n/store";
import { t } from "../../../i18n/utils/translate";
import NotchSection from "../../../components/NotchSection.vue";
import SectionHeader from "./SectionHeader.vue";
import { useSectionReveal } from "../../../composables/useSectionReveal";

import type { Locale } from "../../../i18n/types";

const sectionRef = ref<HTMLElement | null>(null);

useSectionReveal(sectionRef, ".experience-card", { stagger: 0.15, y: 56 });

const entries = computed(() => {
  const currentLocale = (locale.value ?? "es") as Locale;
  return experienceEntries.map((entry) => ({
    id: entry.id,
    role: entry.role[currentLocale],
    company: entry.company,
    period: entry.period[currentLocale],
    type: entry.type[currentLocale],
    highlights: entry.highlights[currentLocale],
  }));
});
</script>

<template>
  <section class="experience" ref="sectionRef" id="experience">
    <NotchSection class="experience-notch-start" />
    <NotchSection class="experience-notch-end" />
    <div class="grid">
      <SectionHeader :banner="t('experience-banner')" :title="t('experience')" />
    </div>
    <div class="grid experience-list">
      <article v-for="entry in entries" :key="entry.id" class="experience-card">
        <div class="experience-card-header">
          <div class="experience-card-meta">
            <span class="experience-card-period">{{ entry.period }}</span>
            <span class="experience-card-type">{{ entry.type }}</span>
          </div>
          <h3 class="experience-card-role">{{ entry.role }}</h3>
          <p class="experience-card-company">{{ entry.company }}</p>
        </div>
        <ul class="experience-card-highlights">
          <li v-for="(item, index) in entry.highlights" :key="index">{{ item }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.experience {
  position: relative;
  width: 100%;
  padding: 96px var(--space-outer);
  background-color: var(--color-beige-600);
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);

  @include mixins.mq("md") {
    padding-top: 144px;
    padding-bottom: 144px;
    gap: var(--space-xxl);
  }

  &-list {
    gap: var(--space-lg);
  }

  &-card {
    grid-column: 1 / 13;
    border: var(--stroke-sm) solid var(--color-cyan-400);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    background: linear-gradient(
      160deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    transition: transform 0.3s var(--ease-smooth);

    @include mixins.mq("md") {
      grid-column: 2 / 12;
      padding: var(--space-lg);
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 11;
    }

    &:hover {
      transform: translateY(-4px);
    }

    &-header {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    &-meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      align-items: center;
    }

    &-period {
      font-size: var(--font-size-sm);
      font-weight: 700;
      color: var(--color-cyan-500);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    &-type {
      font-size: var(--font-size-xs);
      font-weight: 700;
      padding: 2px var(--space-xs);
      border-radius: var(--radius-sm);
      background-color: var(--color-orange-400);
      color: var(--color-white-400);
    }

    &-role {
      font-size: var(--font-size-title-xs);
      font-weight: 900;
      letter-spacing: 0.02em;

      @include mixins.mq("md") {
        font-size: var(--font-size-title-sm);
      }
    }

    &-company {
      font-size: var(--font-size-md);
      font-weight: 700;
      opacity: 0.85;
    }

    &-highlights {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      padding-left: 1.1rem;
      font-size: var(--font-size-md);
      line-height: var(--line-height-copy);

      li {
        list-style: disc;
      }
    }
  }

  &-notch {
    &-start {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      color: var(--color-beige-600);
      --icon-color: var(--color-beige-600);
    }

    &-end {
      position: absolute;
      bottom: 0;
      left: 0;
      color: var(--color-dark-blue-500);
      --icon-color: var(--color-dark-blue-500);
    }
  }
}
</style>
