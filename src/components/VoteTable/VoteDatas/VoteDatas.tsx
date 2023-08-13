import styles from "./VoteDatas.module.scss";
import { TopicBox } from "components";
import { useEffect, useRef } from "react";
import { TopicVotes, localDataHandler } from "utils/localDataHandler";
import { Topic } from "../Vote/TopicBox";


const VoteDatas = () => {
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
