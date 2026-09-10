import { useEffect, useRef, useState } from 'react';

/**
 * Reveals elements with [data-reveal] when they scroll into view.
 * Adds 'reveal-ready' to <html> so content is hidden only after JS confirms
 * the IntersectionObserver is working — without JS, everything stays visible.
 */
export function useScrollReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    document.documentElement.classList.add('reveal-ready');
    revealEls.forEach((el) => observer.observe(el));

    requestAnimationFrame(() => {
      revealEls.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.05) {
          el.classList.add('visible');
        }
      });
    });

    return () => observer.disconnect();
  }, []);
}

/** Tracks scroll position to toggle the compact header state. */
export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/** Returns a 0–100 scroll progress value for the top progress bar. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

/** Tracks which process steps are currently active based on scroll position. */
export function useProcessProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [activeStep, setActiveStep] = useState(0);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.62;
      const end = vh * 0.28;
      const total = rect.height + start - end;
      let p = (start - rect.top) / total;
      p = Math.max(0, Math.min(1, p));
      setFillHeight(p * 100);

      const steps = el.querySelectorAll('[data-step]');
      let active = 0;
      steps.forEach((step, i) => {
        if (step.getBoundingClientRect().top < vh * 0.66) active = i;
      });
      setActiveStep(active);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);

  return { activeStep, fillHeight };
}

/** Subtle mouse-parallax for the hero glass stack. */
export function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const target = targetRef.current;
    if (!el || !target) return;
    if (!window.matchMedia('(pointer:fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      target.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0)`;
    };
    const onLeave = () => {
      target.style.transform = '';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return { ref, targetRef };
}

/** Subtle 3D tilt on cards for pointer-fine devices. */
export function useCardTilt() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer:fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-y * 1.6}deg) rotateY(${x * 1.6}deg)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return ref;
}
