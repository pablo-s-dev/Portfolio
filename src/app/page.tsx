'use client'

import styles from './page.module.css'
import Welcome from './components/Welcome'
import ScrollLine from './components/ScrollLine'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Head from "next/head";



export default function Home() {

  const ref = useRef(null);



  return (
    // className = { styles.main }
    <>
      <Head>
        <link rel="preload" href="/Fonts/Inter.ttf" as="font"></link>
        <link rel="preload" href="/ps.jpg" as="image" ></link>
      </Head>
      <main className={styles.main} ref={ref}>

        <Welcome />
        {/* <ScrollLine /> */}
        <Projects />
        <Skills />
        <Navbar />
      </main>
    </>
  )
}
