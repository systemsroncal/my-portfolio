<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import { t } from "../../../i18n/utils/translate";
import Social from "../../../components/Social.vue";

const contactHeroRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (contactHeroRef.value) {
    transitions.contact.setup(contactHeroRef.value);
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
});
</script>

<template>
  <section class="contact">
    <div class="contact-hero grid" ref="contactHeroRef" id="contact">
      <div class="contact-content">
        <h2 class="contact-title" v-html="t('lets-work-together')"></h2>
        <p class="contact-subtitle">{{ t("contact-subtitle") }}</p>
        <Social variant="background" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);

  &-hero {
    position: relative;
    z-index: 1;
    width: 100%;
    min-height: calc(var(--lvh) * 100);
    padding: calc(var(--height-header) + var(--space-xl)) var(--space-outer) var(--space-xl);
    align-content: end;

    @include mixins.mq("md") {
      padding-bottom: var(--space-xxl);
      align-content: center;
    }
  }

  &-content {
    position: relative;
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    max-width: 100%;

    @include mixins.mq("sm") {
      grid-column: 1 / 8;
      gap: var(--space-lg);
      max-width: 480px;
    }

    @include mixins.mq("md") {
      grid-column: 1 / 7;
      gap: var(--space-xl);
      max-width: min(540px, 46vw);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 7;
      max-width: 560px;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.01em;
    line-height: 1.05;
    font-size: clamp(2.25rem, 8vw, var(--font-size-title-lg));

    :deep(br) {
      display: block;
      content: "";
    }

    @include mixins.mq("sm") {
      font-size: clamp(2.5rem, 5.5vw, var(--font-size-title-lg));
    }

    @include mixins.mq("md") {
      letter-spacing: 0.02em;
      font-size: clamp(2.75rem, 4.5vw, var(--font-size-title-xl));
    }
  }

  &-subtitle {
    font-size: var(--font-size-md);
    line-height: var(--line-height-copy);
    max-width: 36ch;
    opacity: 0.85;

    @include mixins.mq("sm") {
      max-width: 420px;
    }
  }

  :deep(.social) {
    display: grid;
    grid-template-columns: repeat(3, 44px);
    gap: var(--space-sm);
    width: fit-content;

    @include mixins.mq("sm") {
      grid-template-columns: repeat(6, 44px);
      gap: var(--space-md);
    }
  }
}
</style>
