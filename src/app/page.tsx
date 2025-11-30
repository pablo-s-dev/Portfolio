"use client";

import styles from "./page.module.css";
import Welcome from "./components/Welcome";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { useEffect, useRef } from "react";
import Head from "next/head";
import FontFaceObserver from "fontfaceobserver";
import Navbar from "./components/Navbar";

function adjustViewportHeight(): void {
  const vv = window.visualViewport;
  const height = vv?.height ?? window.innerHeight;
  const width  = vv?.width  ?? window.innerWidth;

  const vmin = Math.round(Math.min(width, height) * 0.01);
  const vmax = Math.round(Math.max(width, height) * 0.01);
  const vh   = Math.round(height * 0.01);

  document.documentElement.style.setProperty('--s', `${vh}px`);
  document.documentElement.style.setProperty('--vmin', `${vmin}px`);
  document.documentElement.style.setProperty('--vmax', `${vmax}px`);
}

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const font = new FontFaceObserver("Inter");

    font.load().finally(() => {
      document.documentElement.classList.add("font-loaded");
    });

    if (typeof window !== "undefined") {
      
      // adjustViewportHeight();
      // window.addEventListener("resize", adjustViewportHeight);

    }



  }, []);


  return (
    // className = { styles.main }
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"> </meta>
        <link rel="preload" href="/Fonts/Inter.ttf" as="font"></link>
        <link rel="preload" href="/ps000.png" as="image"></link>
      </Head>
      <main className={styles.main} ref={ref}>
        <Navbar />
        <Welcome />
        {/* <ScrollLine /> */}
        <Projects />
        <Skills />
        {/* <Navbar /> */}
      </main>
    </>
  );
}
