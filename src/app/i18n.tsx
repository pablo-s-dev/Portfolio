"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Language = "pt" | "en" | "es";

export type LocalizedText = Record<Language, string>;

export const languages: {
  code: Language;
  flag: string;
  label: string;
  htmlLang: string;
}[] = [
  { code: "pt", flag: "https://flagcdn.com/br.svg", label: "Português", htmlLang: "pt-BR" },
  { code: "en", flag: "https://flagcdn.com/us.svg", label: "English", htmlLang: "en" },
  { code: "es", flag: "https://flagcdn.com/es.svg", label: "Español", htmlLang: "es" },
];

const translations = {
  pt: {
    "language.select": "Selecionar idioma",
    "language.current": "Idioma atual",
    "nav.home": "Início",
    "nav.education": "Formação",
    "nav.projects": "Projetos",
    "nav.skills": "Habilidades",
    "welcome.greeting": "Olá, me chamo",
    "welcome.rolePrefix": "Desenvolvedor",
    "welcome.roleStrong": "Full Stack.",
    "projects.tagsLabel": "Tags",
    "skills.searchLabel": "Buscar habilidades",
    "skills.searchPlaceholder": "Python, cloud, hardware...",
    "skills.searchButton": "Buscar",
    "skills.searchLoading": "Buscando",
    "skills.clearButton": "Limpar",
    "skills.results": "Resultados",
    "skills.emptySearch": 'Nenhuma habilidade encontrada para "{query}".',
    "education.title": "Formação",
    "education.degree1": "Bacharel em Ciência e Tecnologia",
    "education.school1": "UFVJM — Universidade Federal dos Vales do Jequitinhonha e Mucuri",
    "education.degree2": "Bacharelando em Engenharia de Sistemas",
    "education.school2": "Unimontes — Universidade Estadual de Montes Claros",
  },
  en: {
    "language.select": "Select language",
    "language.current": "Current language",
    "nav.home": "Home",
    "nav.education": "Education",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "welcome.greeting": "Hi, my name is",
    "welcome.rolePrefix": "Full Stack",
    "welcome.roleStrong": "Developer.",
    "projects.tagsLabel": "Tags",
    "skills.searchLabel": "Search skills",
    "skills.searchPlaceholder": "Python, cloud, hardware...",
    "skills.searchButton": "Search",
    "skills.searchLoading": "Searching",
    "skills.clearButton": "Clear",
    "skills.results": "Results",
    "skills.emptySearch": 'No skills found for "{query}".',
    "education.title": "Education",
    "education.degree1": "Bachelor in Science and Technology",
    "education.school1": "UFVJM — Federal University of the Jequitinhonha and Mucuri Valleys",
    "education.degree2": "Bachelor’s Student in Systems Engineering",
    "education.school2": "Unimontes — State University of Montes Claros",
  },
  es: {
    "language.select": "Seleccionar idioma",
    "language.current": "Idioma actual",
    "nav.home": "Inicio",
    "nav.education": "Formación",
    "nav.projects": "Proyectos",
    "nav.skills": "Habilidades",
    "welcome.greeting": "Hola, me llamo",
    "welcome.rolePrefix": "Desarrollador",
    "welcome.roleStrong": "Full Stack.",
    "projects.tagsLabel": "Tags",
    "skills.searchLabel": "Buscar habilidades",
    "skills.searchPlaceholder": "Python, cloud, hardware...",
    "skills.searchButton": "Buscar",
    "skills.searchLoading": "Buscando",
    "skills.clearButton": "Limpiar",
    "skills.results": "Resultados",
    "skills.emptySearch": 'No se encontraron habilidades para "{query}".',
    "education.title": "Formación",
    "education.degree1": "Bachiller en Ciencia y Tecnología",
    "education.school1": "UFVJM — Universidad Federal de los Valles del Jequitinhonha y Mucuri",
    "education.degree2": "Estudiante de Ingeniería de Sistemas",
    "education.school2": "Unimontes — Universidad Estatal de Montes Claros",
  },
} as const;

export type TranslationKey = keyof typeof translations.pt;

