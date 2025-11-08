"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../Navbar";
import styles from "./welcome.module.css";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React from "react";

export default function Welcome() {
  useEffect(() => {
    function checkZoom() {
      const isMobile =
        /Mobi|Android/i.test(navigator.userAgent) ||
        navigator.maxTouchPoints > 1;
      const zoomThreshold = 1.0;
      if (window.devicePixelRatio > zoomThreshold || isMobile) {
        document.documentElement.classList.add("no-scroll-snap");
      } else {
        document.documentElement.classList.remove("no-scroll-snap");
      }
    }

    checkZoom();
    window.addEventListener("resize", checkZoom);
    return () => {
      window.removeEventListener("resize", checkZoom);
    };
  }, []);

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"],
  );

  const yOffset = useSpring( useTransform(
    scrollYProgress,
    [0, 1],
    [0, -400],
  ), );

  return (
    <motion.section
      className={styles.welcome}
      id="home" 
      ref={ref}
      style={{ opacity, y: yOffset }}
    >
      

      <div className={styles.contentWrapper}>
        <motion.div className={styles.intro}>
          <Intro />
        </motion.div>
        <motion.div className={styles.pic}>
          {/* <div className={styles.svgBlob}>
                        <svg width="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#ffffff88" d="M33.7,-54C47.9,-50.2,66.5,-49.6,77.6,-41.2C88.7,-32.7,92.4,-16.4,89.1,-1.9C85.9,12.6,75.8,25.3,68.1,39.7C60.4,54.1,55.2,70.3,44.2,74.5C33.3,78.7,16.6,70.8,1.9,67.5C-12.7,64.1,-25.5,65.2,-33.7,59.4C-41.9,53.6,-45.5,41,-54.1,29.9C-62.7,18.9,-76.3,9.5,-79.1,-1.6C-81.8,-12.6,-73.8,-25.3,-66.4,-38.6C-59.1,-51.8,-52.5,-65.7,-41.6,-71.4C-30.6,-77,-15.3,-74.5,-2.8,-69.7C9.8,-64.9,19.5,-57.8,33.7,-54Z" transform="translate(100 100)" />
                        </svg>
                    </div> */}
          <Pic />
        </motion.div>
      </div>
      {/* <div className={styles.contact_btnWrapper}>
        
        <a
          href="mailto:ps.login.username@gmail.com"
          className={styles.contact_btn}
          target="_blank"
        >
          <img src="/email.svg" alt="Email" />
          E-mail
        </a>
      </div> */}
    </motion.section>
  );
}

function Name() {
  return (
    <div className={styles.name}>
      <h1>/Pablo Santana</h1>
    </div>
  );
}

// function Contact() {
//     return (
//         <div>
//             <h2>Vamos entrar em contato? </h2>
//             <SocialMediaIcons />
//         </div>
//     )
// }

function Intro() {
  type TypingTextProps = {
    text: string;
    start?: number | undefined;
    timePerChar?: number | undefined;
  };

  type TextState = {
    amount: number;
    showCursor: boolean;
    beginTyping: boolean;
    startBlinking: boolean;
  };

  function TypingEffectBlock({
    children,
    timePerChar,
  }: {
    children: React.ReactElement | React.ReactElement[];
    timePerChar: number;
  }) {
    const lastIndex = useRef(0);
    let textElementIdx = 0;
    let lastDur = 0;
    let lastStart = 0;
    const delay = 50;

    const wrap = wrapStrings(<>{children}</>, false);

    textElementIdx = 0;
    lastDur = 0;
    lastStart = 0;
    lastIndex.current = 0;

    const invisibleWrap = wrapStrings(<>{children}</>, true);

    lastIndex.current = textElementIdx - 1;

    return (
      <div style={{ display: "grid", gridTemplateAreas: "a" }}>
        <div
          style={{
            gridArea: "a",
            width: "100%",
            textAlign: "left",
            height: "100%",
          }}
        >
          {wrap}
        </div>

        <div style={{ visibility: "hidden", gridArea: "a", width: "100%" }}>
          {invisibleWrap}
        </div>
      </div>
    );

    function wrapStrings(
      element: React.ReactElement,
      skip: boolean,
    ): React.ReactNode[] {
      const wrap = React.Children.map(
        element.props.children,
        (child: React.ReactElement) => {
          if (typeof child === "string") {
            const curDur = (child as string).length * timePerChar + delay;

            const start = lastStart + lastDur;

            const wrap = (
              <TextToBeTyped
                text={child}
                start={skip ? 0 : start}
                timePerChar={skip ? 0 : timePerChar}
                index={textElementIdx}
                lastIdx={lastIndex}
              />
            );

            lastStart = start;

            lastDur = curDur;

            textElementIdx += 1;

            return wrap;
          }

          if (React.isValidElement(child)) {
            return React.cloneElement(child, {}, wrapStrings(child, skip));
          }

          return child;
        },
      );

      return wrap;
    }

    function TextToBeTyped({
      text,
      timePerChar,
      start,
      index,
      lastIdx,
    }: {
      text: string;
      timePerChar?: number;
      start?: number;
      index?: number;
      lastIdx?: React.MutableRefObject<number>;
    }) {
      const ran = useRef(false);

      const keepCursor = useMemo(() => {
        return index === lastIdx!.current;
      }, [index, lastIdx]);

      const [textState, setTextState] = useState<TextState>({
        amount: 0,
        showCursor: false,
        beginTyping: false,
        startBlinking: false,
      });

      const j = useRef(0);

      useEffect(() => {
        if (ran.current) return;

        ran.current = true;

        const fullText = text;

        setTimeout(async () => {
          // show cursor
          setTextState((prevTextState) => {
            const newTextState = { ...prevTextState, showCursor: true };

            return newTextState;
          });

          // then start typing
          const typingInterval = setInterval(async () => {
            if (j.current > fullText.length) {
              setTextState((prevTextState) => {
                const newTextState = {
                  ...prevTextState,
                  showCursor: keepCursor ?? false,
                  startBlinking: keepCursor ?? false,
                };

                return newTextState;
              });

              clearInterval(typingInterval);
            }

            setTextState((prevTextState) => {
              const newTextState = { ...prevTextState, amount: j.current };

              return newTextState;
            });

            j.current++;
          }, timePerChar);
        }, start);
      }, []);

      const cursor = "|";

      return (
        <>
          <span>{text.slice(0, textState.amount)}</span>
          <span
            className={textState.startBlinking ? styles.blinking : ""}
            style={{
              visibility:
                textState.showCursor && timePerChar != 0 ? "visible" : "hidden",
            }}
          >
            {cursor}
          </span>
        </>
      );
    }
  }

  return (
    <div className={styles.intro}>
      <div>
        <h1>Olá, me chamo</h1>
        <h1>
          <strong>Pablo Santana.</strong>
        </h1>
        <h1>Desenvolvedor</h1>
        <h1>
          <strong>Full Stack.</strong>
        </h1>
        {/* <TypingEffectBlock timePerChar={80}>
                    <h1>Desenvolvedor</h1>
                    <h1><strong>Full Stack.</strong></h1>
                </TypingEffectBlock> */}
      </div>
    </div>
  );
}

function Pic() {
  return (
    <div className={styles.imgWrapper}>
      <img src="/p-cut.jpg" alt="Profile" className={styles.img} />
      {/* <div className={styles.imgBlur}></div> */}
    </div>
  );
}

function NavbarButton({ children }: { children: React.ReactNode }) {
  return <div className={styles.navbar_btn}>{children}</div>;
}

async function waitFor(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}
