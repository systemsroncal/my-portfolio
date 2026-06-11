<script setup lang="ts">
import { computed, ref } from "vue";
import { experienceAreas } from "../../../content/experience";
import { locale } from "../../../i18n/store";
import { t } from "../../../i18n/utils/translate";
import NotchSection from "../../../components/NotchSection.vue";
import SectionHeader from "./SectionHeader.vue";
import { useSectionReveal } from "../../../composables/useSectionReveal";

import type { Locale } from "../../../i18n/types";

const sectionRef = ref<HTMLElement | null>(null);

useSectionReveal(sectionRef, ".experience-card", { stagger: 0.1, y: 40 });

const areas = computed(() => {
  const currentLocale = (locale.value ?? "es") as Locale;
  return experienceAreas.map((area) => ({
    id: area.id,
    name: area.name[currentLocale],
    highlights: area.highlights[currentLocale],
  }));
});
</script>

<template>
  <section class="experience" ref="sectionRef" id="experience">
    <NotchSection class="experience-notch-start" />
    <NotchSection class="experience-notch-end" />
    <div class="grid">
      <SectionHeader :banner="t('experience-banner')" :title="t('experience')" />
      <p class="experience-intro">{{ t("experience-intro") }}</p>
    </div>
    <div class="grid experience-list">
      <article v-for="area in areas" :key="area.id" class="experience-card">
        <h3 class="experience-card-title">{{ area.name }}</h3>
        <ul class="experience-card-highlights">
          <li v-for="(item, index) in area.highlights" :key="index">{{ item }}</li>
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

  &-intro {
    grid-column: 1 / 13;
    font-size: var(--font-size-md);
    line-height: var(--line-height-copy);
    max-width: 640px;

    @include mixins.mq("lg") {
      grid-column: 2 / 9;
    }
  }

  &-list {
    gap: var(--space-md);
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
    gap: var(--space-sm);
    transition: transform 0.3s var(--ease-smooth);

    @include mixins.mq("sm") {
      grid-column: span 6;
    }

    @include mixins.mq("md") {
      grid-column: span 4;
      padding: var(--space-lg);
    }

    &:hover {
      transform: translateY(-4px);
    }

    &-title {
      font-size: var(--font-size-title-xxs);
      font-weight: 900;
      letter-spacing: 0.02em;

      @include mixins.mq("md") {
        font-size: var(--font-size-title-xs);
      }
    }

    &-highlights {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      padding-left: 1.1rem;
      font-size: var(--font-size-sm);
      line-height: var(--line-height-copy);

      @include mixins.mq("md") {
        font-size: var(--font-size-md);
      }

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
