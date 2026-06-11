const PRELOADER_TIMEOUT_MS = 15_000;

export const hidePreloaderDom = () => {
  document.body.classList.remove("is-loading");
  document.querySelector(".preloader")?.classList.add("preloader-hidden");
};

export const setPreloaderProgress = (value: number) => {
  const bar = document.querySelector(".preloader-bar") as HTMLElement | null;
  if (bar) bar.style.width = `${Math.min(1, Math.max(0, value)) * 100}%`;
};

export const showPreloaderError = (message: string) => {
  const status = document.querySelector(".preloader-status") as HTMLElement | null;
  if (!status) return;
  status.hidden = false;
  status.textContent = message;
  status.classList.add("preloader-status-error");
};

export const initPreloaderBootstrap = (onHide?: () => void) => {
  setPreloaderProgress(0.25);

  const hide = () => {
    hidePreloaderDom();
    onHide?.();
  };

  window.setTimeout(() => {
    if (document.body.classList.contains("is-loading")) {
      showPreloaderError("Carga lenta — entrando al sitio");
      hide();
    }
  }, PRELOADER_TIMEOUT_MS);

  return { hide, setPreloaderProgress, showPreloaderError };
};
