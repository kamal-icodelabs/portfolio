"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import styles from "./Topbar.module.css";

const CLIP_SKEW = "polygon(0 0, 100% 0, 90% 100%, 0 100%)";
const CLIP_VERTICAL = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

export function Topbar() {
  const navRef = useRef(null);
  const bar1Ref = useRef(null);
  const bar2Ref = useRef(null);
  const bar3Ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const getWidth = useCallback(() => {
    if (typeof window === "undefined") return "100%";
    if (window.innerWidth > 768) return 480;
    if (window.innerWidth > 580) return "50%";
    return "100%";
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { width: getWidth(), x: "-100%", clipPath: CLIP_SKEW });

    const onResize = () => {
      if (!isOpen) {
        gsap.set(nav, { width: getWidth() });
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getWidth, isOpen]);

  const animateBars = (open) => {
    const tl = gsap.timeline();

    if (open) {
      tl.to(bar1Ref.current, { rotation: 45, y: 4, width: 28, duration: 0.3, ease: "power2.out" }, 0);
      tl.to(bar2Ref.current, { opacity: 0, duration: 0.15 }, 0);
      tl.to(bar3Ref.current, { rotation: -45, y: -4, width: 28, left: 0, duration: 0.3, ease: "power2.out" }, 0);
    } else {
      tl.to(bar1Ref.current, { rotation: 0, y: 0, width: 16, duration: 0.3, ease: "power2.in" }, 0);
      tl.to(bar2Ref.current, { opacity: 1, duration: 0.15 }, 0.1);
      tl.to(bar3Ref.current, { rotation: 0, y: 0, width: 16, left: 16, duration: 0.3, ease: "power2.in" }, 0);
    }

    return tl;
  };

  const handleClick = () => {
    const nav = navRef.current;
    if (!nav) return;

    if (!isOpen) {
      animateBars(true);
      gsap.to(nav, {
        x: "0%",
        width: getWidth(),
        clipPath: CLIP_VERTICAL,
        duration: 0.7,
        ease: "power3.out",
      });
    } else {
      animateBars(false);
      gsap.to(nav, {
        x: "-100%",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(nav, { width: getWidth(), clipPath: CLIP_SKEW });
        },
      });
    }

    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav ref={navRef} className={styles.nav}>
        <section />
      </nav>
      <button className={styles.menuButton} onClick={handleClick}>
        <div className={styles.menuBars}>
          <div ref={bar1Ref} className={styles.bar1} />
          <div ref={bar2Ref} className={styles.bar2} />
          <div ref={bar3Ref} className={styles.bar3} />
        </div>
      </button>
    </>
  );
}
