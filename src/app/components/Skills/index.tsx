
'use client'
import { motion, useAnimation, useInView, useMotionValue } from 'framer-motion'
import styles from './Skills.module.css'
import { use, useEffect, useMemo, useRef, useState } from 'react'

const skills: string[] = [


    'Javascript',
    'Typescript',
    'HTML5',
    'CSS3',
    'React',
    'Next.js',
    'Node.js',
    'Firebase',
    'SQL',
    'GCP',
    'React Native',
    'Flutter',
    'Tailwind',
    'Bootstrap',
    'Python',
    'Machine Learning',
    'C',
    'Arduino',
    'Java',


]



export default function Skills() {

    const ref = useRef(null);

    return (
        <section className={styles.skillsPage} id="skills" ref={ref}>

            <div className={styles.tag}>
                <h1 ><strong>{"<Habilidades>"}</strong></h1>
            </div>

            <div className={styles.skillsWrapper}>
                <div className={styles.skillset}>
                    {skills.map((skillName, i) => {
                        return (<Skill  {...{ skillName }} key={i} idx={i} />)
                    })}
                </div>
                <div className={styles.skillset}>
                    {skills.map((skillName, i) => {
                        return (<Skill  {...{ skillName }} key={i + skills.length} idx={i} />)
                    })}
                </div>
            </div>

            <div className={styles.tag}>
                <h1 ><strong>{"</Habilidades>"}</strong></h1>
            </div>

        </section>
    )
}


function Skill({ skillName, idx }: { skillName: string, idx: number, }) {


    return (
        <div className={styles.skill}

        >
            <h2>{skillName}</h2>
            <img src={`/Skills/${skillName}.svg`} alt="skill icon" />
        </div >
    )
}
