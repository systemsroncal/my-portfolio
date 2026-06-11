<script setup lang="ts">
import type { LegalBlock } from "../../../content/legal/types";

defineProps<{
  blocks: LegalBlock[];
}>();

const isTechNote = (index: number, blocks: LegalBlock[]) => {
  const block = blocks[index];
  if (block?.type !== "p") return false;
  return block.html.includes("Vue 3, TypeScript");
};

const isAttribution = (index: number, blocks: LegalBlock[]) => {
  const block = blocks[index];
  if (block?.type !== "p") return false;
  return block.html.includes("portfolio-2025");
};
</script>

<template>
  <template v-for="(block, index) in blocks" :key="index">
    <h2 v-if="block.type === 'h2'">{{ block.text }}</h2>
    <p
      v-else-if="block.type === 'p'"
      v-html="block.html"
      :class="{
        'legal-tech-note': isTechNote(index, blocks),
        'legal-attribution': isAttribution(index, blocks),
      }"
    ></p>
    <ul v-else-if="block.type === 'ul'">
      <li v-for="(item, itemIndex) in block.items" :key="itemIndex" v-html="item"></li>
    </ul>
  </template>
</template>
