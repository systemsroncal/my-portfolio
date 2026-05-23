<script setup lang="ts">
import { computed, ref } from "vue";
import { skillCategories } from "../../../content/skills";
import { locale } from "../../../i18n/store";
import { t } from "../../../i18n/utils/translate";
import NotchSection from "../../../components/NotchSection.vue";
import SectionHeader from "./SectionHeader.vue";
import { useSectionReveal } from "../../../composables/useSectionReveal";

import type { Locale } from "../../../i18n/types";

const sectionRef = ref<HTMLElement | null>(null);

useSectionReveal(sectionRef, ".skills-card", { stagger: 0.08, y: 36 });

const categories = computed(() => {
  const currentLocale = (locale.value ?? "es") as Locale;
  return skillCategories.map((category) => ({
    id: category.id,
    name: category.name[currentLocale],
    items: category.items,
  }));
});
</script>

<template>
  <section class="skills" ref="sectionRef" id="skills">
    <NotchSection class="skills-notch-start" />
    <div class="grid">
      <SectionHeader :banner="t('skills-banner')" :title="t('skills')" />
      <p class="skills-intro">{{ t("skills-intro") }}</p>
    </div>
    <div class="grid skills-grid">
      <div v-for="category in categories" :key="category.id" class="skills-card">
        <h3 class="skills-card-title">{{ category.name }}</h3>
        <ul class="skills-card-list">
          <li v-for="item in category.items" :key="item" class="skills-card-tag">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.skills {
  position: relative;
  width: 100%;
  padding: 96px var(--space-outer) 144px;
  background-color: var(--color-beige-400);
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);

  @include mixins.mq("md") {
    padding-top: 144px;
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

  &-grid {
    gap: var(--space-md);
  }

  &-card {
    grid-column: 1 / 13;
    border: var(--stroke-sm) solid var(--color-grayscale-400);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    background-color: var(--color-beige-500);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    transition:
      transform 0.3s var(--ease-smooth),
      border-color 0.3s ease;

    @include mixins.mq("sm") {
      grid-column: span 6;
    }

    @include mixins.mq("md") {
      grid-column: span 4;
    }

    @include mixins.mq("lg") {
      grid-column: span 4;
    }

    &:hover {
      transform: translateY(-3px);
      border-color: var(--color-cyan-400);
    }

    &-title {
      font-size: var(--font-size-title-xxs);
      font-weight: 900;
      letter-spacing: 0.02em;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }

    &-tag {
      font-size: var(--font-size-sm);
      font-weight: 700;
      padding: var(--space-xxs) var(--space-sm);
      border-radius: 100px;
      background-color: var(--color-beige-400);
      border: var(--stroke-sm) solid var(--color-grayscale-400);
    }
  }

  &-notch-start {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    color: var(--color-beige-400);
    --icon-color: var(--color-beige-400);
  }
}
</style>
