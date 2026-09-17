import Image from "next/image";
import css from "./LiveProjects.module.css";
import classNames from "classnames";

export default function LiveProjects() {
    return (
        <div className={css.liveProjectsContainer}>
            <div className={css.liveProjectsContent}>
                <div className={css.textContainer}>
                    <h2 className={css.liveProjectsTitle}>Turning ideas into fluid, intelligent interfaces</h2>
                    <span className={css.supportText}>React, Next.js, motion design & AI, all in one stack.</span>
                </div>

                <div className={css.skillsContainer}>
                    <Image src="/img/landingpage/image1.png" alt="live project 1" width={280} height={180} className={classNames(css.img, css.img1)} />
                    <Image src="/img/landingpage/image2.png" alt="live project 2" width={280} height={180} className={classNames(css.img, css.img2)} />
                    <Image src="/img/landingpage/image3.png" alt="live project 3" width={280} height={180} className={classNames(css.img, css.img3)} />
                    <Image src="/img/landingpage/image4.png" alt="live project 4" width={280} height={180} className={classNames(css.img, css.img4)} />
                    <Image src="/img/landingpage/image5.png" alt="live project 5" width={280} height={180} className={classNames(css.img, css.img5)} />
                    <Image src="/img/landingpage/image6.png" alt="live project 6" width={280} height={180} className={classNames(css.img, css.img6)} />
                </div>
            </div>
        </div>
    );
}
