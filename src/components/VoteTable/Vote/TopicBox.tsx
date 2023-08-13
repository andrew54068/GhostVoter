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
  const [optionInfos, setOptionInfos] = useState(topic.options);
  const [selectedOption, setSelectedOption] = useState(-1)

  const userId = session?.user?.name ?? ''
  const handler = localDataHandler()
  useEffect(() => {
    // setTopics(handler.getTopics())
    setOptionInfos(handler.getOptionsAmountByTopic(topic.id))
  }, []);

  console.log(`💥 topic.options: ${JSON.stringify(optionInfos, null, '  ')}`);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{topic.title}</div>
      <div className={styles.options}>
        
        {optionInfos.map((info: OptionInfo, i: number) => {
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
        // disabled={!handler.canVote(topic.id, userId)}
        disabled={userId === '' || !handler.canVote(topic.id, userId)}
        onClick={() => {
          const selectedOp = topic.options[selectedOption]
          handler.addNewVote({
            userId: session?.user?.name ?? '',
            topicId: topic.id,
            optionTitle: selectedOp.title
          })
          setOptionInfos(handler.getOptionsAmountByTopic(topic.id))
        }}
      >
        VOTE
      </Button>
    </div>
  );
};

export { TopicBox };
