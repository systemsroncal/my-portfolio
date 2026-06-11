<script setup lang="ts">
import CodeBrackets from "./icons/CodeBrackets.vue";
</script>

<template>
  <div class="logo">
    <CodeBrackets class="logo-icon" />
    <span class="logo-text">ENRIQUE RONCAL</span>
  </div>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: inherit;

  @include mixins.mq("md") {
    gap: var(--space-sm);
  }

  &-icon {
    width: 28px;
    height: 28px;
    flex-shrink: 0;

    @include mixins.mq("md") {
      width: 32px;
      height: 32px;
    }
  }

  &-text {
    font-weight: 900;
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @include mixins.mq("sm") {
      font-size: 0.85rem;
      letter-spacing: 0.08em;
    }

    @include mixins.mq("lg") {
      font-size: 1rem;
    }
  }
}
</style>
