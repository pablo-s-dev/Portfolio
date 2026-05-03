"use client";

import { useEffect, useRef, useState } from "react";
import { languages, useI18n } from "../../i18n";
import styles from "./LanguageSelector.module.css";

export default function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const currentLanguage = languages.find((item) => item.code === language);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <div className={styles.languageSelector} ref={selectorRef}>
      {isOpen ? (
        <div className={styles.languageMenu} role="menu">
          {languages.map((item) => (
            <button
              className={`${styles.languageOption} ${
                item.code === language ? styles.active : ""
              }`}
              key={item.code}
              type="button"
              onClick={() => {
                setLanguage(item.code);
                setIsOpen(false);
              }}
              role="menuitem"
              title={item.label}
            >
              <img src={item.flag} alt="" aria-hidden="true" width={20} height={14} style={{ borderRadius: "2px", objectFit: "cover" }} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      ) : null}

      <button
        className={styles.languageButton}
        type="button"
        onClick={() => setIsOpen((wasOpen) => !wasOpen)}
        aria-label={`${t("language.select")}. ${t("language.current")}: ${
          currentLanguage?.label ?? language
        }`}
        title={t("language.select")}
      >
        {currentLanguage && (
          <img 
            src={currentLanguage.flag} 
            alt="" 
            aria-hidden="true" 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              borderRadius: "50%" 
            }} 
          />
        )}
      </button>
    </div>
  );
}
