<script setup lang="ts">
import Banner from "../../../components/Banner.vue";

defineProps<{
  banner: string;
  title: string;
  dark?: boolean;
}>();
</script>

<template>
  <div :class="['section-header', { 'section-header-dark': dark }]">
    <Banner class="section-header-banner" :copy="banner" size="sm" animated />
    <h2 class="section-header-title">{{ title }}</h2>
  </div>
</template>

<style scoped lang="scss">
.section-header {
  position: relative;
  padding-top: var(--space-md);
  grid-column: 1 / 13;

  @include mixins.mq("md") {
    grid-column: 1 / 10;
  }

  @include mixins.mq("lg") {
    grid-column: 2 / 8;
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: var(--font-size-title-md);

    @include mixins.mq("sm") {
      font-size: var(--font-size-title-lg);
    }

    @include mixins.mq("xl") {
      font-size: var(--font-size-title-xl);
    }
  }

  &-banner {
    position: absolute;
    top: 0;
    left: -8px;
    transform: translate(0, -20%) rotate(-4deg);

    @include mixins.mq("lg") {
      left: -16px;
      transform: translate(0, -20%) rotate(-6deg);
    }
  }

  &-dark &-title {
    color: var(--color-white-400);
  }
}
</style>
