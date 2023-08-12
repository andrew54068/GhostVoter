import styles from "./Opening.module.scss";
import TEXT from "assets/text.png";
const Opening = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
      </div>
      <div className={styles.text}>
        <img src={TEXT.src}></img>
      </div>
    </div>
  );
};

export { Opening };
