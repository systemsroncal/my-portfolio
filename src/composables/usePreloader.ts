import { ref, watch, onMounted, onUnmounted } from "vue";
import { resources } from "../utils/resources";
import gsap from "gsap";

export const preloaderVisible = ref(true);
export const preloaderError = ref<string | null>(null);

const PRELOADER_TIMEOUT_MS = 20_000;

const hidePreloader = () => {
  const preloader = document.querySelector(".preloader") as HTMLElement | null;
  document.body.classList.remove("is-loading");
  preloader?.classList.add("preloader-hidden");
  preloaderVisible.value = false;
};

const showPreloaderStatus = (message: string, isError = false) => {
  const status = document.querySelector(".preloader-status") as HTMLElement | null;
  if (!status) return;
  status.textContent = message;
  status.hidden = false;
  status.classList.toggle("preloader-status-error", isError);
};

export const usePreloader = () => {
  const progress = ref(0);
  const resourcesProgress = ref(resources.isReady ? 1 : resources.progress);

  resources.on("progress", (newProgress) => {
    resourcesProgress.value = newProgress;
  });

  resources.once("ready", () => {
    resourcesProgress.value = 1;
  });

  resources.on("error", ({ name, message }) => {
    preloaderError.value = `${name}: ${message}`;
    showPreloaderStatus(`Error cargando ${name}`, true);
  });

  watch(
    resourcesProgress,
    (newProgress) => {
      progress.value = 0.25 + newProgress * 0.75;
    },
    { immediate: true },
  );

  watch(
    progress,
    (newProgress) => {
      const bar = document.querySelector(".preloader-bar") as HTMLElement | null;
      if (bar) bar.style.width = `${newProgress * 100}%`;

      if (newProgress >= 1) {
        gsap.delayedCall(0.2, hidePreloader);
      }
    },
    { immediate: true },
  );

  let timeoutId: number | undefined;

  onMounted(() => {
    if (resources.isReady) {
      resourcesProgress.value = 1;
      return;
    }

    timeoutId = window.setTimeout(() => {
      if (preloaderVisible.value) {
        const detail =
          resources.errors.length > 0
            ? resources.errors.map((e) => e.name).join(", ")
            : "tiempo de espera agotado";
        preloaderError.value = detail;
        showPreloaderStatus(`Carga lenta — mostrando sitio (${detail})`, true);
        hidePreloader();
      }
    }, PRELOADER_TIMEOUT_MS);
  });

  onUnmounted(() => {
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  });
};