const tagTranslations: Record<string, LocalizedText> = {
  "Álgebra Linear": {
    pt: "Álgebra Linear",
    en: "Linear Algebra",
    es: "Álgebra Lineal",
  },
  "Aprendizado de Idiomas": {
    pt: "Aprendizado de Idiomas",
    en: "Language Learning",
    es: "Aprendizaje de idiomas",
  },
  "Aprendizado": {
    pt: "Aprendizado",
    en: "Learning",
    es: "Aprendizaje",
  },
  "Automação": {
    pt: "Automação",
    en: "Automation",
    es: "Automatización",
  },
  "Banco de Dados": {
    pt: "Banco de Dados",
    en: "Database",
    es: "Base de datos",
  },
  "Cálculo": {
    pt: "Cálculo",
    en: "Calculus",
    es: "Cálculo",
  },
  "Ciência": {
    pt: "Ciência",
    en: "Science",
    es: "Ciencia",
  },
  "Cloud": {
    pt: "Cloud",
    en: "Cloud",
    es: "Cloud",
  },
  "Corrente Alternada": {
    pt: "Corrente Alternada",
    en: "Alternating Current",
    es: "Corriente alterna",
  },
  "Dados": {
    pt: "Dados",
    en: "Data",
    es: "Datos",
  },
  "Desenho": {
    pt: "Desenho",
    en: "Drawing",
    es: "Dibujo",
  },
  "Educação": {
    pt: "Educação",
    en: "Education",
    es: "Educación",
  },
  "Elétrica": {
    pt: "Elétrica",
    en: "Electrical",
    es: "Eléctrica",
  },
  "Eletrônica": {
    pt: "Eletrônica",
    en: "Electronics",
    es: "Electrónica",
  },
  "Empresa": {
    pt: "Empresa",
    en: "Company",
    es: "Empresa",
  },
  "Engenharia": {
    pt: "Engenharia",
    en: "Engineering",
    es: "Ingeniería",
  },
  "Extensão": {
    pt: "Extensão",
    en: "Extension",
    es: "Extensión",
  },
  "Extensão Chrome": {
    pt: "Extensão Chrome",
    en: "Chrome Extension",
    es: "Extensión Chrome",
  },
  "Fasores": {
    pt: "Fasores",
    en: "Phasors",
    es: "Fasores",
  },
  "Ferramentas": {
    pt: "Ferramentas",
    en: "Tools",
    es: "Herramientas",
  },
  "Ferramenta DEV": {
    pt: "Ferramenta DEV",
    en: "DEV Tool",
    es: "Herramienta DEV",
  },
  "Física": {
    pt: "Física",
    en: "Physics",
    es: "Física",
  },
  "Foco": {
    pt: "Foco",
    en: "Focus",
    es: "Enfoque",
  },
  "Geometria Analítica": {
    pt: "Geometria Analítica",
    en: "Analytic Geometry",
    es: "Geometría Analítica",
  },
  "IA": {
    pt: "IA",
    en: "AI",
    es: "IA",
  },
  "Infraestrutura": {
    pt: "Infraestrutura",
    en: "Infrastructure",
    es: "Infraestructura",
  },
  "Jogo": {
    pt: "Jogo",
    en: "Game",
    es: "Juego",
  },
  "Linguagens": {
    pt: "Linguagens",
    en: "Languages",
    es: "Lenguajes",
  },
  "Matemática": {
    pt: "Matemática",
    en: "Mathematics",
    es: "Matemáticas",
  },
  "Matemática Discreta": {
    pt: "Matemática Discreta",
    en: "Discrete Mathematics",
    es: "Matemática Discreta",
  },
  "Modelagem Matemática": {
    pt: "Modelagem Matemática",
    en: "Mathematical Modeling",
    es: "Modelado Matemático",
  },
  "Móvel": {
    pt: "Móvel",
    en: "Mobile",
    es: "Móvil",
  },
  "Negócio": {
    pt: "Negócio",
    en: "Business",
    es: "Negocio",
  },
  "ONG": {
    pt: "ONG",
    en: "NGO",
    es: "ONG",
  },
  "Produtividade": {
    pt: "Produtividade",
    en: "Productivity",
    es: "Productividad",
  },
  "Circuitos": {
    pt: "Circuitos",
    en: "Circuits",
    es: "Circuitos",
  },
  "Saúde": {
    pt: "Saúde",
    en: "Health",
    es: "Salud",
  },
  "Sistemas": {
    pt: "Sistemas",
    en: "Systems",
    es: "Sistemas",
  },
  "Site": {
    pt: "Site",
    en: "Website",
    es: "Sitio web",
  },
  "Venda": {
    pt: "Venda",
    en: "Sales",
    es: "Ventas",
  },
};

const skillTitleTranslations: Record<string, LocalizedText> = {
  "Analytic Geometry": {
    pt: "Geometria Analítica",
    en: "Analytic Geometry",
    es: "Geometría Analítica",
  },
  Calculus: {
    pt: "Cálculo",
    en: "Calculus",
    es: "Cálculo",
  },
  "Discrete Mathematics": {
    pt: "Matemática Discreta",
    en: "Discrete Mathematics",
    es: "Matemática Discreta",
  },
  "Linear Algebra": {
    pt: "Álgebra Linear",
    en: "Linear Algebra",
    es: "Álgebra Lineal",
  },
  Mathematics: {
    pt: "Matemática",
    en: "Mathematics",
    es: "Matemáticas",
  },
  "Mathematical Modeling": {
    pt: "Modelagem Matemática",
    en: "Mathematical Modeling",
    es: "Modelado Matemático",
  },
  Physics: {
    pt: "Física",
    en: "Physics",
    es: "Física",
  },
  "Statistics and Probability": {
    pt: "Estatística e Probabilidade",
    en: "Statistics and Probability",
    es: "Estadística y Probabilidad",
  },
};

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("portfolio-language");

    if (isLanguage(storedLanguage)) {
      setLanguageState(storedLanguage);
      updateDocumentLanguage(storedLanguage);
      return;
    }

    updateDocumentLanguage("pt");
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("portfolio-language", nextLanguage);
    updateDocumentLanguage(nextLanguage);
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => translations[language][key],
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within LanguageProvider");
  }

  return context;
}

export function getLocalizedText(text: LocalizedText | undefined, language: Language) {
  return text?.[language] || text?.pt || "";
}

export function getLocalizedSkillTitle(title: string, language: Language) {
  return getLocalizedText(skillTitleTranslations[title], language) || title;
}

export function localizeTag(tag: string, language: Language) {
  return getLocalizedText(tagTranslations[tag], language) || tag;
}

function isLanguage(value: string | null): value is Language {
  return value === "pt" || value === "en" || value === "es";
}

function updateDocumentLanguage(language: Language) {
  const languageInfo = languages.find((item) => item.code === language);
  document.documentElement.lang = languageInfo?.htmlLang ?? language;
}
