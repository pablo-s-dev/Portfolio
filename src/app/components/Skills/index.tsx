
import styles from "./Skills.module.css";
import skillData from "./skillData.json";

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}



export default function Skills() {

  const { firstRowSkills, secondRowSkills } = skillData;

  return (
    <section className={styles.skillsPage} id="skills">
      <div className={styles.tag}>
        <h1>
          <strong>{"<Habilidades>"}</strong>
        </h1>
      </div>

      <div className={styles.skillsContainer}>
        <div className={styles.skillsWrapper}>
            <div className={styles.skillset}>
            {firstRowSkills.map((skillName, i) => {
                return <Skill {...{ skillName }} key={i} />;
            })}
            </div>
            <div className={styles.skillset}>
            {firstRowSkills.map((skillName, i) => {
                return <Skill {...{ skillName }} key={(i + "b")} />;
            })}
            </div>
        </div>

        <div className={styles.skillsWrapper}>
            <div className={styles.skillset}>
            {secondRowSkills.map((skillName, i) => {
                return <Skill {...{ skillName }} key={i} />;
            })}
            </div>
            <div className={styles.skillset}>
            {secondRowSkills.map((skillName, i) => {
                return <Skill {...{ skillName }} key={i + "b"}/>;
            })}
            </div>
        </div>
      </div>

      <div className={styles.tag}>
        <h1>
          <strong>{"</Habilidades>"}</strong>
        </h1>
      </div>
    </section>
  );
}

function BreakWords({ text }: { text: string }) {
  return (
    <div>
      {text.split(" ").map((word, i) => (
        <h3 key={i} style={{ display: "block" }}>{word}</h3>
      ))}
    </div>
  );
}

function Skill({ skillName }: { skillName: string }) {
  return (
    <div className={styles.skill}>
      <BreakWords text={skillName} />
      <img src={`/Skills/${skillName}.svg`} alt="skill icon" />
    </div>
  );
}
