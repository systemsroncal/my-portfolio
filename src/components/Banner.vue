<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import AppearingText from "./AppearingText.vue";
import gsap from "gsap";

const props = defineProps<{
  copy: string;
  size?: "sm" | "md";
  animated?: boolean;
}>();

const resolvedSize = computed(() => props.size ?? "md");

const appearingTl = ref<gsap.core.Timeline | null>(null);
const bannerRef = ref<HTMLDivElement | null>(null);
const backgroundRef = ref<HTMLDivElement | null>(null);

const DURATION = 0.55;

const handleTimelineCreated = (timeline: gsap.core.Timeline) => {
  appearingTl.value = timeline;
};

watchEffect((onInvalidate) => {
  if (!appearingTl.value || !bannerRef.value || !backgroundRef.value || !props.animated || !props.copy) return;

  const tl = gsap.timeline({
    onStart: () => {
      appearingTl.value?.play();
    },
    scrollTrigger: {
      trigger: bannerRef.value,
      start: "top bottom",
      end: "bottom top",
    },
  });

  gsap.set(backgroundRef.value, { opacity: 0, y: 8 });
  tl.fromTo(
    backgroundRef.value,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: DURATION, ease: "power3.out" },
    0,
  );

  onInvalidate(() => {
    tl.kill();
  });
});
</script>

<template>
  <div ref="bannerRef" class="banner" :class="`banner-size-${resolvedSize}`">
    <div ref="backgroundRef" class="banner-background"></div>
    <div class="banner-copy" :class="`banner-copy-size-${resolvedSize}`">
      <AppearingText
        :text="props.copy"
        :steps="3"
        :duration="DURATION"
        @timeline:created="handleTimelineCreated"
        v-if="props.animated"
      />
      <p class="banner-copy-value" v-else>{{ props.copy }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  width: fit-content;
  transform-origin: center center;
  position: relative;

  &-background {
    position: absolute;
    outline: var(--stroke-lg) solid var(--color-beige-400);
    background-color: #263c70;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--radius-sm);
  }

  &-size {
    &-sm {
      padding: 2px var(--space-xxs);

      @include mixins.mq("lg") {
        padding: var(--space-xxs) var(--space-xs);
      }
    }

    &-md {
      padding: var(--space-xxs) var(--space-xs);

      @include mixins.mq("lg") {
        padding: var(--space-xs) var(--space-sm);
      }
    }
  }

  &-copy {
    font-weight: 700;
    color: var(--color-white-400);
    font-family: "ProFontWindows";
    text-transform: uppercase;

    &-size {
      &-sm {
        font-size: var(--font-size-title-xxs);

        @include mixins.mq("xl") {
          font-size: var(--font-size-title-xs);
        }
      }

      &-md {
        font-size: var(--font-size-title-xxs);

        @include mixins.mq("lg") {
          font-size: var(--font-size-title-xs);
        }

        @include mixins.mq("xl") {
          font-size: var(--font-size-title-sm);
        }
      }
    }
  }
}
</style>
