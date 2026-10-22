import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nextTick, onMounted, onUnmounted, watch, type Ref } from "vue";

interface UseEducationHorizontalScrollOptions {
  sectionRef: Ref<HTMLElement | null>;
  pinRef: Ref<HTMLElement | null>;
  trackRef: Ref<HTMLElement | null>;
  viewportRef: Ref<HTMLElement | null>;
  slideCount: Ref<number>;
  activeIndex: Ref<number>;
  enabled: Ref<boolean>;
}

export const useEducationHorizontalScroll = ({
  sectionRef,
  pinRef,
  trackRef,
  viewportRef,
  slideCount,
  activeIndex,
  enabled,
}: UseEducationHorizontalScrollOptions) => {
  let tween: gsap.core.Tween | null = null;
  let resizeTimer: ReturnType<typeof setTimeout> | null = null;

  const cleanup = () => {
    tween?.scrollTrigger?.kill();
    tween?.kill();
    tween = null;
  };

  const setup = () => {
    cleanup();

    if (!enabled.value) return;

    const section = sectionRef.value;
    const pin = pinRef.value;
    const track = trackRef.value;
    const viewport = viewportRef.value;
    const count = slideCount.value;

    if (!section || !pin || !track || !viewport || count <= 0) return;

    gsap.set(track, { x: 0 });

    if (count <= 1) {
      activeIndex.value = 0;
      return;
    }

    const getScrollAmount = () => Math.max(track.scrollWidth - viewport.clientWidth, 0);
    const scrollDistance = getScrollAmount();

    if (scrollDistance <= 0) {
      activeIndex.value = 0;
      return;
    }

    tween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: pin,
        pinType: "fixed",
        scrub: 0.85,
        start: "top top",
        end: () => `+=${Math.max(getScrollAmount(), window.innerHeight * 0.5)}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const total = slideCount.value;
          if (total <= 1) {
            activeIndex.value = 0;
            return;
          }
          activeIndex.value = Math.round(self.progress * (total - 1));
        },
        snap: {
          snapTo: (value) => {
            const total = slideCount.value;
            if (total <= 1) return value;
            return Math.round(value * (total - 1)) / (total - 1);
          },
          duration: { min: 0.12, max: 0.35 },
          delay: 0,
          ease: "power1.inOut",
        },
      },
    });
  };

  const refresh = async () => {
    await nextTick();
    setup();
    ScrollTrigger.refresh();
  };

  const handleResize = () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      refresh();
    }, 150);
  };

  onMounted(() => {
    refresh();
    window.addEventListener("resize", handleResize);
  });

  watch([slideCount, enabled], () => {
    refresh();
  });

  onUnmounted(() => {
    if (resizeTimer) clearTimeout(resizeTimer);
    window.removeEventListener("resize", handleResize);
    cleanup();
  });

  return { refresh };
};
