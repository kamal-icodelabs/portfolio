"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import css from "./SkillsMarque.module.css";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const SKILLS = [
    "chatgpt", "claude", "figma", "framer", "grok", "gsap",
    "huggingface", "mongodb", "nextjs", "obsidian", "openai", "react", "typescript",
];

const LOOP = 20;

export default function SkillsMarque() {
    const rootRef = useRef(null);
    const bgImgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const root = rootRef.current;
            const bg = bgImgRef.current;
            const marquee = root.querySelector(`.${css.marquee}`);
            const track = root.querySelector(`.${css.track}`);
            const path = root.querySelector(`.${css.orbitPath}`);
            const orbitIcons = gsap.utils.toArray(`.${css.orbitItem}`);
            const trackIcons = gsap.utils.toArray(track.querySelectorAll(`.${css.img}`));
            if (!bg || !marquee || !track || !path || !orbitIcons.length) return;

            const n = orbitIcons.length;
            const enterAt = new Array(n).fill(null);
            const pathPos = new Array(n).fill(0);
            let looping = false;
            let loopTweens = [];

            gsap.set(orbitIcons, { autoAlpha: 0 });

            const stopLoop = () => {
                if (!looping) return;
                looping = false;
                loopTweens.forEach((tween) => tween.kill());
                loopTweens = [];
                gsap.set(marquee, { autoAlpha: 1 });
            };

            const startLoop = () => {
                if (looping) return;
                looping = true;
                gsap.to(marquee, { autoAlpha: 0, duration: 0.35 });

                orbitIcons.forEach((item, i) => {
                    const start = pathPos[i] || (n - i) / n;
                    gsap.set(item, { autoAlpha: 1 });
                    loopTweens.push(
                        gsap.to(item, {
                            motionPath: {
                                path,
                                align: path,
                                alignOrigin: [0.5, 0.5],
                                start,
                                end: start + 1,
                            },
                            duration: LOOP,
                            ease: "none",
                            repeat: -1,
                        })
                    );
                });
            };

            gsap.set(bg, { "--bg-left": "50%", "--bg-shift": "-50%" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: root,
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    scrub: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate(self) {
                        if (looping) return;

                        const p = self.progress;
                        const line = marquee.getBoundingClientRect().right;

                        trackIcons.forEach((icon, i) => {
                            const gone = icon.getBoundingClientRect().left >= line;

                            if (!gone) {
                                enterAt[i] = null;
                                gsap.set(icon, { autoAlpha: 1 });
                                gsap.set(orbitIcons[i], { autoAlpha: 0 });
                                return;
                            }

                            if (enterAt[i] == null) enterAt[i] = p;
                            pathPos[i] = gsap.utils.wrap(0, 1, p - enterAt[i]);

                            gsap.set(icon, { autoAlpha: 0 });
                            gsap.set(orbitIcons[i], {
                                autoAlpha: 1,
                                motionPath: {
                                    path,
                                    align: path,
                                    alignOrigin: [0.5, 0.5],
                                    start: pathPos[i],
                                    end: pathPos[i],
                                },
                            });
                        });
                    },
                    onLeave: startLoop,
                    onEnterBack: stopLoop,
                },
            });

            tl.fromTo(track, {
                x: () => -track.scrollWidth,
            }, {
                x: () => marquee.offsetWidth,
                ease: "none",
            }, 0);

            tl.fromTo(bg, {
                "--bg-left": "50%",
                "--bg-shift": "-50%",
            }, {
                "--bg-left": "0%",
                "--bg-shift": "0%",
                ease: "none",
            }, 0);
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={rootRef} className={css.skillsContainer}>
            <Image ref={bgImgRef} src='/img/skills/bg2crops.png' alt="bg image" fill className={css.marqueeBG} />

            <div className={css.marquee}>
                <div className={css.track}>
                    {SKILLS.map((skill) => (
                        <Image
                            key={skill}
                            src={`/img/skills/${skill}.svg`}
                            alt={skill}
                            width={40}
                            height={40}
                            className={css.img}
                        />
                    ))}
                </div>
            </div>

            <div className={css.orbit}>
                <svg className={css.orbitSvg} viewBox="0 0 400 400">
                    <path
                        className={css.orbitPath}
                        d="M50 200 A150 150 0 1 1 350 200 A150 150 0 1 1 50 200"
                        fill="none"
                    />
                </svg>
                {SKILLS.map((skill) => (
                    <div key={skill} className={css.orbitItem}>
                        <Image
                            src={`/img/skills/${skill}.svg`}
                            alt={skill}
                            width={40}
                            height={40}
                            className={css.img}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
