import styles from "./TopicBox.module.scss";
import styled from "styled-components";
import { Button } from "ui/Button/Button";
import { parsAddress } from "utils/parsAddress";
import { VoteOption } from '../VoteOption/VoteOption'
import { useState } from "react";

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
  timestamp: string;
  options: string[];
}

export interface TopicBoxData {
  topic: Topic
}

// interface VoteTable {
//   openModal: () => void;
//   index: number;
//   description: string;
// }

const TopicBox = ({ topic }: TopicBoxData) => {
  const [selectedOption, setSelectedOption] = useState(-1)
  console.log(`💥 topic.options: ${JSON.stringify(topic.options, null, '  ')}`);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{topic.title}</div>
      {/* <div className={styles.desc}>{topic.desc}</div> */}
      <div className={styles.options}>
        
        {topic.options.map((text: string, i: number) => {
              return (
                <VoteOption
                  key={i}
                  text={text}
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
        onClick={() => {
          // sessionStorage.setItem("topic", [])
          
          // openModal();
        }}
      >
        VOTE
      </Button>
    </div>
  );
};

export { TopicBox };
