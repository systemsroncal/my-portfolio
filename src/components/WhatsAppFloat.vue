<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import Whatsapp from "./icons/Whatsapp.vue";
import { locale } from "../i18n/store";
import { t } from "../i18n/utils/translate";
import {
  whatsappContacts,
  formatWhatsAppPhone,
  buildWhatsAppUrl,
  type WhatsAppContact,
} from "../content/whatsappContacts";

import type { Locale } from "../i18n/types";

type PanelView = "list" | "chat";
type StepDirection = "forward" | "back";

const rootRef = ref<HTMLElement | null>(null);
const messageInputRef = ref<HTMLInputElement | null>(null);
const isOpen = ref(false);
const view = ref<PanelView>("list");
const stepDirection = ref<StepDirection>("forward");
const selectedContact = ref<WhatsAppContact | null>(null);
const message = ref("");

const contactCount = whatsappContacts.length;

const activeLocale = computed(() => (locale.value ?? "es") as Locale);

const stepTransitionName = computed(() =>
  stepDirection.value === "forward" ? "whatsapp-step-forward" : "whatsapp-step-back",
);

const localized = (record: Record<Locale, string>) => record[activeLocale.value];

const toggleOpen = () => {
  if (isOpen.value) {
    closePanel();
    return;
  }

  isOpen.value = true;
  view.value = "list";
  stepDirection.value = "forward";
  selectedContact.value = null;
  message.value = "";
};

const closePanel = () => {
  isOpen.value = false;
  view.value = "list";
  stepDirection.value = "forward";
  selectedContact.value = null;
  message.value = "";
};

const openContact = async (contact: WhatsAppContact) => {
  stepDirection.value = "forward";
  selectedContact.value = contact;
  view.value = "chat";
  message.value = "";

  await nextTick();
  messageInputRef.value?.focus();
};

const backToList = () => {
  stepDirection.value = "back";
  view.value = "list";
  message.value = "";
};

const onStepLeave = () => {
  if (view.value === "list") {
    selectedContact.value = null;
  }
};

const sendMessage = () => {
  if (!selectedContact.value || !message.value.trim()) return;

  const url = buildWhatsAppUrl(selectedContact.value.phone, message.value);
  window.open(url, "_blank", "noopener,noreferrer");
  closePanel();
};

const handleDocumentPointerDown = (event: PointerEvent) => {
  if (!isOpen.value || !rootRef.value) return;
  if (rootRef.value.contains(event.target as Node)) return;
  closePanel();
};

const handleDocumentKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isOpen.value) {
    if (view.value === "chat") {
      backToList();
      return;
    }

    closePanel();
  }
};

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener("keydown", handleDocumentKeydown);
  } else {
    document.removeEventListener("keydown", handleDocumentKeydown);
  }
});

onMounted(() => {
  document.addEventListener("pointerdown", handleDocumentPointerDown);
});

onUnmounted(() => {
  document.removeEventListener("pointerdown", handleDocumentPointerDown);
  document.removeEventListener("keydown", handleDocumentKeydown);
});
</script>

