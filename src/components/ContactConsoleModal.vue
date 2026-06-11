<script setup lang="ts">
import { computed, ref, watch, onUnmounted, nextTick } from "vue";
import gsap from "gsap";
import { t } from "../i18n/utils/translate";
import { contactMenuOpen, closeContactMenu } from "../composables/useContactMenu";
import { sendContactEmail, ContactEmailError } from "../utils/sendContactEmail";

type ConsoleMode = "menu" | "form";
type FormField = "name" | "email" | "phone" | "message";
type SubmitState = "idle" | "sending" | "success" | "error";

const overlayRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);
const statusRef = ref<HTMLElement | null>(null);
const successRef = ref<HTMLElement | null>(null);

const mode = ref<ConsoleMode>("menu");
const selectedIndex = ref(0);
const formStep = ref(0);
const currentInput = ref("");
const formError = ref("");
const submitState = ref<SubmitState>("idle");
const visibleStatusLines = ref<string[]>([]);
const sendErrorKey = ref("");

const formData = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const formFields: FormField[] = ["name", "email", "phone", "message"];

const fieldLabels: Record<FormField, () => string> = {
  name: () => t("contact-form-name"),
  email: () => t("contact-form-email"),
  phone: () => t("contact-form-phone"),
  message: () => t("contact-form-message"),
};

const fieldPlaceholders: Record<FormField, () => string> = {
  name: () => t("contact-form-placeholder-name"),
  email: () => t("contact-form-placeholder-email"),
  phone: () => t("contact-form-placeholder-phone"),
  message: () => t("contact-form-placeholder-message"),
};

const currentPlaceholder = computed(() =>
  currentField.value ? fieldPlaceholders[currentField.value]() : "",
);

const historyCount = computed(() => {
  if (submitState.value !== "idle" || formStep.value >= formFields.length) {
    return formFields.length;
  }
  return formStep.value;
});

const formHistory = computed(() => {
  return formFields.slice(0, historyCount.value).map((field) => ({
    field,
    label: fieldLabels[field](),
    value: formData.value[field],
  }));
});

const currentField = computed(() => formFields[formStep.value] ?? null);
const isMessageStep = computed(() => currentField.value === "message");
const isInputActive = computed(() => submitState.value === "idle" && formStep.value < formFields.length);

const sendingLines = computed(() => [
  t("contact-console-sending-init"),
  t("contact-console-sending-connect"),
  t("contact-console-sending-auth"),
  t("contact-console-sending-deliver"),
]);

const options = computed(() => [
  {
    id: "whatsapp",
    label: () => t("contact-option-whatsapp"),
    action: () => {
      window.open("https://wa.me/51989867536", "_blank", "noopener,noreferrer");
      closeContactMenu();
    },
  },
  {
    id: "email",
    label: () => t("contact-option-email"),
    action: () => {
      window.location.href = "mailto:systems.roncal@gmail.com";
      closeContactMenu();
    },
  },
  {
    id: "form",
    label: () => t("contact-option-form"),
    action: () => {
      startFormMode();
    },
  },
]);

const resetFormState = () => {
  mode.value = "menu";
  selectedIndex.value = 0;
  formStep.value = 0;
  currentInput.value = "";
  formError.value = "";
  submitState.value = "idle";
  visibleStatusLines.value = [];
  sendErrorKey.value = "";
  formData.value = { name: "", email: "", phone: "", message: "" };
};

const startFormMode = async () => {
  mode.value = "form";
  formStep.value = 0;
  currentInput.value = "";
  formError.value = "";
  submitState.value = "idle";
  visibleStatusLines.value = [];
  sendErrorKey.value = "";
  await nextTick();
  focusInput();
};

const focusInput = () => {
  inputRef.value?.focus();
};

const validateField = (field: FormField, value: string): string | null => {
  const trimmed = value.trim();

  if (!trimmed) {
    return t("contact-console-form-required");
  }

  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return t("contact-console-form-invalid-email");
  }

  if (field === "phone" && trimmed.replace(/\D/g, "").length < 9) {
    return t("contact-console-form-invalid-phone");
  }

  return null;
};

const delay = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const animateStatusLines = async () => {
  visibleStatusLines.value = [];
  await nextTick();

  for (const line of sendingLines.value) {
    visibleStatusLines.value.push(line);
    await nextTick();

    const nodes = statusRef.value?.querySelectorAll(".contact-console-status-line");
    const node = nodes?.[nodes.length - 1] as HTMLElement | undefined;

    if (node) {
      gsap.fromTo(node, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.28, ease: "power2.out" });
    }

    await delay(420);
  }
};

const animateSuccess = async () => {
  await nextTick();
  if (!successRef.value) return;

  gsap.fromTo(
    successRef.value,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
  );
};

