'use client'

import styles from './page.module.css'
import Welcome from './components/Welcome'
import ScrollLine from './components/ScrollLine'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'




export default function Home() {

  const ref = useRef(null);



  return (
    // className = { styles.main }
    <main className={styles.main} ref={ref}>
      <Welcome />
      {/* <ScrollLine /> */}
      <Projects />
      <Skills />
      <Navbar />
    </main>
  )
}
