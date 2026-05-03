"use client";

import { Icon } from "@iconify/react/offline";
import type { IconifyIcon } from "@iconify/types";
import bookBookmarkBoldDuotone from "@iconify-icons/solar/book-bookmark-bold-duotone";
import buildings2BoldDuotone from "@iconify-icons/solar/buildings-2-bold-duotone";
import buildings3BoldDuotone from "@iconify-icons/solar/buildings-3-bold-duotone";
import diplomaBoldDuotone from "@iconify-icons/solar/diploma-bold-duotone";
import squareAcademicCapBoldDuotone from "@iconify-icons/solar/square-academic-cap-bold-duotone";
import styles from "./Education.module.css";
import { TranslationKey, useI18n } from "../../i18n";

type EducationItem = {
  degreeKey: TranslationKey;
  schoolKey: TranslationKey;
  icon: IconifyIcon;
  schoolIcon: IconifyIcon;
};

const educationItems: EducationItem[] = [
  {
    degreeKey: "education.degree1",
    schoolKey: "education.school1",
    icon: diplomaBoldDuotone,
    schoolIcon: buildings2BoldDuotone,
  },
  {
    degreeKey: "education.degree2",
    schoolKey: "education.school2",
    icon: squareAcademicCapBoldDuotone,
    schoolIcon: buildings3BoldDuotone,
  },
];

export default function Education() {
  const { t } = useI18n();

  return (
    <section className={styles.educationPage} id="education" aria-labelledby="education-title">
      <div className={styles.tag}>
        <h1 id="education-title">
          {"<"}<strong>{` ${t("education.title")} `}</strong>{">"}
        </h1>
      </div>

      <div className={styles.educationShell}>
        <div className={styles.headingIcon} aria-hidden="true">
          <Icon icon={bookBookmarkBoldDuotone} />
        </div>

        <div className={styles.timeline}>
          {educationItems.map((item) => (
            <article className={styles.educationCard} key={item.degreeKey}>
              <div className={styles.cardIcon} aria-hidden="true">
                <Icon icon={item.icon} />
              </div>

              <div className={styles.cardContent}>
                <h2>{t(item.degreeKey)}</h2>
                <p>
                  <Icon icon={item.schoolIcon} aria-hidden="true" />
                  <span>{t(item.schoolKey)}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.tag}>
        <h1>
          {"</"}<strong>{` ${t("education.title")} `}</strong>{">"}
        </h1>
      </div>
    </section>
  );
}
