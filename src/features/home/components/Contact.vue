<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import { t } from "../../../i18n/utils/translate";
import Social from "../../../components/Social.vue";

const contactElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (contactElement.value) {
    transitions.contact.setup(contactElement.value);
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
});
</script>

<template>
  <div class="contact grid" ref="contactElement">
    <div class="contact-content">
      <h2 class="contact-title" v-html="t('lets-work-together')"></h2>
      <p class="contact-subtitle">{{ t("contact-subtitle") }}</p>
      <Social variant="background" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: hidden;
  min-height: min(100%, calc(var(--lvh) * 100));
  padding: var(--space-lg) var(--space-outer) calc(var(--space-xxl) + env(safe-area-inset-bottom, 0px));

  @include mixins.mq("sm") {
    min-height: calc(var(--lvh) * 100);
    padding-top: var(--space-xl);
  }

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
    padding-bottom: var(--space-xxxl);
  }

  &-content {
    position: relative;
    padding-top: var(--space-sm);
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    max-width: 100%;

    @include mixins.mq("sm") {
      grid-column: 1 / 8;
      padding-top: var(--space-md);
    }

    @include mixins.mq("md") {
      gap: var(--space-xl);
      grid-column: 1 / 6;
      padding-top: var(--space-lg);
      max-width: 520px;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 6;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.01em;
    line-height: 0.95;
    font-size: clamp(2rem, 10vw, var(--font-size-title-md));
    max-width: 12ch;
    text-wrap: balance;

    :deep(br) {
      display: block;
      content: "";
    }

    @include mixins.mq("sm") {
      font-size: clamp(2.75rem, 8vw, var(--font-size-title-lg));
      max-width: 14ch;
    }

    @include mixins.mq("md") {
      letter-spacing: 0.02em;
      max-width: none;
    }

    @include mixins.mq("xl") {
      font-size: var(--font-size-title-xl);
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
    flex-wrap: wrap;
    gap: var(--space-sm);

    @include mixins.mq("sm") {
      gap: var(--space-md);
    }
  }
}
</style>