<template>
  <div ref="rootRef" class="whatsapp-float" :class="{ 'whatsapp-float-open': isOpen }">
    <Transition name="whatsapp-panel">
      <div
        v-if="isOpen"
        class="whatsapp-float-panel"
        role="dialog"
        :aria-label="t('whatsapp-float-title')"
        @click.stop
        @pointerdown.stop
      >
        <header class="whatsapp-float-header">
          <template v-if="view === 'list'">
            <Whatsapp class="whatsapp-float-header-icon" />
            <div class="whatsapp-float-header-text">
              <p class="whatsapp-float-header-title">{{ t("whatsapp-float-title") }}</p>
              <p class="whatsapp-float-header-subtitle">{{ t("whatsapp-float-subtitle") }}</p>
            </div>
          </template>

          <template v-else-if="selectedContact">
            <button
              type="button"
              class="whatsapp-float-back"
              :aria-label="t('whatsapp-float-back')"
              @click.stop="backToList"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M15 18l-6-6 6-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <div class="whatsapp-float-header-text">
              <p class="whatsapp-float-header-title">{{ localized(selectedContact.name) }}</p>
              <p class="whatsapp-float-header-subtitle">{{ localized(selectedContact.role) }}</p>
            </div>
            <span class="whatsapp-float-avatar whatsapp-float-avatar-sm" aria-hidden="true">
              <img v-if="selectedContact.avatar" :src="selectedContact.avatar" alt="" />
              <template v-else>{{ selectedContact.initials }}</template>
            </span>
          </template>
        </header>

        <div class="whatsapp-float-body">
          <Transition :name="stepTransitionName" mode="out-in" @after-leave="onStepLeave">
            <div v-if="view === 'list'" key="list" class="whatsapp-float-content">
              <ul class="whatsapp-float-contacts">
                <li v-for="contact in whatsappContacts" :key="contact.id">
                  <button
                    type="button"
                    class="whatsapp-float-contact"
                    @click.stop="openContact(contact)"
                  >
                    <span class="whatsapp-float-avatar" aria-hidden="true">
                      <img v-if="contact.avatar" :src="contact.avatar" alt="" />
                      <template v-else>{{ contact.initials }}</template>
                    </span>
                    <span class="whatsapp-float-contact-info">
                      <span class="whatsapp-float-contact-name">{{ localized(contact.name) }}</span>
                      <span class="whatsapp-float-contact-phone">{{ formatWhatsAppPhone(contact.phone) }}</span>
                    </span>
                    <Whatsapp class="whatsapp-float-contact-icon" />
                  </button>
                </li>
              </ul>
            </div>

            <div
              v-else-if="view === 'chat' && selectedContact"
              key="chat"
              class="whatsapp-float-content whatsapp-float-content-chat"
            >
              <div class="whatsapp-float-chat-body">
                <div class="whatsapp-float-bubble">
                  {{ localized(selectedContact.greeting) }}
                </div>
              </div>

              <div class="whatsapp-float-chat-input">
                <input
                  ref="messageInputRef"
                  v-model="message"
                  type="text"
                  class="whatsapp-float-input"
                  :placeholder="t('whatsapp-float-input-placeholder')"
                  @keydown.enter.prevent="sendMessage"
                />
                <button
                  type="button"
                  class="whatsapp-float-send"
                  :aria-label="t('whatsapp-float-send')"
                  :disabled="!message.trim()"
                  @click.stop="sendMessage"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <p class="whatsapp-float-powered">{{ t("whatsapp-float-powered") }}</p>
      </div>
    </Transition>

    <div class="whatsapp-float-trigger-wrap">
      <span class="whatsapp-float-sonar" aria-hidden="true"></span>
      <span class="whatsapp-float-sonar whatsapp-float-sonar-delay" aria-hidden="true"></span>

      <button
        type="button"
        class="whatsapp-float-trigger"
        :aria-label="isOpen ? t('whatsapp-float-close') : t('whatsapp-float-open')"
        :aria-expanded="isOpen"
        @click.stop="toggleOpen"
      >
        <Whatsapp v-if="!isOpen" class="whatsapp-float-trigger-icon" />
        <svg v-else class="whatsapp-float-trigger-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M18 6 6 18M6 6l12 12"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          />
        </svg>
        <span v-if="!isOpen" class="whatsapp-float-badge">{{ contactCount }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.whatsapp-float {
  position: fixed;
  right: max(16px, env(safe-area-inset-right));
  bottom: max(20px, env(safe-area-inset-bottom));
  z-index: var(--z-index-whatsapp-float);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }

  &-panel {
    width: min(360px, calc(100vw - 32px));
    background: #f0f2f5;
    border-radius: 16px;
    overflow: hidden;
    box-shadow:
      0 12px 28px rgba(0, 0, 0, 0.18),
      0 2px 8px rgba(0, 0, 0, 0.08);
    transform-origin: bottom right;
    display: flex;
    flex-direction: column;
  }

  &-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: #25d366;
    color: #fff;
    flex-shrink: 0;

    &-icon {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
      --icon-color: #fff;
    }

    &-text {
      flex: 1;
      min-width: 0;
    }

    &-title {
      font-size: 0.95rem;
      font-weight: 700;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &-subtitle {
      margin-top: 2px;
      font-size: 0.78rem;
      line-height: 1.3;
      opacity: 0.92;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &-body {
    position: relative;
    overflow: hidden;
    flex: 1;
    min-height: 240px;
    background: #f0f2f5;
  }

  &-content {
    width: 100%;

    &-chat {
      display: flex;
      flex-direction: column;
      min-height: 240px;
    }
  }

  &-contacts {
    list-style: none;
    margin: 0;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &-contact {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border: none;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    text-align: left;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    &-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    &-name {
      font-size: 0.95rem;
      font-weight: 700;
      color: #111b21;
      line-height: 1.2;
    }

    &-phone {
      font-size: 0.82rem;
      color: #667781;
      line-height: 1.2;
    }

    &-icon {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      --icon-color: #25d366;
    }
  }

  &-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #075e54, #128c7e);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 700;
    flex-shrink: 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-sm {
      width: 40px;
      height: 40px;
      font-size: 0.75rem;
    }
  }

  &-back {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  &-chat-body {
    flex: 1;
    padding: 16px 14px;
    background:
      linear-gradient(rgba(229, 221, 213, 0.45), rgba(229, 221, 213, 0.45)),
      #e5ddd5;
    min-height: 160px;
  }

  &-bubble {
    max-width: 88%;
    padding: 10px 12px;
    border-radius: 0 12px 12px 12px;
    background: #fff;
    color: #111b21;
    font-size: 0.88rem;
    line-height: 1.45;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  }

  &-chat-input {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: #f0f2f5;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    flex-shrink: 0;
  }

  &-input {
    flex: 1;
    min-width: 0;
    border: none;
    border-radius: 24px;
    padding: 10px 14px;
    font: inherit;
    font-size: 0.9rem;
    background: #fff;
    color: #111b21;

    &:focus {
      outline: 2px solid rgba(37, 211, 102, 0.35);
      outline-offset: 1px;
    }
  }

  &-send {
    width: 42px;
    height: 42px;
    border: none;
    border-radius: 50%;
    background: #25d366;
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition:
      opacity 0.15s ease,
      transform 0.15s ease;

    svg {
      width: 18px;
      height: 18px;
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      transform: scale(1.04);
    }
  }

  &-powered {
    margin: 0;
    padding: 8px 12px 10px;
    text-align: center;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: rgba(17, 27, 33, 0.38);
    background: #f0f2f5;
    border-top: 1px solid rgba(0, 0, 0, 0.04);
    flex-shrink: 0;
  }

  &-trigger-wrap {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-sonar {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(37, 211, 102, 0.45) 0%, rgba(37, 211, 102, 0.2) 45%, transparent 70%);
    animation: whatsapp-sonar 2.4s ease-out infinite;
    pointer-events: none;
  }

  &-sonar-delay {
    animation-delay: 1.2s;
  }

  &-trigger {
    position: relative;
    z-index: 1;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    background: #25d366;
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
    animation: whatsapp-heartbeat 1.8s ease-in-out infinite;

    &-icon {
      width: 30px;
      height: 30px;
      --icon-color: #fff;
    }
  }

  &-badge {
    position: absolute;
    top: -2px;
    right: -2px;
    min-width: 20px;
    height: 20px;
    padding: 0 5px;
    border-radius: 999px;
    background: #e53935;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  &-open {
    .whatsapp-float-sonar {
      animation-play-state: paused;
      opacity: 0;
    }

    .whatsapp-float-trigger {
      animation: none;
    }
  }
}

.whatsapp-panel-enter-active,
.whatsapp-panel-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s var(--ease-smooth);
}

.whatsapp-panel-enter-from,
.whatsapp-panel-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}

.whatsapp-step-forward-enter-active,
.whatsapp-step-forward-leave-active,
.whatsapp-step-back-enter-active,
.whatsapp-step-back-leave-active {
  transition:
    transform 0.26s var(--ease-smooth),
    opacity 0.26s ease;
}

.whatsapp-step-forward-enter-from {
  opacity: 0;
  transform: translateX(24px);
}

.whatsapp-step-forward-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}

.whatsapp-step-back-enter-from {
  opacity: 0;
  transform: translateX(-24px);
}

.whatsapp-step-back-leave-to {
  opacity: 0;
  transform: translateX(24px);
}

@keyframes whatsapp-heartbeat {
  0%,
  100% {
    transform: scale(1);
  }

  15% {
    transform: scale(1.08);
  }

  30% {
    transform: scale(1);
  }

  45% {
    transform: scale(1.05);
  }

  60% {
    transform: scale(1);
  }
}

@keyframes whatsapp-sonar {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }

  70% {
    opacity: 0.12;
  }

  100% {
    transform: scale(2.35);
    opacity: 0;
  }
}
</style>
