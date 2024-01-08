import styles from './page.module.css'
import Welcome from './components/Welcome'
import ScrollLine from './components/ScrollLine'
import Projects from './components/Projects'
import Skills from './components/Skills'

export default function Home() {
  return (
    // className = { styles.main }
    <main className={styles.main}>
      <Welcome />
      {/* <ScrollLine /> */}
      <Projects />
      <Skills />
    </main>
  )
}
