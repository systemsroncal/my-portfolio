<script setup lang="ts">
import Button from "./Button.vue";
import { locale } from "../i18n/store";
import { changeLocale } from "../i18n/utils/locale";
import { getLegalPath, legalRoute } from "../composables/useLegalRoute";
import { useRouter } from "../composables/useRouter";

import type { Locale } from "../i18n/types";

const router = useRouter();

const handleLangSwitch = () => {
  const newLocale = (locale.value === "es" ? "en" : "es") as Locale;
  const route = legalRoute.value;

  if (route) {
    router.push(getLegalPath(route.page, newLocale));
  }

  changeLocale(newLocale);
};
</script>

<template>
  <Button
    variant="border"
    size="sm"
    @click="handleLangSwitch"
    data-cursor="circle-white"
    data-sound="click"
    data-hoversound="hover"
    >{{ locale === "es" ? "EN" : "ES" }}</Button
  >
</template>
