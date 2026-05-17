"use client";
import styles from "./Projects.module.css";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  getLocalizedText,
  Language,
  LocalizedText,
  localizeTag,
  useI18n,
} from "../../i18n";
import { Icon } from "@iconify/react";
import { useScrollContainer } from "../../ScrollContext";

const projects: ProjectData[] = [
  {
    title: "Hearken",
    description: {
      pt: "Hearken é uma plataforma de aprendizado de idiomas usando vídeos do YouTube. Você pode escolher um vídeo com legenda no seu idioma alvo para ser desafiado a entender cada frase. Em seguida, você fala ou digita o que foi dito.",
      en: "Hearken is a language learning platform built around YouTube videos. You can choose a video with captions in your target language, then challenge yourself to understand each sentence by speaking or typing what was said.",
      es: "Hearken es una plataforma de aprendizaje de idiomas basada en videos de YouTube. Puedes elegir un video con subtítulos en tu idioma objetivo y desafiarte a entender cada frase hablando o escribiendo lo que se dijo.",
    },
    imgPath: "/ProjectImgs/hearken-s1.png",
    openUrl: "https://hearken.netlify.app/",
    openType: "web",
    tags: [
      "JavaScript",
      "Vanilla",
      "CSS",
      "HTML",
      "Aprendizado de Idiomas",
      "Site",
      "Web",
      "Educação",
      "Aprendizado",
    ],
  },

  {
    title: "NurseLink",
    description: {
      pt: "NurseLink é um aplicativo que auxilia enfermeiros no tratamento de pacientes com lesões por pressão. Ele utiliza inteligência artificial para classificar o estágio das lesões por imagens.",
      en: "NurseLink is an app that helps nurses treat patients with pressure injuries. It uses artificial intelligence to classify injury stages from images.",
      es: "NurseLink es una aplicación que ayuda a enfermeros a tratar pacientes con lesiones por presión. Usa inteligencia artificial para clasificar el estadio de las lesiones a partir de imágenes.",
    },
    imgPath: "/ProjectImgs/NurseLink2.jpg",
    tags: ["Flutter", "Machine Learning", "IA", "Saúde", "App", "Mobile"],
    openUrl: "https://play.google.com/store/apps/details?id=com.carelink.app",
    openType: "playstore",
  },

  {
    title: "Tindog",
    description: {
      pt: "Tindog é um app da ONG ARCA que facilita adoção, doação e busca por pets desaparecidos. Usa IA para classificar posts e detectar cães e gatos em imagens.",
      en: "Tindog is an app for ARCA, an NGO, that supports adoption, donations, and searches for missing pets. It uses AI to classify posts and detect dogs and cats in images.",
      es: "Tindog es una aplicación de la ONG ARCA que facilita adopciones, donaciones y búsquedas de mascotas desaparecidas. Usa IA para clasificar publicaciones y detectar perros y gatos en imágenes.",
    },
    imgPath: "/ProjectImgs/tindog-2.jpeg",
    tags: [
      "Flutter",
      "Python",
      "IA",
      "Machine Learning",
      "ONG",
      "Flask",
      "Firebase",
      "Google Cloud Functions",
    ],
    openUrl: "https://play.google.com/store/apps/details?id=com.arca.tindog",
    openType: "playstore",
  },

  {
    title: "Voice Reminder — Keep Focus",
    description: {
      pt: "Voice Reminder — Keep Focus é uma extensão do Chrome que envia lembretes de voz personalizados em intervalos regulares para ajudar você a manter o foco.",
      en: "Voice Reminder — Keep Focus is a Chrome extension that delivers custom voice reminders at regular intervals to help you stay focused.",
      es: "Voice Reminder — Keep Focus es una extensión de Chrome que reproduce recordatorios de voz personalizados en intervalos regulares para ayudarte a mantener el enfoque.",
    },
    gitUrl: "https://github.com/pablo-s-dev/voice-reminder",
    openUrl:
      "https://chromewebstore.google.com/detail/mldkadifcljcmkkjbgcchghmkhcanlie?utm_source=item-share-cb",
    openType: "chromewebstore",
    tags: [
      "JavaScript",
      "Extensão Chrome",
      "Web",
      "Educação",
      "Produtividade",
      "Foco",
    ],
    imgPath: "/ProjectImgs/VoiceReminder.png",
  },

  {
    title: "Infinite Canvas Drawing",
    description: {
      pt: "Infinite Canvas Drawing é um aplicativo de desenho com canvas infinito: você pode dar zoom e navegar pelo canvas livremente. Ele também conta com um modo ponteiro, que permite desenhar sem que o dedo cubra a visão do desenho.",
      en: "Infinite Canvas Drawing is a drawing app with an infinite canvas, so you can zoom and navigate freely. It also includes a pointer mode that lets you draw without your finger covering the drawing.",
      es: "Infinite Canvas Drawing es una aplicación de dibujo con canvas infinito, por lo que puedes hacer zoom y navegar libremente. También incluye un modo puntero para dibujar sin que el dedo cubra la vista del dibujo.",
    },
    imgPath: "/ProjectImgs/InfiniteCanvasDrawing2.jpg",
    openUrl:
      "https://play.google.com/store/apps/details?id=com.PabloS.InfiniteCanvas",
    openType: "playstore",
    gitUrl: "https://github.com/pablo-s-dev/InfiniteCanvas",
    tags: ["React Native", "TypeScript", "Desenho"],
  },

  {
    title: "PyContextMenu",
    description: {
      pt: "PyContextMenu facilita a adição de scripts Python ao menu de contexto do Windows para arquivos, pastas e o plano de fundo.",
      en: "PyContextMenu makes it easier to add Python scripts to the Windows context menu for files, folders, and the background.",
      es: "PyContextMenu facilita agregar scripts Python al menú contextual de Windows para archivos, carpetas y el fondo.",
    },
    imgPath: "/ProjectImgs/pycontextmenu_smooth.png",
    gitUrl: "https://github.com/pablo-s-dev/PyContextMenu",
    tags: ["Python", "Ferramenta DEV"],
  },
  {
    title: "Dev Create App",
    description: {
      pt: 'Dev Create App é uma CLI leve para Windows que cria projetos Python, Node.js ou Vite em segundos: execute "dev", escolha as opções, e ela cria os arquivos, abre o editor e inicia o servidor de desenvolvimento.',
      en: 'Dev Create App is a lightweight Windows CLI that scaffolds Python, Node.js, or Vite projects in seconds: run "dev", pick options, and it creates files, opens your editor, and starts the dev server.',
      es: 'Dev Create App es una CLI ligera para Windows que crea proyectos Python, Node.js o Vite en segundos: ejecuta "dev", elige las opciones, y crea los archivos, abre el editor e inicia el servidor de desarrollo.',
    },
    imgPath: "/ProjectImgs/dev.png",
    gitUrl: "https://github.com/pablo-s-dev/dev-create-app",
    tags: ["C", "CLI", "Python", "Node.js", "Vite", "Ferramenta DEV"],
  },

  {
    title: "Poliprocess",
    description: {
      pt: "Poliprocess é um site para uma ideia de negócio de venda de polímeros triturados. O projeto foi feito com Next.js, TypeScript e Tailwind CSS.",
      en: "Poliprocess is a website for a business idea focused on selling shredded polymers. The project was built with Next.js, TypeScript, and Tailwind CSS.",
      es: "Poliprocess es un sitio web para una idea de negocio centrada en la venta de polímeros triturados. El proyecto fue hecho con Next.js, TypeScript y Tailwind CSS.",
    },
    imgPath: "/ProjectImgs/PoliprocessDesktop.png",
    gitUrl: "https://github.com/pablo-s-dev/Poliprocess",
    openUrl: "https://poliprocess.netlify.app/",
    openType: "web",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Venda",
      "Negócio",
      "Startup",
      "Empresa",
    ],
  },

  {
    title: "Quiz for YouTube",
    description: {
      pt: "Quiz for YouTube é uma extensão para navegadores Chromium capaz de gerar um quiz interativo utilizando as legendas do vídeo em reprodução, possibilitando um estudo ativo do conteúdo. As perguntas e respostas são geradas pela inteligência artificial da OpenAI.",
      en: "Quiz for YouTube is an extension for Chromium browsers that can generate an interactive quiz from the captions of the video you are watching, enabling active study of the content. The questions and answers are generated by OpenAI artificial intelligence.",
      es: "Quiz for YouTube es una extensión para navegadores Chromium capaz de generar un quiz interactivo a partir de los subtítulos del video en reproducción, lo que permite estudiar el contenido de forma activa. Las preguntas y respuestas son generadas por la inteligencia artificial de OpenAI.",
    },
    imgPath: "/ProjectImgs/quiz.png",
    openUrl:
      "https://chromewebstore.google.com/detail/quiz-for-youtube/comfpjldlolnaalknabmalgfdjfghedi",
    openType: "chromewebstore",
    tags: [
      "JavaScript",
      "Vanilla",
      "CSS",
      "HTML",
      "Aprendizado",
      "Extensão",
      "Web",
      "Educação",
      "IA",
      "Machine Learning",
      "OpenAI",
      "GPT",
    ],
  },
  // {
  //   title: "Guess the word",
  //   description:
  //     "Guess the word é uma plataforma que utiliza a técnica de recordação ativa para fazer com que conceitos virem gatilhos fortes para palavras em inglês. A partir das definições, é preciso se esforçar para lembrar da palavra em questão.",
  //   imgPath: "/ProjectImgs/GuessTheWord.jpg",
  //   gitUrl: "https://github.com/pablo-s-dev/Guess-the-word",
  //   openUrl: "https://guessword.netlify.app/",
  //   tags: [
  //     "JavaScript",
  //     "Vanilla",
  //     "CSS",
  //     "HTML",
  //     "Aprendizado de Idiomas",
  //     "Site",
  //     "Web",
  //     "Educação",
  //     "Aprendizado",
  //   ],
  // },

  {
    title: "PhasorCalc",
    description: {
      pt: "PhasorCalc é uma calculadora de fasores, projetada principalmente para facilitar cálculos envolvendo circuitos com corrente alternada, pois essas ondas podem ser representadas como fasores. O app inclui operações de aritmética básica e operações especiais, como paralelo e divisor de corrente/tensão.",
      en: "PhasorCalc is a phasor calculator designed mainly to simplify calculations involving alternating current circuits, since those waves can be represented as phasors. The app includes basic arithmetic operations and special operations such as parallel and current/voltage divider.",
      es: "PhasorCalc es una calculadora de fasores diseñada principalmente para facilitar cálculos con circuitos de corriente alterna, ya que esas ondas pueden representarse como fasores. La app incluye operaciones de aritmética básica y operaciones especiales, como paralelo y divisor de corriente/tensión.",
    },
    imgPath: "/ProjectImgs/PhasorCalc.jpg",
    openUrl:
      "https://play.google.com/store/apps/details?id=com.psao.phasorcalc",
    openType: "playstore",
    tags: [
      "Flutter",
      "Matemática",
      "Física",
      "Elétrica",
      "Engenharia",
      "Circuitos",
      "Fasores",
      "Corrente Alternada",
    ],
  },

  // {
  //   title: "TicTacToe",
  //   description: "TicTacToe é o clássico jogo da velha, feito em Flutter.",
  //   imgPath: "/ProjectImgs/TicTacToe.jpg",
  //   gitUrl: "https://github.com/pablo-s-dev/TicTacToe",
  //   tags: ["Flutter", "Jogo", "Game"],
  // },
  {
    title: "Pong",
    description: {
      pt: "O clássico jogo de Ping Pong, feito em Java.",
      en: "The classic Ping Pong game, built in Java.",
      es: "El clásico juego de Ping Pong, hecho en Java.",
    },
    imgPath: "/ProjectImgs/Pong.jpg",
    gitUrl: "https://github.com/pablo-s-dev/Pong-Java",
    openUrl: "https://github.com/pablo-s-dev/Pong-Java/blob/main/dist/Pong.exe",
    openType: "download",
    tags: ["Java", "Jogo"],
  },
];

