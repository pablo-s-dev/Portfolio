
'use client'
import styles from './Projects.module.css'
import { motion, useScroll, useTransform } from 'framer-motion'
import { RefObject, useEffect, useRef } from 'react';
const projectData: ProjectData[] = [
    {
        title: "ARCA Tindog ",
        description: "ARCA Tindog é um aplicativo feito para uma ONG de animais chamada ARCA, da cidade de Janaúba-MG. Esse app facilita o processo de adoção, doação, busca por pets desaparecidos e denúncias. Além disso, conta com um recurso de inteligência artificial para detectar cachorros perdidos.",
        imgPath: '/ProjectImgs/Tindog.jpg',
        tags: ['Flutter', 'Python', 'IA', 'Machine Leaning', 'ONG', 'Animais', 'Flask', 'Firebase', 'Google Cloud Functions']
    },
    {
        title: "Hearken",
        description: "Hearken é uma plataforma de aprendizado de idiomas usando vídeos do YouTube. Você pode escolher um vídeo que tenha legenda no seu idioma alvo, para ser desafiado a entender cada frase. Em seguida, você será solicitado a falar ou digitar o que foi dito.",
        imgPath: '/ProjectImgs/Hearken.jpg',
        openUrl: 'https://hearken.netlify.app/',
        tags: ['Javascript', 'Vanilla', 'CSS', 'HTML', 'Language Learning', 'Website', 'Web', 'Education', 'Learning']
    },
    {
        title: "Guess the word",
        description: "Guess the word é uma plataforma que utiliza a técnica de recordação ativa para fazer com que conceitos virem gatilhos fortes para palavras em inglês. A partir das definições, é preciso se esforçar para lembrar da palavra em questão.",
        imgPath: '/ProjectImgs/GuessTheWordM.jpg',
        gitUrl: 'https://github.com/pablo-s-dev/Guess-the-word',
        openUrl: 'https://guessword.netlify.app/',
        tags: ['Javascript', 'Vanilla', 'CSS', 'HTML', 'Language Learning', 'Website', 'Web', 'Education', 'Learning']
    },
    {
        title: "Infinite Canvas Drawing",
        description: "Infinite Canvas Drawing é um aplicativo de desenho com canvas infinito, ou seja, pode-se dar zoom ou navegar infinitamente pelo canvas. Ele também conta com um modo ponteiro, que permite desenhar sem que o dedo tape a visão do desenho que está surgindo.",
        imgPath: '/ProjectImgs/InfiniteCanvasDrawing2.jpg',
        openUrl: 'https://play.google.com/store/apps/details?id=com.PabloS.InfiniteCanvas',
        gitUrl: 'https://github.com/pablo-s-dev/InfiniteCanvas',
        tags: ['Javascript', 'Vanilla', 'CSS', 'HTML', 'Language Learning', 'Website', 'Web', 'Web Scrapping', 'Education', 'Learning']
    },
    {
        title: "PhasorCalc",
        description: "PhasorCalc é uma calculadora de fasores, projetada principalmente para facilitar cálculos envolvendo circuitos com corrente alternada, pois essas ondas podem ser representadas como fasores. O app inclui operações de aritmética básica e operações especiais, como paralelo e divisor de corrente/tensão.",
        imgPath: '/ProjectImgs/PhasorCalc.jpg',
        openUrl: 'https://play.google.com/store/apps/details?id=com.psao.phasorcalc',
        tags: ['Flutter', 'Matemática', 'Física', 'Elétrica', 'Engenharia', 'Circuitos', 'Cálculo', 'Fasores', 'Corrente Alternada']
    },
    {
        title: "PoliProcess",
        description: "PoliProcess é um website de uma ideia de negócio de venda de polímeros triturados. Esse website foi feito em NextJS, Typescript e Tailwind CSS.",
        imgPath: '/ProjectImgs/Poliprocess.jpg',
        gitUrl: 'https://github.com/pablo-s-dev/Poliprocess',
        openUrl: 'https://poliprocess.netlify.app/',
        tags: ['React', 'NextJS', 'Typescript', 'Tailwind CSS', 'Venda', 'Negócio', 'Startup', 'Empresa']
    },
    {
        title: "TicTacToe",
        description: "TicTacToe é o clássico jogo da velha, feito em Flutter.",
        imgPath: '/ProjectImgs/TicTacToe.jpg',
        gitUrl: 'https://github.com/pablo-s-dev/TicTacToe',
        tags: ['Flutter', 'Jogo', 'Game']
    },
    {
        title: "Pong",
        description: "Pong é o clássico jogo de Ping Pong, feito em Java.",
        imgPath: '/ProjectImgs/Pong.jpg',
        gitUrl: 'https://github.com/pablo-s-dev/Pong-Java',
        openUrl: 'https://github.com/pablo-s-dev/Pong-Java/blob/main/dist/Pong.exe',
        tags: ['Java', 'Jogo', 'Game']
    },

]

export default function Projects() {



    const projectWrapper = useRef<HTMLDivElement>(null)
    const projectsPage = useRef<HTMLDivElement>(null)


    const projectList = projectData.map((data, i) => {
        return (<Project data={data} root={projectsPage} index={i} key={i} />)
    })

    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    return (

        <div ref={projectsPage}
        >
            <div className={styles.projectsPage} id="projects"

            >
                <div className={styles.tag}>
                    <h1 ><strong>{"<Projetos>"}</strong></h1>
                </div>

                <div ref={projectWrapper} className={styles.projectsWrapper} >{...projectList}  </div>

                <div className={styles.tag}>
                    <h1 ><strong>{"</Projetos>"}</strong></h1>
                </div>

            </div>
        </div>
    )
}

type ProjectData = {
    title: string,
    description: string,
    imgPath: string,
    gitUrl?: string,
    openUrl?: string,
    // url: string | any,
    tags: string[],

}

function Project({ data, root, index: projectIdx }: { data: ProjectData, root: RefObject<HTMLDivElement>, index: number }) {


    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // const y = useTransform(scrollYProgress, [0, 1], ["15vmin", "-15vmin"])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "100%", "0%"])



    return (

        <motion.section className={styles.project}

            ref={ref}

            style={{
                opacity,
            }}


        >
            <div className={styles.card}>

                <div className={styles.img} style={{ backgroundImage: `url(${data.imgPath})` }} >



                </div>

                <motion.div className={styles.about}
                // style={{ y }}
                >
                    <h1>{data.title}</h1>
                    <p>{data.description}</p>
                    <p>Tags: {data.tags.join(" | ")}</p>

                    <div className={styles.btnContainer}>
                        <div className={styles.btn} hidden={data.openUrl === undefined} >
                            <a href={data.openUrl} target='_blank'>Abrir</a>
                        </div>
                        <div className={styles.btn} hidden={data.gitUrl === undefined}>
                            <a href={data.gitUrl} target='_blank'>Código fonte</a>
                        </div>
                    </div>
                </motion.div>




            </div>
        </motion.section>

    )
}
