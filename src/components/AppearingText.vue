<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { BREAKPOINTS } from "../utils/sizes";

const props = defineProps<{
  text: string;
  steps: number;
  duration: number;
}>();

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

const displayText = ref("");
let currentTimeline: gsap.core.Timeline | null = null;
let matchMedia: gsap.MatchMedia | null = null;

watch(
  () => [props.text, props.steps, props.duration],
  () => {
    if (!props.text || typeof window === "undefined") return;

    if (currentTimeline) {
      currentTimeline.kill();
      currentTimeline = null;
    }
    if (matchMedia) {
      matchMedia.revert();
      matchMedia = null;
    }

    displayText.value = "";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      displayText.value = props.text;
      return;
    }

    matchMedia = gsap.matchMedia();

    matchMedia.add(
      {
        isMobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
        isDesktop: `(min-width: ${BREAKPOINTS.md}px)`,
      },
      (context) => {
        const { conditions } = context;
        const { isMobile } = conditions as { isMobile: boolean; isDesktop: boolean };

        const timeline = gsap.timeline({ paused: true });

        if (isMobile) {
          displayText.value = props.text;
        } else {
          const totalLetters = props.text.length;
          const revealCount = Math.max(1, Math.ceil(totalLetters / props.steps));
          const stepDuration = props.duration / revealCount;

          for (let step = 0; step < revealCount; step++) {
            const endIndex = Math.min(totalLetters, (step + 1) * props.steps);

            timeline.to(
              {},
              {
                duration: stepDuration,
                ease: "none",
                onStart: () => {
                  displayText.value = props.text.slice(0, endIndex);
                },
                onComplete: () => {
                  displayText.value = props.text.slice(0, endIndex);
                },
              },
            );
          }
        }

        currentTimeline = timeline;
        emit("timeline:created", timeline);

        return () => {
          timeline.kill();
        };
      },
    );
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (currentTimeline) {
    currentTimeline.kill();
  }
  if (matchMedia) {
    matchMedia.revert();
  }
});
</script>

<template>
  <div class="appearing-text">
    <p class="appearing-text-value" v-html="displayText"></p>
    <p class="appearing-text-clone" aria-hidden="true" v-html="props.text"></p>
  </div>
</template>

<style scoped>
.appearing-text {
  position: relative;
}

.appearing-text-value {
  position: absolute;
}

.appearing-text-clone {
  visibility: hidden;
}
</style>
