'use client';
import { RefObject, useRef } from 'react';
import Navbar from '../Navbar';
import SocialMediaBtns from '../SocialMediaBtns';
import styles from './welcome.module.css'
import { MotionValue, motion, useScroll, useTransform } from "framer-motion"
export default function Welcome() {


    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [200, -200])
    const xRight = useTransform(scrollYProgress, [0, 1], [-300, 300])
    const xLeft = useTransform(scrollYProgress, [0, 1], [300, -300])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], ["0%", "100%", "0%"])


    return (
        <motion.section className={styles.welcome} id="home"
            ref={ref}
            style={{ opacity }}
        >
            <Navbar />


            <div className={styles.wrapper}>
                <div className={styles.contentWrapper}>
                    <motion.div
                        style={{ x: xLeft }}
                    >
                        <Intro />
                    </motion.div>
                    <motion.div
                        style={{ x: xRight }}
                    >
                        <Pic />
                    </motion.div>
                </div>
                <div className={styles.contact_btnWrapper}>
                    <a href="mailto:ps.login.username@gmail.com" style={{ display: 'block' }} className={styles.contact_btn} target="_blank">
                        Entrar em contato

                    </a>
                </div>
                <SocialMediaBtns />
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
    return (
        <div className={styles.intro}>
            <div style={{ gridArea: 'phrases' }}>
                <h1>Olá, me chamo <strong style={{ color: '#5924E7' }}><br />Pablo Santana.</strong> </h1>
                <h1>Desenvolvedor <br /><strong style={{ color: '#5924E7' }}>Full Stack.</strong></h1>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gridArea: 'button',

            }}>

            </div>
            {/* <Contact /> */}
        </div>
    )
}

function Pic() {


    return (
        <motion.div className={styles.pic}

        >
            <img src="/ps.jpg" alt="[A picture of Pablo here]" width={'100%'} />
        </motion.div>
    )
}

function NavbarButton({ children }: { children: React.ReactNode }) {

    return (
        <div className={styles.navbar_btn}>
            {children}
        </div>
    )
}

