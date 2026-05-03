"use client";

import GithubBtn from './githubBtn';
import LinkedinBtn from './linkedinBtn';
import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n';
import styles from './navbar.module.css'

const sectionIds = ["home", "education", "projects", "skills"] as const;

type SectionId = (typeof sectionIds)[number];

export default function Navbar() {
    const { t } = useI18n();
    const [activeSection, setActiveSection] = useState<SectionId>("home");

    const navItems: { id: SectionId; label: string }[] = [
        { id: "home", label: t("nav.home") },
        { id: "education", label: t("nav.education") },
        { id: "projects", label: t("nav.projects") },
        { id: "skills", label: t("nav.skills") },
    ];

    useEffect(() => {
        let animationFrame = 0;

        function updateActiveSection() {
            animationFrame = 0;

            const nextSection = getSectionAtViewportAnchor();

            setActiveSection((currentSection) => {
                if (currentSection === nextSection) {
                    return currentSection;
                }

                return nextSection;
            });

            const nextHash = `#${nextSection}`;

            if (window.location.hash !== nextHash) {
                window.history.replaceState(
                    null,
                    "",
                    `${window.location.pathname}${window.location.search}${nextHash}`,
                );
            }
        }

        function queueUpdate() {
            if (animationFrame) return;
            animationFrame = window.requestAnimationFrame(updateActiveSection);
        }

        queueUpdate();
        window.addEventListener("scroll", queueUpdate, { passive: true });
        window.addEventListener("resize", queueUpdate);

        return () => {
            if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
            }

            window.removeEventListener("scroll", queueUpdate);
            window.removeEventListener("resize", queueUpdate);
        };
    }, []);


    return (
        <nav className={styles.navbar}>

            <div className={styles.left + " " + styles.social}>
                <LinkedinBtn />

             </div>
            

            {/* <Name /> */}
            <div className={styles.routingBtnsContainer}>
                {navItems.map((item) => (
                    <a
                        href={`#${item.id}`}
                        aria-current={activeSection === item.id ? "page" : undefined}
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                    >
                        <NavbarButton active={activeSection === item.id}>
                            {item.label}
                        </NavbarButton>
                    </a>
                ))}

                
            </div>
            <div className={styles.right + " " + styles.social}>
                <GithubBtn />
            </div>
            {/* <SocialMediaIcons /> */}

        </nav>
    )
}

function getSectionAtViewportAnchor(): SectionId {
    const viewportAnchor = window.innerHeight * 0.38;
    let fallbackSection: SectionId = "home";

    for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);

        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= viewportAnchor && rect.bottom > viewportAnchor) {
            return sectionId;
        }

        if (rect.top <= viewportAnchor) {
            fallbackSection = sectionId;
        }
    }

    return fallbackSection;
}

function Name() {
    return (
        <div className={styles.name}>
            <h1>/PabloS</h1>
        </div >

    )
}

function NavbarButton({
    active,
    children,
}: {
    active?: boolean;
    children: React.ReactNode;
}) {

    return (
        <div className={`${styles.navbar_btn} ${active ? styles.active : ""}`}>
            <span>{children}</span>
        </div>
    )
}

function SocialMediaIcons() {

    const svgIcons = Object.values({
        linkedin: (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="50%" viewBox="0 0 128 128">
                    <path fill="#0076b2" d="M116 3H12a8.91 8.91 0 0 0-9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81V11.77A8.93 8.93 0 0 0 116 3" />
                    <path fill="#fff" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 1 1-10.5 10.49a10.5 10.5 0 0 1 10.5-10.49m20.41 29h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z" />
                </svg>
            </div>
        ),
        Github: (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="50%" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" /></svg>
            </div>
        ),
    });

    return (
        <div className={styles.social}>
            {...svgIcons}
        </div>
    );
}