export default function Projects() {
  const { language, t } = useI18n();
  const projectWrapper = useRef<HTMLDivElement>(null);
  const projectsPage = useRef<HTMLDivElement>(null);

  const projectList = projects.map((data, i) => {
    return (
      <Project
        data={data}
        root={projectsPage}
        index={i}
        language={language}
        tagsLabel={t("projects.tagsLabel")}
        key={i}
      />
    );
  });

  const scrollContainer = useScrollContainer() || undefined;

  const { scrollYProgress } = useScroll({
    container: scrollContainer,
    target: projectsPage,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.9, 1],
    ["100%", "100%", "0%"],
  );

  return (
    <motion.section style={{ opacity }} ref={projectsPage}>
      <div className={styles.projectsPage} id="projects">
        <div ref={projectWrapper} className={styles.projectsWrapper}>
          <div className={styles.jsxTag}>
            <h1>
              {"<"}
              <strong>{` ${t("nav.projects")} `}</strong>
              {">"}
            </h1>
          </div>

          <div>{...projectList}</div>

          <div className={styles.jsxTag}>
            <h1>
              {"</"}
              <strong>{` ${t("nav.projects")} `}</strong>
              {">"}
            </h1>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

type ProjectData = {
  title: string;
  description: LocalizedText;
  imgPath: string;
  gitUrl?: string;
  openUrl?: string;
  openType?: "web" | "playstore" | "chromewebstore" | "github" | "download";
  imgSize?: [number, number];
  // url: string | any,
  tags: string[];
};

function Project({
  data,
  root,
  index: projectIdx,
  language,
  tagsLabel,
}: {
  data: ProjectData;
  root: RefObject<HTMLDivElement>;
  index: number;
  language: Language;
  tagsLabel: string;
}) {
  const ref = useRef(null);
  const { t } = useI18n();

  const scrollContainer = useScrollContainer() || undefined;

  const { scrollYProgress } = useScroll({
    container: scrollContainer,
    target: ref,
    offset: ["end end", "end start"],
    layoutEffect: false,
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["100%", "100%", "0%"],
  );

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -300]);

  const aboutRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect(() => {
  //   if (aboutRef.current) {
  //     requestAnimationFrame(() => {
  //       aboutRef.current?.scrollTo({ top: 0, behavior: "auto" });
  //     });
  //   }
  // }, []);

  const get_img_orientation = async (imgPath: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imgPath;
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        const orientation = h > w ? "portrait" : "landscape";

        resolve(orientation);
      };
    });
  };

  const [orientation, setOrientation] = useState("landscape");
  const description = getLocalizedText(data.description, language);
  const tags = data.tags.map((tag) => localizeTag(tag, language));

  useEffect(() => {
    get_img_orientation(data.imgPath).then((orientation: any) => {
      setOrientation(orientation);
    });
  }, [data.imgPath]);

  return (
    <motion.section
      className={styles.project}
      ref={ref}
      style={{
        opacity,
        y,
      }}
    >
      <div className={styles.card}>
        <h1 className={styles.card_title}>{data.title}</h1>
        {/* <div className={styles.imgContainer}> */}
        <img
          src={data.imgPath}
          className={`${styles.img} ${styles[orientation]}`}
          // increase quality
          loading="eager"
          alt={data.title}
        />
        {/* </div> */}

        <motion.div
          ref={aboutRef}
          className={styles.about}
          // style={{ y }}
        >
          <p>{description}</p>
          <p>
            {tagsLabel}: {tags.join("; ")}
          </p>
        </motion.div>
        <div className={styles.btnContainer}>
          {data.openUrl ? (
            <a
              href={data.openUrl}
              target="_blank"
              className={styles.btnWrapper}
            >
              <div className={styles.btn}>
                <Icon
                  icon={
                    data.openType === "playstore"
                      ? "mdi:google-play"
                      : data.openType === "chromewebstore"
                        ? "mdi:google-chrome"
                        : data.openType === "download"
                          ? "mdi:download"
                          : "mdi:web"
                  }
                  width="1.2em"
                  height="1.2em"
                />
                <span className={styles.btnLabel}>{t("projects.open")}</span>
              </div>
            </a>
          ) : (
            <div className={`${styles.btnWrapper} ${styles.disabled}`}>
              <div className={styles.btn}>
                <Icon icon="mdi:web" width="1.2em" height="1.2em" />
                <span className={styles.btnLabel}>{t("projects.open")}</span>
              </div>
            </div>
          )}

          {data.gitUrl ? (
            <a
              href={data.gitUrl}
              target="_blank"
              title="GitHub"
              className={styles.btnWrapper}
            >
              <div className={styles.btn}>
                <Icon icon="mdi:github" width="1.2em" height="1.2em" />
                <span className={styles.btnLabel}>{t("projects.github")}</span>
              </div>
            </a>
          ) : (
            <div className={`${styles.btnWrapper} ${styles.disabled}`}>
              <div className={styles.btn}>
                <Icon icon="mdi:github" width="1.2em" height="1.2em" />
                <span className={styles.btnLabel}>{t("projects.github")}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
