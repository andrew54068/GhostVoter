import styles from "./VoteOption.module.scss";
import styled from "styled-components";

interface VoteOptionData {
  text: string;
  isSelected: boolean;
  onSelected: () => void;
}

const StyledButton = styled.button`
  position: relative;
  width: 80%;
  padding: 20px;
  height: auto;
  border-width: 0px;
  border-radius: 20px;
  color: #000000;
  outline: none;
  box-shadow: none;

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

const SelectedBackground = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  background-color: #666666;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-clip: border-box;
`;

export const TitleText = styled.div`
  color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: start;

  text-align: justify;
  text-align-last: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
`;

const DescText = styled.div`
  color: #ffffff;
  width: 90%;
  flex-direction: column;
  row-gap: 0.3rem;
  text-align: center;
`;

const VoteOption = ({ text, isSelected, onSelected }: VoteOptionData) => {
  const backgrounColor = isSelected ? "#555555" : "#222222"
  return (
    <StyledButton onClick={onSelected} style={{backgroundColor: backgrounColor}}>
      {/* {isSelected && <SelectedBackground />} */}
      <DescText>{text}</DescText>
    </StyledButton>
  );
};

export { VoteOption };
