import styles from "./VoteDatas.module.scss";
import { TopicBox } from "components";
import { useEffect, useRef, useState } from "react";
import { DATAS } from "./datas";
import { Topic } from "../Vote/TopicBox";
import { TopicVotes, localDataHandler } from "utils/localDataHandler";

interface VoteTable {
  openModal: () => void;
}

const VoteDatas = ({ openModal }: VoteTable) => {
  // const [isThereDatas, setIsThereDatas] = useState(true);
  const topics = useRef([] as TopicVotes[])
  useEffect(() => {
    const handler = localDataHandler()
    topics.current = handler.getTopics()
  }, []);

  return (
    <div className={styles.wrapper}>
      {topics.current.map((data: TopicVotes, i: number) => {
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
