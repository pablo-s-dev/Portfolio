'use client';
import { RefObject, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Navbar from '../Navbar';
import SocialMediaBtns from '../SocialMediaBtns';
import styles from './welcome.module.css'
import { MotionValue, motion, useScroll, useSpring, useTransform } from "framer-motion"
import React from 'react';
import { easeIn } from "framer-motion"

export default function Welcome() {

    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5, 0.7, 1], ["0%", "100%", "100%", "0%"])


    return (
        <motion.section className={styles.welcome} id="home"
            ref={ref}
            style={{ opacity }}
        >
            <Navbar />

            <div className={styles.contentWrapper}>
                <motion.div
                    className={styles.intro}

                >
                    <Intro />
                </motion.div>
                <motion.div
                    className={styles.pic}

                >
                    <Pic />
                </motion.div>
            </div>
            <div className={styles.contact_btnWrapper}>
                <a href="mailto:ps.login.username@gmail.com" style={{ display: 'block' }} className={styles.contact_btn} target="_blank">
                    Entrar em contato

                </a>
            </div>




        </motion.section >
    )
}

function Name() {
    return (
        <div className={styles.name}>
            <h1>/Pablo Santana</h1>
        </div >

    )
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
        text: string,
        start?: number | undefined,
        timePerChar?: number | undefined;
    }

    type TextState = {
        amount: number,
        showCursor: boolean,
        beginTyping: boolean,
        startBlinking: boolean,
    };

    function TypingEffectBlock({ children, timePerChar }: { children: React.ReactElement | React.ReactElement[], timePerChar: number }) {

        const lastIndex = useRef(0);
        let textElementIdx = 0;
        let lastDur = 0
        let lastStart = 0
        const delay = 50



        const wrap = wrapStrings(
            <>
                {children}
            </>, false)

        textElementIdx = 0
        lastDur = 0
        lastStart = 0
        lastIndex.current = 0;

        const invisibleWrap = wrapStrings(
            <>
                {children}
            </>, true)



        lastIndex.current = textElementIdx - 1;


        return (
            <div style={{ display: 'grid', gridTemplateAreas: 'a' }}>
                <div style={{ gridArea: 'a', width: '100%', textAlign: 'left', height: '100%' }}>{wrap}</div>

                <div style={{ visibility: 'hidden', gridArea: 'a', width: '100%' }}>{invisibleWrap}</div>
            </div>
        )


        function wrapStrings(element: React.ReactElement, skip: boolean): React.ReactNode[] {



            const wrap = React.Children.map(element.props.children, (child: React.ReactElement) => {



                if (typeof child === "string") {

                    const curDur = (child as string).length * timePerChar + delay;

                    const start = lastStart + lastDur


                    const wrap = (<TextToBeTyped text={child} start={skip ? 0 : start} timePerChar={skip ? 0 : timePerChar} index={textElementIdx} lastIdx={lastIndex} />)

                    lastStart = start;


                    lastDur = curDur

                    textElementIdx += 1;

                    return wrap;
                }

                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {}, wrapStrings(child, skip));
                }

                return child;
            })

            return wrap;
        }

        function TextToBeTyped({ text, timePerChar, start, index, lastIdx }: { text: string, timePerChar?: number, start?: number, index?: number, lastIdx?: React.MutableRefObject<number> }) {

            const ran = useRef(false);


            const keepCursor = useMemo(() => {


                return index === lastIdx!.current
            }, [index, lastIdx])


            const [textState, setTextState] = useState<TextState>({ amount: 0, showCursor: false, beginTyping: false, startBlinking: false });

            const j = useRef(0);

            useEffect(() => {

                if (ran.current) return;

                ran.current = true;


                const fullText = text;




                setTimeout(async () => {



                    // show cursor
                    setTextState(prevTextState => {


                        const newTextState = { ...prevTextState, showCursor: true };



                        return newTextState;

                    });


                    // then start typing
                    const typingInterval = setInterval(async () => {



                        if (j.current > fullText.length) {


                            setTextState(prevTextState => {

                                const newTextState = { ...prevTextState, showCursor: keepCursor ?? false, startBlinking: keepCursor ?? false };


                                return newTextState;
                            });




                            clearInterval(typingInterval);


                        }

                        setTextState(prevTextState => {


                            const newTextState = { ...prevTextState, amount: j.current };


                            return newTextState;
                        });

                        j.current++;

                    }, timePerChar);
                }, start)

            }, [])


            const cursor = "|";

            return (
                <>
                    <span>{text.slice(0, textState.amount)}</span><span className={textState.startBlinking ? styles.blinking : ''} style={{ visibility: textState.showCursor && timePerChar != 0 ? 'visible' : 'hidden' }}>{cursor}</span>
                </>

            )

        }
    }


    return (
        <div className={styles.intro}>
            <div>
                <h1>Olá, me chamo</h1>
                <h1><strong>Pablo Santana.</strong></h1>
                <h1>Desenvolvedor</h1>
                <h1><strong>Full Stack.</strong></h1>
                {/* <TypingEffectBlock timePerChar={80}>
                    <h1>Desenvolvedor</h1>
                    <h1><strong>Full Stack.</strong></h1>
                </TypingEffectBlock> */}
            </div>
        </div>
    )
}

function Pic() {


    return (
        <div className={styles.imgWrapper}>
            <div className={styles.img}>
            </div>
        </div>

    )
}

function NavbarButton({ children }: { children: React.ReactNode }) {

    return (
        <div className={styles.navbar_btn}>
            {children}
        </div>
    )
}

async function waitFor(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, ms)
    })
}