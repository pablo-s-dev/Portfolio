"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Skills.module.css";
import rawSkillData from "./skillData.json";
import {
  getLocalizedSkillTitle,
  getLocalizedText,
  Language,
  LocalizedText,
  localizeTag,
  useI18n,
} from "../../i18n";

type RawSkillInfo = {
  title: string;
  icon: string;
  text: LocalizedText;
  tags: string[];
};

type SkillInfo = {
  canonicalTitle: string;
  title: string;
  icon: string;
  text: string;
  tags: string[];
};

type SkillGroup = {
  tag: string;
  skills: SkillInfo[];
};

type SkillData = {
  skills: RawSkillInfo[];
  firstRowSkills: string[];
  secondRowSkills: string[];
};

const SEARCH_DELAY_MS = 500;

const skillData = rawSkillData as SkillData;
const allSkills = skillData.skills;
const skillsByTitle = new Map(allSkills.map((skill) => [skill.title, skill]));

export default function Skills() {
  const { language, t } = useI18n();
  const { firstRowSkills, secondRowSkills } = skillData;
  const localizedSkills = useMemo(
    () => allSkills.map((skill) => localizeSkill(skill, language)),
    [language],
  );
  const groupedSkills = useMemo(
    () => buildSkillGroups(localizedSkills),
    [localizedSkills],
  );
  const [searchText, setSearchText] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SkillInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!activeSearch || isSearching) return;

    setSearchResults(searchSkills(activeSearch, language));
  }, [activeSearch, isSearching, language]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchText.trim();

    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    if (!query) {
      setActiveSearch("");
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setActiveSearch(query);
    setSearchResults([]);
    setIsSearching(true);

    searchTimerRef.current = setTimeout(() => {
      setSearchResults(searchSkills(query, language));
      setIsSearching(false);
    }, SEARCH_DELAY_MS);
  }

  function clearSearch() {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    setSearchText("");
    setActiveSearch("");
    setSearchResults([]);
    setIsSearching(false);
  }

  return (
    <section className={styles.skillsPage} id="skills">
      <div className={styles.tag}>
        <h1>
          {"<"}<strong>{` ${t("nav.skills")} `}</strong>{">"}
        </h1>
      </div>

      <div className={styles.skillsContainer}>
        <MovingSkills skillNames={firstRowSkills} language={language} />
        <MovingSkills skillNames={secondRowSkills} language={language} />
      </div>

      <div className={styles.staticSkills}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <label className={styles.searchLabel} htmlFor="skills-search">
            {t("skills.searchLabel")}
          </label>
          <div className={styles.searchControls}>
            <input
              id="skills-search"
              className={styles.searchInput}
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder={t("skills.searchPlaceholder")}
            />
            <button className={styles.searchButton} type="submit" disabled={isSearching}>
              {isSearching ? t("skills.searchLoading") : t("skills.searchButton")}
            </button>
            {activeSearch ? (
              <button
                className={styles.clearButton}
                type="button"
                onClick={clearSearch}
                disabled={isSearching}
              >
                {t("skills.clearButton")}
              </button>
            ) : null}
          </div>
        </form>

        <div className={styles.staticSkillsContent} aria-live="polite">
          {isSearching ? (
            <SearchSkeleton />
          ) : activeSearch ? (
            <SearchResults query={activeSearch} skills={searchResults} />
          ) : (
            <GroupedSkills groups={groupedSkills} />
          )}
        </div>
      </div>

      <div className={styles.tag}>
        <h1>
          {"</"}<strong>{` ${t("nav.skills")} `}</strong>{">"}
        </h1>
      </div>
    </section>
  );
}

function MovingSkills({
  skillNames,
  language,
}: {
  skillNames: string[];
  language: Language;
}) {
  return (
    <div className={styles.skillsWrapper}>
      <div className={styles.skillset}>
        {skillNames.map((skillName, i) => (
          <Skill skill={getSkill(skillName, language)} key={`${skillName}-${i}`} />
        ))}
      </div>
      <div className={styles.skillset} aria-hidden="true">
        {skillNames.map((skillName, i) => (
          <Skill skill={getSkill(skillName, language)} key={`${skillName}-${i}-copy`} />
        ))}
      </div>
    </div>
  );
}