const mapSendError = (code: string) => {
  const keyMap: Record<string, string> = {
    smtp_not_configured: "contact-console-send-error-config",
    send_failed: "contact-console-send-error-failed",
    missing_fields: "contact-console-form-required",
    invalid_email: "contact-console-form-invalid-email",
    invalid_phone: "contact-console-form-invalid-phone",
    method_not_allowed: "contact-console-send-error-failed",
  };

  return t(keyMap[code] ?? "contact-console-send-error-failed");
};

const sendForm = async () => {
  submitState.value = "sending";
  sendErrorKey.value = "";
  await animateStatusLines();

  try {
    await sendContactEmail({ ...formData.value });
    submitState.value = "success";
    await animateSuccess();
  } catch (error) {
    submitState.value = "error";
    sendErrorKey.value =
      error instanceof ContactEmailError ? mapSendError(error.message) : t("contact-console-send-error-failed");
  }
};

const retrySend = async () => {
  sendErrorKey.value = "";
  visibleStatusLines.value = [];
  await sendForm();
};

const submitCurrentField = () => {
  if (submitState.value === "success") {
    closeContactMenu();
    return;
  }

  if (!isInputActive.value) return;

  const field = currentField.value;
  if (!field) return;

  const error = validateField(field, currentInput.value);
  if (error) {
    formError.value = error;
    return;
  }

  formError.value = "";
  formData.value[field] = currentInput.value.trim();
  currentInput.value = "";

  if (formStep.value < formFields.length - 1) {
    formStep.value += 1;
    nextTick(focusInput);
    return;
  }

  formStep.value = formFields.length;
  void sendForm();
};

const selectOption = (index: number) => {
  selectedIndex.value = index;
  options.value[index]?.action();
};

const onKeydown = (event: KeyboardEvent) => {
  if (!contactMenuOpen.value) return;

  if (event.key === "Escape") {
    event.preventDefault();
    if (submitState.value === "sending") return;
    if (mode.value === "form" && submitState.value === "idle") {
      resetFormState();
      return;
    }
    closeContactMenu();
    return;
  }

  if (mode.value === "form") {
    if (submitState.value === "success" && event.key === "Enter") {
      event.preventDefault();
      closeContactMenu();
      return;
    }

    if (isInputActive.value && event.key === "Enter" && !isMessageStep.value) {
      event.preventDefault();
      submitCurrentField();
    }
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    selectedIndex.value = (selectedIndex.value + 1) % options.value.length;
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    selectedIndex.value = (selectedIndex.value - 1 + options.value.length) % options.value.length;
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    selectOption(selectedIndex.value);
  }
};

watch(contactMenuOpen, async (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "";

  if (isOpen) {
    resetFormState();
    window.addEventListener("keydown", onKeydown);

    await gsap.fromTo(
      overlayRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" },
    );

    if (panelRef.value) {
      gsap.fromTo(
        panelRef.value,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" },
      );
    }
  } else {
    window.removeEventListener("keydown", onKeydown);
    resetFormState();
  }
});

