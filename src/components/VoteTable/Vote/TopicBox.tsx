import styles from "./TopicBox.module.scss";
import styled from "styled-components";
import { Button } from "ui/Button/Button";
import { parsAddress } from "utils/parsAddress";
import { VoteOption } from '../VoteOption/VoteOption'
import { useEffect, useRef, useState } from "react";
import { OptionInfo, TopicVotes, localDataHandler } from "utils/localDataHandler";
import { useSession } from "next-auth/react";

const Background = styled.div`
  width: 100%;
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: start;
  justify-content: start;
  row-gap: 1vh;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-clip: border-box;
`;

export interface Topic {
  id: string;
  title: string;
  desc: string;
  options: string[];
}

export interface Vote {
  userId: string;
  topicId: string;
  optionTitle: string;
}

export interface TopicBoxData {
  topic: TopicVotes
}

// interface VoteTable {
//   openModal: () => void;
//   index: number;
//   description: string;
// }

const TopicBox = ({ topic }: TopicBoxData) => {
  const { data: session, status } = useSession();
  const [selectedOption, setSelectedOption] = useState(-1)
  const topics = useRef([] as TopicVotes[])

  const userId = session?.user?.name ?? ''
  const handler = localDataHandler()
  useEffect(() => {
    topics.current = handler.getTopics()
  }, [handler]);
  console.log(`💥 topic.options: ${JSON.stringify(topic.options, null, '  ')}`);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{topic.title}</div>
      {/* <div className={styles.desc}>{topic.desc}</div> */}
      <div className={styles.options}>
        
        {topic.options.map((info: OptionInfo, i: number) => {
              return (
                <VoteOption
                  key={i}
                  text={info.title}
                  amount={info.amount}
                  isSelected={selectedOption === i}
                  onSelected={() => {
                    setSelectedOption(i)
                  }}
                />
              )
        })}
      </div>
      <Button
        className={styles.swap}
        color="blue"
        width={"120px"}
        height="45px"
        fontWeight="fw800"
        disabled={userId === '' || !handler.canVote(topic.id, userId)}
        onClick={() => {
          const selectedOp = topic.options[selectedOption]
          handler.addNewVote({
            userId: session?.user?.name ?? '',
            topicId: topic.id,
            optionTitle: selectedOp.title
          })
          topics.current = handler.getTopics()
        }}
      >
        VOTE
      </Button>
    </div>
  );
};

export { TopicBox };