function GroupedSkills({ groups }: { groups: SkillGroup[] }) {
  return (
    <>
      {groups.map((group) => (
        <section className={styles.skillGroup} key={group.tag}>
          <div className={styles.groupHeader}>
            <h2>{group.tag}</h2>
            <span>{group.skills.length}</span>
          </div>
          <div className={styles.staticSkillGrid}>
            {group.skills.map((skill) => (
              <StaticSkill skill={skill} key={`${group.tag}-${skill.title}`} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function SearchResults({ query, skills }: { query: string; skills: SkillInfo[] }) {
  const { t } = useI18n();
  const emptySearchText = t("skills.emptySearch").replace("{query}", query);

  return (
    <section className={styles.skillGroup}>
      <div className={styles.groupHeader}>
        <h2>{t("skills.results")}</h2>
        <span>{skills.length}</span>
      </div>

      {skills.length > 0 ? (
        <div className={styles.staticSkillGrid}>
          {skills.map((skill) => (
            <StaticSkill skill={skill} key={`result-${skill.title}`} />
          ))}
        </div>
      ) : (
        <p className={styles.emptySearch}>{emptySearchText}</p>
      )}
    </section>
  );
}

function SearchSkeleton() {
  return (
    <div className={styles.staticSkillGrid}>
      {Array.from({ length: 6 }, (_, i) => (
        <div className={styles.skeletonSkill} key={i}>
          <div className={styles.skeletonTop}>
            <span className={styles.skeletonIcon} />
            <span className={styles.skeletonTitle} />
          </div>
          <span className={styles.skeletonLine} />
          <span className={styles.skeletonLine} />
          <div className={styles.skeletonTags}>
            <span />
            <span />
            <span />
          </div>
        </div>
      ))}
    </div>
  );
}

function StaticSkill({ skill }: { skill: SkillInfo }) {
  return (
    <article className={styles.staticSkill}>
      <div className={styles.staticSkillHeader}>
        <div className={styles.staticIcon}>
          <Image src={`/Skills/${skill.icon}`} alt="" fill sizes="42px" />
        </div>
        <h3>{skill.title}</h3>
      </div>
      <p>{skill.text}</p>
      <div className={styles.skillTags}>
        {skill.tags.map((tag) => (
          <span key={`${skill.title}-${tag}`}>{tag}</span>
        ))}
      </div>
    </article>
  );
}

function BreakWords({ text }: { text: string }) {
  return (
    <div>
      {text.split(" ").map((word, i) => (
        <h3 key={i} style={{ display: "block" }}>
          {word}
        </h3>
      ))}
    </div>
  );
}

function Skill({ skill }: { skill: SkillInfo }) {
  return (
    <div className={styles.skill}>
      <BreakWords text={skill.title} />
      <div className={styles.icon}>
        <Image
          src={`/Skills/${skill.icon}`}
          alt={skill.title}
          fill
          loading="eager"
          sizes="50px"
        />
      </div>
    </div>
  );
}

function getSkill(skillName: string, language: Language) {
  const skill = skillsByTitle.get(skillName);

  if (!skill) {
    return {
      canonicalTitle: skillName,
      title: skillName,
      icon: `${skillName}.svg`,
      text: skillName,
      tags: [],
    };
  }

  return localizeSkill(skill, language);
}

function searchSkills(query: string, language: Language) {
  const tokens = normalizeText(query).split(" ").filter(Boolean);

  return allSkills.map((skill) => localizeSkill(skill, language)).filter((skill) => {
    const searchableText = normalizeText(
      `${skill.canonicalTitle} ${skill.title} ${skill.text} ${skill.tags.join(" ")}`
    );

    return tokens.every((token) => searchableText.includes(token));
  });
}

function localizeSkill(skill: RawSkillInfo, language: Language): SkillInfo {
  return {
    canonicalTitle: skill.title,
    title: getLocalizedSkillTitle(skill.title, language) || skill.title,
    icon: skill.icon,
    text: getLocalizedText(skill.text, language),
    tags: skill.tags.map((tag) => localizeTag(tag, language)),
  };
}

function buildSkillGroups(skills: SkillInfo[]) {
  const groupsByTag = new Map<string, SkillInfo[]>();

  for (const skill of skills) {
    for (const tag of skill.tags) {
      const skillsForTag = groupsByTag.get(tag) ?? [];
      skillsForTag.push(skill);
      groupsByTag.set(tag, skillsForTag);
    }
  }

  return Array.from(groupsByTag.entries())
    .sort(([firstTag], [secondTag]) => firstTag.localeCompare(secondTag))
    .map(([tag, skillsForTag]) => ({
      tag,
      skills: [...skillsForTag].sort((firstSkill, secondSkill) =>
        firstSkill.title.localeCompare(secondSkill.title)
      ),
    }));
}

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
