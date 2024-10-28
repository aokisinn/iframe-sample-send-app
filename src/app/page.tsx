'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Theme = 'light' | 'dark'

export default function Home() {
  const [theme, setTheme] = useState<Theme | null>(null)

  const setThemeLocal = (theme: Theme) => {
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') as Theme
    setTheme(localTheme || 'light')

    const getTheme = () => {
      const theme = localStorage.getItem('theme') as Theme
      return theme || 'light'
    }

    const updateTheme = (theme: Theme) => {
      localStorage.setItem('theme', theme)
    }

    window.addEventListener('message', (event) => {
      const { type, data } = event.data
      // 本番環境では、originをチェックする
      // 例:
      // if (event.origin !== 'https://trusted-domain.com') return

      if (type === 'getTheme') {
        const theme = getTheme()
        window.postMessage({ type: 'theme', data: theme })
      }

      if (type === 'updateTheme') {
        updateTheme(data)
      }
    })
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Theme Send Site Now {theme}
        </h1>
        
        <div>
          <button onClick={() => setThemeLocal('light')}>Light</button>
          <button onClick={() => setThemeLocal('dark')}>Dark</button>
        </div>
      </main>
    </div>
  );
}
