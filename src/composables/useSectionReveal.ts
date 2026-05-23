import { onMounted, onUnmounted, type Ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SectionRevealOptions {
  stagger?: number;
  y?: number;
  start?: string;
}

export const useSectionReveal = (
  containerRef: Ref<HTMLElement | null>,
  itemSelector: string,
  options: SectionRevealOptions = {},
) => {
  let triggers: ScrollTrigger[] = [];

  onMounted(() => {
    const container = containerRef.value;
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);
    if (!items.length) return;

    gsap.set(items, { opacity: 0, scale: 0.96, filter: "blur(6px)" });

    const tween = gsap.to(items, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.65,
      stagger: options.stagger ?? 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: options.start ?? "top 82%",
        toggleActions: "play none none reverse",
      },
    });

    if (tween.scrollTrigger) {
      triggers.push(tween.scrollTrigger);
    }
  });

  onUnmounted(() => {
    triggers.forEach((trigger) => trigger.kill());
    triggers = [];
  });
};
