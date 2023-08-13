import styles from "./VoteOption.module.scss";
import styled from "styled-components";

interface VoteOptionData {
  text: string;
  amount: number;
  isSelected: boolean;
  onSelected: () => void;
}

const StyledButton = styled.button`
  position: relative;
  display: flex;
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

const AmountContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #444444;
`;

const VoteOption = ({ text, amount, isSelected, onSelected }: VoteOptionData) => {
  const backgrounColor = isSelected ? "#555555" : "#222222"
  return (
    <StyledButton onClick={onSelected} style={{backgroundColor: backgrounColor}}>
      {/* {isSelected && <SelectedBackground />} */}
      <DescText>{text}</DescText>
      <AmountContainer>{amount}</AmountContainer>
    </StyledButton>
  );
};

export { VoteOption };
