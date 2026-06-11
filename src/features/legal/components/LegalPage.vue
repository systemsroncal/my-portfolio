<script setup lang="ts">
import { computed, watch } from "vue";
import Layout from "../../../components/Layout.vue";
import Footer from "../../../components/Footer.vue";
import HeaderHome from "../../../components/HeaderHome.vue";
import LegalArticle from "./LegalArticle.vue";
import { getLegalDocument } from "../../../content/legal";
import { getLegalPath, legalRoute, useLegalRouteSync } from "../../../composables/useLegalRoute";
import { useRouter } from "../../../composables/useRouter";

useLegalRouteSync();

const router = useRouter();

const pageDocument = computed(() => {
  const route = legalRoute.value;
  if (!route) return null;
  return getLegalDocument(route.page, route.locale);
});

const alternatePath = computed(() => {
  const route = legalRoute.value;
  if (!route) return "/";
  const otherLocale = route.locale === "es" ? "en" : "es";
  return getLegalPath(route.page, otherLocale);
});

watch(
  pageDocument,
  (doc) => {
    if (!doc) return;
    document.title = `${doc.title} - Enrique Roncal`;
  },
  { immediate: true },
);

const handleLangSwitch = () => {
  router.push(alternatePath.value);
};
</script>

<template>
  <div v-if="pageDocument" class="legal-page">
    <HeaderHome />
    <Layout>
      <main class="legal-main">
        <article class="legal-content">
          <p class="legal-lang-switch">
            <a
              :href="alternatePath"
              data-cursor="circle-white"
              data-sound="click"
              data-hoversound="hover"
              @click.prevent="handleLangSwitch"
            >
              {{ pageDocument.langSwitchLabel }}
            </a>
          </p>

          <h1>{{ pageDocument.title }}</h1>
          <p class="legal-meta">{{ pageDocument.updated }}</p>

          <LegalArticle :blocks="pageDocument.blocks" />
        </article>
      </main>
      <Footer />
    </Layout>
  </div>
</template>

<style scoped lang="scss">
.legal-page {
  min-height: 100vh;
  width: 100%;
  background: var(--color-beige-500);
  color: var(--color-text-400);
  padding-top: var(--height-header);
}

.legal-main {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: var(--space-xl) var(--space-outer) var(--space-xxl);
}

.legal-content {
  width: min(800px, 100%);
  line-height: 1.6;

  :deep(h1) {
    font-size: 1.75rem;
    margin: 0 0 0.5rem;
    line-height: 1.2;
  }

  :deep(h2) {
    font-size: 1.15rem;
    margin: 2rem 0 0.75rem;
  }

  :deep(p),
  :deep(ul) {
    margin: 0 0 1rem;
  }

  :deep(ul) {
    padding-left: 1.25rem;
  }

  :deep(a) {
    color: #052e87;
  }

  :deep(code) {
    font-size: 0.9em;
    padding: 0.1em 0.35em;
    border-radius: 4px;
    background: rgba(45, 42, 36, 0.08);
  }
}

.legal-meta {
  color: rgba(45, 42, 36, 0.65);
  margin-bottom: 2rem;
}

.legal-lang-switch {
  margin-bottom: 1.5rem;
  font-size: 0.9rem;

  a {
    font-weight: 600;
    color: #052e87;
    text-decoration: none;

    @include mixins.hover {
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.legal-content :deep(.legal-tech-note) {
  margin-top: 2.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(45, 42, 36, 0.12);
  font-size: 12px;
  line-height: 1.55;
  color: rgba(45, 42, 36, 0.62);
}

.legal-content :deep(.legal-attribution) {
  margin-top: 1rem;
  font-size: 11px;
  color: rgba(45, 42, 36, 0.5);
}
</style>
