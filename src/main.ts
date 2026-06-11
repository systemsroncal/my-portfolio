import { createApp } from "vue";
import "./assets/styles/index.scss";
import App from "./App.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { resources } from "./utils/resources";
import { initPreloaderBootstrap } from "./utils/preloaderDom";
import { preloaderVisible } from "./composables/usePreloader";

declare global {
  interface Window {
    __appBooted?: boolean;
  }
}

const legacyHtmlRedirects: Record<string, string> = {
  "/legal.html": "/en/legal",
  "/privacy.html": "/en/privacy",
  "/es/legal.html": "/legal",
  "/es/privacy.html": "/privacy",
  "/es/legal": "/legal",
  "/es/privacy": "/privacy",
};

const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
const legacyRedirect = legacyHtmlRedirects[currentPath];

if (legacyRedirect) {
  window.location.replace(legacyRedirect);
} else {
  bootApp();
}

function bootApp() {
  window.__appBooted = true;

  gsap.registerPlugin(ScrollTrigger);

  const { hide, setPreloaderProgress, showPreloaderError } = initPreloaderBootstrap(() => {
    preloaderVisible.value = false;
  });

  if (resources.isReady) {
    setPreloaderProgress(1);
    window.setTimeout(hide, 200);
  } else {
    resources.on("progress", (progress) => {
      setPreloaderProgress(0.25 + progress * 0.75);
    });

    resources.once("ready", () => {
      setPreloaderProgress(1);
      window.setTimeout(hide, 200);
    });

    resources.on("error", ({ name, message }) => {
      showPreloaderError(`Error cargando ${name}: ${message}`);
    });
  }

  createApp(App).mount("#app");
}