watch(mode, async () => {
  await nextTick();
  if (mode.value === "form" && isInputActive.value) {
    focusInput();
  }
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="contactMenuOpen"
      ref="overlayRef"
      class="contact-console"
      role="dialog"
      aria-modal="true"
      :aria-label="mode === 'menu' ? t('contact-menu-title') : t('contact-option-form')"
      @click.self="closeContactMenu"
    >
      <div ref="panelRef" class="contact-console-panel">
        <div class="contact-console-terminal">
          <div class="contact-console-terminal-bar">
            <span class="contact-console-terminal-dot"></span>
            <span class="contact-console-terminal-dot"></span>
            <span class="contact-console-terminal-dot"></span>
          </div>

          <div class="contact-console-terminal-body">
            <template v-if="mode === 'menu'">
              <p class="contact-console-prompt">
                <span class="contact-console-prompt-symbol">&gt;</span>
                {{ t("contact-menu-title") }}
              </p>
              <ul class="contact-console-list" role="listbox">
                <li
                  v-for="(option, index) in options"
                  :key="option.id"
                  role="option"
                  :aria-selected="selectedIndex === index"
                >
                  <button
                    type="button"
                    class="contact-console-option"
                    :class="{ 'contact-console-option-active': selectedIndex === index }"
                    @mouseenter="selectedIndex = index"
                    @click="selectOption(index)"
                    data-sound="click"
                  >
                    <span class="contact-console-option-marker">
                      {{ selectedIndex === index ? ">" : " " }}
                    </span>
                    <span class="contact-console-option-index">[{{ index + 1 }}]</span>
                    <span class="contact-console-option-label">{{ option.label() }}</span>
                  </button>
                </li>
              </ul>
              <p class="contact-console-hint">{{ t("contact-menu-hint") }}</p>
            </template>

            <template v-else>
              <p class="contact-console-prompt">
                <span class="contact-console-prompt-symbol">&gt;</span>
                {{ t("contact-option-form") }}
              </p>

              <div v-if="formHistory.length" class="contact-console-history">
                <p
                  v-for="entry in formHistory"
                  :key="entry.field"
                  class="contact-console-history-line"
                >
                  <span class="contact-console-prompt-symbol">&gt;</span>
                  <span class="contact-console-history-label">{{ entry.label }}:</span>
                  <span class="contact-console-history-value">{{ entry.value }}</span>
                </p>
              </div>

              <template v-if="isInputActive">
                <p class="contact-console-prompt contact-console-prompt-input">
                  <span class="contact-console-prompt-symbol">&gt;</span>
                  {{ currentField ? fieldLabels[currentField]() : "" }}:
                </p>

                <form class="contact-console-input-row" @submit.prevent="submitCurrentField">
                  <textarea
                    v-if="isMessageStep"
                    ref="inputRef"
                    v-model="currentInput"
                    class="contact-console-input contact-console-textarea"
                    rows="3"
                    :placeholder="currentPlaceholder"
                    :aria-label="t('contact-form-message')"
                    @keydown.enter.exact.prevent="submitCurrentField"
                  />
                  <input
                    v-else
                    ref="inputRef"
                    v-model="currentInput"
                    class="contact-console-input"
                    :type="currentField === 'email' ? 'email' : currentField === 'phone' ? 'tel' : 'text'"
                    :placeholder="currentPlaceholder"
                    :autocomplete="currentField === 'email' ? 'email' : currentField === 'phone' ? 'tel' : 'name'"
                    :aria-label="currentField ? fieldLabels[currentField]() : ''"
                  />
                  <span class="contact-console-cursor" aria-hidden="true">_</span>
                </form>

                <p v-if="formError" class="contact-console-error">{{ formError }}</p>
                <p class="contact-console-hint">
                  {{
                    isMessageStep
                      ? t("contact-console-form-hint-message")
                      : t("contact-console-form-hint")
                  }}
                </p>
              </template>

              <div
                v-if="submitState === 'sending'"
                ref="statusRef"
                class="contact-console-status"
                aria-live="polite"
              >
                <p
                  v-for="(line, index) in visibleStatusLines"
                  :key="`${line}-${index}`"
                  class="contact-console-status-line"
                >
                  <span class="contact-console-prompt-symbol">&gt;</span>
                  {{ line }}
                </p>
                <p class="contact-console-status-line contact-console-status-active">
                  <span class="contact-console-prompt-symbol">&gt;</span>
                  <span class="contact-console-status-dots">{{ t("contact-console-sending-wait") }}</span>
                  <span class="contact-console-cursor" aria-hidden="true">_</span>
                </p>
              </div>

              <div
                v-if="submitState === 'success'"
                ref="successRef"
                class="contact-console-success-block"
                aria-live="polite"
              >
                <p class="contact-console-success-line">
                  <span class="contact-console-prompt-symbol contact-console-prompt-symbol-ok">[OK]</span>
                  {{ t("contact-console-success") }}
                </p>
                <p class="contact-console-success-detail">{{ t("contact-form-sent") }}</p>
                <button
                  type="button"
                  class="contact-console-submit"
                  data-sound="click"
                  @click="closeContactMenu"
                >
                  {{ t("contact-console-form-close") }}
                </button>
              </div>

              <div v-if="submitState === 'error'" class="contact-console-error-block" aria-live="assertive">
                <p class="contact-console-error">
                  <span class="contact-console-prompt-symbol">!</span>
                  {{ sendErrorKey }}
                </p>
                <button
                  type="button"
                  class="contact-console-submit"
                  data-sound="click"
                  @click="retrySend"
                >
                  {{ t("contact-console-retry") }}
                </button>
              </div>
            </template>
          </div>
        </div>

        <button
          type="button"
          class="contact-console-close"
          :aria-label="t('menu-close')"
          :disabled="submitState === 'sending'"
          @click="closeContactMenu"
          data-sound="click"
        >
          ×
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.contact-console {
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-index-header) + 10);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-outer);
  background: rgba(45, 42, 36, 0.45);
  backdrop-filter: blur(4px);

  &-panel {
    position: relative;
    width: min(460px, 100%);
  }

  &-terminal {
    border: var(--stroke-sm) solid var(--color-grayscale-400);
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.92);
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(9, 20, 52, 0.18);
  }

  &-terminal-bar {
    display: flex;
    gap: 6px;
    padding: 10px 12px;
    border-bottom: var(--stroke-sm) solid rgba(9, 20, 52, 0.08);
    background: var(--color-beige-500);
  }

  &-terminal-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-grayscale-400);
  }

  &-terminal-body {
    padding: var(--space-md);
    font-family: "Courier New", Courier, monospace;
    font-size: 14px;
    color: var(--color-text-400);
    min-height: 200px;
    max-height: min(70vh, 520px);
    overflow-y: auto;
  }

  &-prompt {
    margin: 0 0 var(--space-sm);
    line-height: 1.5;
    color: var(--color-cyan-500);
    font-weight: 700;

    &-input {
      margin-bottom: var(--space-xs);
    }
  }

  &-prompt-symbol {
    color: var(--color-orange-400);
    margin-right: 0.35em;

    &-ok {
      color: #2e9b4d;
    }
  }

  &-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &-option {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 10px 12px;
    border: none;
    border-radius: var(--radius-sm);
    background: transparent;
    font: inherit;
    text-align: left;
    color: inherit;
    cursor: pointer;
    transition: background 0.15s ease;

    &-active {
      background: rgba(0, 134, 187, 0.12);
      color: var(--color-cyan-500);
    }

    &-marker {
      width: 1ch;
      color: var(--color-orange-400);
      font-weight: 700;
    }

    &-index {
      opacity: 0.55;
    }

    &-label {
      font-weight: 700;
    }
  }

  &-history {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: var(--space-sm);
  }

  &-history-line {
    margin: 0;
    line-height: 1.45;
    animation: contact-console-line-in 0.25s ease;
  }

  &-history-label {
    font-weight: 700;
    margin-right: 0.35em;
  }

  &-history-value {
    color: var(--color-text-400);
    word-break: break-word;
  }

  &-input-row {
    display: flex;
    align-items: flex-start;
    gap: 0;
    margin-bottom: var(--space-xs);
  }

  &-input {
    flex: 1;
    min-width: 0;
    border: none;
    background: transparent;
    font: inherit;
    font-size: inherit;
    color: var(--color-text-400);
    padding: 0;
    outline: none;
    caret-color: var(--color-cyan-500);

    &::placeholder {
      color: var(--color-text-400);
      opacity: 0.4;
    }
  }

  &-textarea {
    resize: vertical;
    min-height: 4.5em;
    line-height: 1.45;
  }

  &-cursor {
    color: var(--color-orange-400);
    font-weight: 700;
    animation: contact-console-blink 1s step-end infinite;
    line-height: 1.5;
  }

  &-status {
    margin-top: var(--space-sm);
    padding-top: var(--space-sm);
    border-top: 1px dashed rgba(9, 20, 52, 0.12);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &-status-line {
    margin: 0;
    line-height: 1.45;
    color: var(--color-cyan-500);
    font-weight: 700;
  }

  &-status-active {
    color: var(--color-text-400);
  }

  &-status-dots {
    animation: contact-console-pulse 1.2s ease-in-out infinite;
  }

  &-success-block {
    margin-top: var(--space-sm);
    padding-top: var(--space-sm);
    border-top: 1px dashed rgba(9, 20, 52, 0.12);
  }

  &-success-line {
    margin: 0 0 var(--space-xs);
    line-height: 1.5;
    color: #2e9b4d;
    font-weight: 700;
  }

  &-success-detail {
    margin: 0 0 var(--space-sm);
    font-size: 12px;
    opacity: 0.75;
  }

  &-error-block {
    margin-top: var(--space-sm);
    padding-top: var(--space-sm);
    border-top: 1px dashed rgba(9, 20, 52, 0.12);
  }

  &-error {
    margin: 0 0 var(--space-xs);
    color: var(--color-orange-400);
    font-size: 12px;
    font-weight: 700;
  }

  &-submit {
    margin-top: var(--space-sm);
    padding: 8px 14px;
    border: var(--stroke-sm) solid var(--color-grayscale-400);
    border-radius: var(--radius-sm);
    background: var(--color-beige-500);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    color: var(--color-text-400);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &-hint {
    margin: var(--space-sm) 0 0;
    font-size: 12px;
    opacity: 0.55;
  }

  &-close {
    position: absolute;
    top: -12px;
    right: -12px;
    width: 36px;
    height: 36px;
    border: var(--stroke-sm) solid var(--color-grayscale-400);
    border-radius: 50%;
    background: var(--color-beige-400);
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
    color: var(--color-text-400);

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }
}

@keyframes contact-console-blink {
  50% {
    opacity: 0;
  }
}

@keyframes contact-console-line-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes contact-console-pulse {
  0%,
  100% {
    opacity: 0.45;
  }

  50% {
    opacity: 1;
  }
}
</style>
