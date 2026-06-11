import { ref, watch } from "vue";
import { resources } from "../utils/resources";
import { hidePreloaderDom, setPreloaderProgress } from "../utils/preloaderDom";
import gsap from "gsap";

export const preloaderVisible = ref(true);
export const preloaderError = ref<string | null>(null);

export const usePreloader = () => {
  const progress = ref(resources.isReady ? 1 : 0.25 + resources.progress * 0.75);

  resources.on("progress", (newProgress) => {
    progress.value = 0.25 + newProgress * 0.75;
  });

  resources.once("ready", () => {
    progress.value = 1;
  });

  watch(
    progress,
    (newProgress) => {
      setPreloaderProgress(newProgress);

      if (newProgress >= 1 && preloaderVisible.value) {
        gsap.delayedCall(0.2, () => {
          hidePreloaderDom();
          preloaderVisible.value = false;
        });
      }
    },
    { immediate: true },
  );
};
