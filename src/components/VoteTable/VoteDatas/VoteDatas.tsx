import styles from "./VoteDatas.module.scss";
import { TopicBox } from "components";
// import { useEffect, useState } from "react";
import { DATAS } from "./datas";
import { Topic } from "../Vote/TopicBox";

interface VoteTable {
  openModal: () => void;
}

const VoteDatas = ({ openModal }: VoteTable) => {
  // const [isThereDatas, setIsThereDatas] = useState(true);
  // useEffect(() => {
  //   if (voteDatas !== null) {
  //     setIsThereDatas(true);
  //   }
  // }, [voteDatas]);
  return (
    <div className={styles.wrapper}>
      {DATAS.map((data: Topic, i: number) => {
            return (
              <TopicBox
                key={i}
                topic={data}
              />
            );
      })}
    </div>
  );
};

export { VoteDatas };
