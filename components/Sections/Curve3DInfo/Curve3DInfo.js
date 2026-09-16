"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import css from "./Curve3DInfo.module.css";
import Image from "next/image";
import classNames from "classnames";

gsap.registerPlugin(ScrollTrigger);

export default function Curve3DInfo() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(container.querySelectorAll(`.${css.row}`));
      const maxAngle = 48;

      gsap.set(rows, {
        transformPerspective: 1400,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      const applyCurve = () => {
        const radius = Math.min(window.innerHeight * 0.92, 920);
        const maxRad = (maxAngle * Math.PI) / 180;
        const viewCenter = window.innerHeight / 2;

        rows.forEach((row) => {
          const rect = row.getBoundingClientRect();
          const yFromCenter = rect.top + rect.height / 2 - viewCenter;
          const rad = gsap.utils.clamp(
            -maxRad,
            maxRad,
            Math.asin(gsap.utils.clamp(-0.999, 0.999, yFromCenter / radius))
          );
          const depth = (Math.cos(rad) + 1) / 2;

          gsap.set(row, {
            z: radius * (Math.cos(rad) - 1),
            rotationX: -(rad * 180) / Math.PI,
            scale: 0.82 + depth * 0.18,
            opacity: gsap.utils.clamp(
              0,
              1,
              gsap.utils.mapRange(0.32, 0.96, 0, 1, depth)
            ),
          });
        });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: applyCurve,
        onRefresh: applyCurve,
      });

      applyCurve();

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={classNames(css.infoSection)}>

      <div ref={containerRef} className={css.contentContainer}>
        <div className={classNames(css.row1, css.row)}>
          <span className={classNames(css.text1, css.text)}>Music</span>
          <span className={classNames(css.text1, css.text)}>Power</span>
          <Image src='/img/image.png' alt='curve3dinfo' width={100} height={100} className={css.imgStyle} />
        </div>

        <div className={classNames(css.row2, css.row)}>
          <span className={classNames(css.text2, css.text)}>The</span>
          <span className={classNames(css.text2, css.text)}>Experience</span>
        </div>

        <div className={classNames(css.row3, css.row)}>
          <span className={classNames(css.text2, css.text)}>Random </span>
          <span className={classNames(css.text2, css.text)}>LOVE</span>
        </div>


        <div className={classNames(css.row4, css.row)}>
          <Image src='/img/image1.png' alt='curve3dinfo' width={100} height={100} className={css.imgStyle} />
          <span className={classNames(css.text3, css.text)}>Surprise</span>
        </div>


        <div className={classNames(css.row5, css.row)}>
          <span className={classNames(css.text3, css.text)}>Play</span>
          <span className={classNames(css.text5, css.text)}>Surprise</span>
        </div>


        <div className={classNames(css.row6, css.row)}>
          <span className={classNames(css.text5, css.text)}>Play</span>
          <span className={classNames(css.text2, css.text)}>The</span>
        </div>

        <div className={classNames(css.row7, css.row)}>
          <span className={classNames(css.text2, css.text)}>Experience</span>
          <Image src='/img/image.png' alt='curve3dinfo' width={100} height={100} className={css.imgStyle} />
        </div>

        <div className={classNames(css.row8, css.row)}>
          <span className={classNames(css.text2, css.text)}>Random </span>
          <span className={classNames(css.text2, css.text)}>LOVE</span>
        </div>

        <div className={classNames(css.row9, css.row)}>
          <Image src='/img/image1.png' alt='curve3dinfo' width={100} height={100} className={css.imgStyle} />
          <span className={classNames(css.text3, css.text)}>Surprise</span>
        </div>


        <div className={classNames(css.row10, css.row)}>
          <span className={classNames(css.text5, css.text)}>Surprise</span>
          <span className={classNames(css.text3, css.text)}>Play</span>
        </div>


        <div className={classNames(css.row11, css.row)}>
          <span className={classNames(css.text20, css.text)}>Play</span>
        </div>
      </div>
    </div>
  );
}