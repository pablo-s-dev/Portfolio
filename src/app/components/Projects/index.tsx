"use client";
import styles from "./Projects.module.css";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  getLocalizedText,
  Language,
  LocalizedText,
  localizeTag,
  useI18n,
} from "../../i18n";

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
    openUrl: "https://play.google.com/store/apps/details?id=com.arca.tindog"
  },

  {
    title: "Voice Reminder — Keep Focus",
    description: {
      pt: "Voice Reminder — Keep Focus é uma extensão do Chrome que envia lembretes de voz personalizados em intervalos regulares para ajudar você a manter o foco.",
      en: "Voice Reminder — Keep Focus is a Chrome extension that delivers custom voice reminders at regular intervals to help you stay focused.",
      es: "Voice Reminder — Keep Focus es una extensión de Chrome que reproduce recordatorios de voz personalizados en intervalos regulares para ayudarte a mantener el enfoque.",
    },
    gitUrl: "https://github.com/pablo-s-dev/voice-reminder",
    openUrl: "https://chromewebstore.google.com/detail/mldkadifcljcmkkjbgcchghmkhcanlie?utm_source=item-share-cb",
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
    tags: [
      "Python",
      "Ferramenta DEV"
    ],
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
    tags: [
      "C",
      "CLI",
      "Python",
      "Node.js",
      "Vite",
      "Ferramenta DEV"
    ],
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
    title: "Youtube ActiveStudy with AI",
    description: {
      pt: "YouTube ActiveStudy with AI é uma extensão para navegadores Chromium capaz de gerar um quiz interativo utilizando as legendas do vídeo em reprodução, possibilitando um estudo ativo do conteúdo. As perguntas e respostas são geradas pela inteligência artificial da OpenAI.",
      en: "YouTube ActiveStudy with AI is an extension for Chromium browsers that can generate an interactive quiz from the captions of the video you are watching, enabling active study of the content. The questions and answers are generated by OpenAI artificial intelligence.",
      es: "YouTube ActiveStudy with AI es una extensión para navegadores Chromium capaz de generar un quiz interactivo a partir de los subtítulos del video en reproducción, lo que permite estudiar el contenido de forma activa. Las preguntas y respuestas son generadas por la inteligencia artificial de OpenAI.",
    },
    imgPath: "/ProjectImgs/Youtube-ActiveStudy-with-AI-screen.png",
    // openUrl:
    //   "https://chrome.google.com/webstore/detail/comfpjldlolnaalknabmalgfdjfghedi?authuser=1&hl=pt-BR",
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

  const { scrollYProgress } = useScroll({
    target: projectsPage,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], ["100%", "100%", "0%"]);

  return (
    <motion.section 

      style={{ opacity}}
      ref={projectsPage}>
      <div className={styles.projectsPage} id="projects">
        <div ref={projectWrapper} className={styles.projectsWrapper}>
          <div className={styles.jsxTag}>
            <h1>
              {"<"}<strong>{` ${t("nav.projects")} `}</strong>{">"}
            </h1>
          </div>

          <div>{...projectList}</div>

          <div className={styles.jsxTag}>
            <h1>
              {"</"}<strong>{` ${t("nav.projects")} `}</strong>{">"}
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  // const y = useTransform(scrollYProgress, [0, 1], ["15vmin", "-15vmin"])
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
        y
      }}
    >
      
      <div className={styles.card}>
        <h1
        className={styles.card_title}

      >
        {data.title}
      </h1>
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
          <p>{tagsLabel}: {tags.join("; ")}</p>
        </motion.div>
        <div className={styles.btnContainer}>
          <a href={data.openUrl} target="_blank">
            <div className={styles.btn} hidden={data.openUrl === undefined}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
	              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4m-8-2l8-8m0 0v5m0-5h-5" />
              </svg>
            </div>
          </a>
          <a href={data.gitUrl} target="_blank" title="GitHub">
            <div className={styles.btn} hidden={data.gitUrl === undefined}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16">
	              <path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.01 8.01 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38c0-.27.01-1.13.01-2.2c0-.75-.25-1.23-.54-1.48c1.78-.2 3.65-.88 3.65-3.95c0-.88-.31-1.59-.82-2.15c.08-.2.36-1.02-.08-2.12c0 0-.67-.22-2.2.82c-.64-.18-1.32-.27-2-.27s-1.36.09-2 .27c-1.53-1.03-2.2-.82-2.2-.82c-.44 1.1-.16 1.92-.08 2.12c-.51.56-.82 1.28-.82 2.15c0 3.06 1.86 3.75 3.64 3.95c-.23.2-.44.55-.51 1.07c-.46.21-1.61.55-2.33-.66c-.15-.24-.6-.83-1.23-.82c-.67.01-.27.38.01.53c.34.19.73.9.82 1.13c.16.45.68 1.31 2.69.94c0 .67.01 1.3.01 1.49c0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
