import { onMounted, onUnmounted, type Ref } from "vue";
import gsap from "gsap";

export const useSkillTagsMotion = (containerRef: Ref<HTMLElement | null>) => {
  let revealTween: gsap.core.Tween | null = null;
  let floatTweens: gsap.core.Tween[] = [];

  onMounted(() => {
    const container = containerRef.value;
    if (!container) return;

    const tags = container.querySelectorAll<HTMLElement>(".skills-card-tag");
    if (!tags.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    gsap.set(tags, { opacity: 0, y: 8 });

    revealTween = gsap.to(tags, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      stagger: { each: 0.035, from: "start" },
      ease: "power2.out",
      scrollTrigger: {
        trigger: container.querySelector(".skills-grid") ?? container,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      onComplete: () => {
        tags.forEach((tag, index) => {
          const float = gsap.to(tag, {
            y: 3,
            duration: 2.6 + (index % 4) * 0.35,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: (index % 7) * 0.18,
          });
          floatTweens.push(float);
        });
      },
    });
  });

  onUnmounted(() => {
    revealTween?.scrollTrigger?.kill();
    revealTween?.kill();
    floatTweens.forEach((tween) => tween.kill());
    revealTween = null;
    floatTweens = [];
  });
};
