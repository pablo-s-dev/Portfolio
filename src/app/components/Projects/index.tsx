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

const projects: ProjectData[] = [

  {
    title: "Hearken",
    description:
      "Hearken é uma plataforma de aprendizado de idiomas usando vídeos do YouTube. Você pode escolher um vídeo que tenha legenda no seu idioma alvo, para ser desafiado a entender cada frase. Em seguida, você será solicitado a falar ou digitar o que foi dito.",
    imgPath: "/ProjectImgs/hearken-s1.png",
    openUrl: "https://hearken.netlify.app/",
    tags: [
      "Javascript",
      "Vanilla",
      "CSS",
      "HTML",
      "Language Learning",
      "Website",
      "Web",
      "Education",
      "Learning",
    ],
  },
  
  {
    title: "NurseLink",
    description:
      "NurseLink é um aplicativo que assiste enfermeiros no tratamento de pacientes com lesão por pressão. Ele utiliza inteligência artificial para classificar o estágio das lesões através das imagens.",
    imgPath: "/ProjectImgs/NurseLink2.jpg",
    tags: ["Flutter", "Machine Learning", "IA", "Health", "App", "Mobile"],
    openUrl: "https://play.google.com/store/apps/details?id=com.carelink.app",
  },

  {
    title: "Tindog",
    description:
      "Tindog é um app da ONG ARCA que facilita adoção, doação e busca por pets desaparecidos. Usa IA para classificar posts e detectar cães e gatos em imagens.",
    imgPath: "/ProjectImgs/tindog-2.jpeg",
    tags: [
      "Flutter",
      "Python",
      "IA",
      "Machine Leaning",
      "ONG",
      "Flask",
      "Firebase",
      "Google Cloud Functions",
    ],
    openUrl: "https://play.google.com/store/apps/details?id=com.arca.tindog"
  },

  {
    title: "Voice Reminder — Keep Focus",
    description: "A Chrome extension that delivers custom voice reminders at regular intervals to help you stay focused.",
    gitUrl: "https://github.com/pablo-s-dev/voice-reminder",
    openUrl: "https://chromewebstore.google.com/detail/mldkadifcljcmkkjbgcchghmkhcanlie?utm_source=item-share-cb",
    tags: [
      "Javascript",
      "Chrome Extension",
      "Web",
      "Education",
      "Productivity",
      "Focus",
    ],
    imgPath: "/ProjectImgs/VoiceReminder.png",
  },

    {
    title: "Infinite Canvas Drawing",
    description:
      "Infinite Canvas Drawing é um aplicativo de desenho com canvas infinito, ou seja, pode-se dar zoom ou navegar infinitamente pelo canvas. Ele também conta com um modo ponteiro, que permite desenhar sem que o dedo tape a visão do desenho que está surgindo.",
    imgPath: "/ProjectImgs/InfiniteCanvasDrawing2.jpg",
    openUrl:
      "https://play.google.com/store/apps/details?id=com.PabloS.InfiniteCanvas",
    gitUrl: "https://github.com/pablo-s-dev/InfiniteCanvas",
    tags: ["React Native", "Typescript", "Drawing"],
  },


  {
    title: "PyContextMenu",
    description:
      "O PyContextMenu facilita a adição de scripts Python ao menu de contexto do Windows (menu do botão direito) para arquivos, pastas e o plano de fundo.",
    imgPath: "/ProjectImgs/pycontextmenu_smooth.png",
    gitUrl: "https://github.com/pablo-s-dev/PyContextMenu",
    tags: [
      "Python",
      "DEV Tool"
    ],
  },
  {
    title: "Dev Create App",
    description: 'Dev Create App — a lightweight Windows CLI that scaffolds Python, Node.js, or Vite projects in seconds: run "dev", pick options, and it creates files, opens your editor, and starts the dev server.',
    imgPath: "/ProjectImgs/dev.png",
    gitUrl: "https://github.com/pablo-s-dev/dev-create-app",
    tags: [
      "C",
      "CLI",
      "Python",
      "Node.js",
      "Vite",
      "DEV Tool"
    ],
  },


  {
    title: "Poliprocess",
    description:
      "Poliprocess é um website de uma ideia de negócio de venda de polímeros triturados. Esse website foi feito em NextJS, Typescript e Tailwind CSS.",
    imgPath: "/ProjectImgs/PoliprocessDesktop.png",
    gitUrl: "https://github.com/pablo-s-dev/Poliprocess",
    openUrl: "https://poliprocess.netlify.app/",
    tags: [
      "React",
      "NextJS",
      "Typescript",
      "Tailwind CSS",
      "Venda",
      "Negócio",
      "Startup",
      "Empresa",
    ],
  },

  {
    title: "Youtube ActiveStudy with AI",
    description:
      "Youtube ActiveStudy with AI é uma extensão para navegadores Chromium, capaz de gerar um quiz interativo utlizando as legendas do vídeo que está sendo assistido, possibilitando um estudo ativo do conteúdo. As perguntas e respostas são geradas pela inteligência artificial da OpenAI.",
    imgPath: "/ProjectImgs/Youtube-ActiveStudy-with-AI-screen.png",
    // openUrl:
    //   "https://chrome.google.com/webstore/detail/comfpjldlolnaalknabmalgfdjfghedi?authuser=1&hl=pt-BR",
    tags: [
      "Javascript",
      "Vanilla",
      "CSS",
      "HTML",
      "Learning",
      "Extension",
      "Web",
      "Education",
      "AI",
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
  //     "Javascript",
  //     "Vanilla",
  //     "CSS",
  //     "HTML",
  //     "Language Learning",
  //     "Website",
  //     "Web",
  //     "Education",
  //     "Learning",
  //   ],
  // },

  {
    title: "PhasorCalc",
    description:
      "PhasorCalc é uma calculadora de fasores, projetada principalmente para facilitar cálculos envolvendo circuitos com corrente alternada, pois essas ondas podem ser representadas como fasores. O app inclui operações de aritmética básica e operações especiais, como paralelo e divisor de corrente/tensão.",
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
    description: "O clássico jogo de Ping Pong, feito em Java.",
    imgPath: "/ProjectImgs/Pong.jpg",
    gitUrl: "https://github.com/pablo-s-dev/Pong-Java",
    openUrl: "https://github.com/pablo-s-dev/Pong-Java/blob/main/dist/Pong.exe",
    tags: ["Java", "Jogo", "Game"],
  },
];

export default function Projects() {
  const projectWrapper = useRef<HTMLDivElement>(null);
  const projectsPage = useRef<HTMLDivElement>(null);

  const projectList = projects.map((data, i) => {
    return <Project data={data} root={projectsPage} index={i} key={i} />;
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
              <strong>{"<Projetos>"}</strong>
            </h1>
          </div>

          <div>{...projectList}</div>

          <div className={styles.jsxTag}>
            <h1>
              <strong>{"</Projetos>"}</strong>
            </h1>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

type ProjectData = {
  title: string;
  description: string;
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
}: {
  data: ProjectData;
  root: RefObject<HTMLDivElement>;
  index: number;
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
        style={{
          fontSize: "4.5vmin",
          fontWeight: "bold",
          marginBottom: "1vmin",
          textAlign: "center",
        }}
      >
        {data.title}
      </h1>
        {/* <div className={styles.imgContainer}> */}
        <img
          src={data.imgPath}
          className={`${styles.img} ${styles[orientation]}`}
          // increase quality
          loading="lazy"
          alt={data.title}
        />
        {/* </div> */}

        <motion.div
          ref={aboutRef}
          className={styles.about}
          // style={{ y }}
        >
          <p>{data.description}</p>
          <p>Tags: {data.tags.join("; ")}</p>
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
