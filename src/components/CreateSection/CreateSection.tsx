import styled from "styled-components";

const Section = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: end;
  margin: 1rem;
`;

const StyledButton = styled.button`
  position: relative;
  aspect-ratio: 20 / 7;
  padding: 0.7rem 1.4rem;
  border-width: 0px;
  border-radius: 1rem;
  font-size: 0.9rem;
  color: #ffffff;
  background-color: #346df1;
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
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.2);
  }

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-clip: border-box;
`;

interface CreateSectionData {
  onClick: () => void
}

const CreateSection = ({ onClick }: CreateSectionData) => {
  return (
    <Section>
      <StyledButton
        onClick={onClick}
      >
        Create New Topic
      </StyledButton>
    </Section>
  );
};

export { CreateSection };
