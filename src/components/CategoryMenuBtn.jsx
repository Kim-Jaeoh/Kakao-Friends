import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Container = styled.li`
  flex: 1 auto;
  text-align: center;
  position: relative;
  cursor: pointer;
  line-height: 43px;
`;

const List = styled.div`
  font-size: 16px;
  line-height: 43px;
  white-space: nowrap;
  position: relative;
  font-weight: normal;
`;

const ListAfter = styled.div`
  font-size: 16px;
  line-height: 43px;
  white-space: nowrap;
  position: relative;
  font-weight: 700;

  ::after {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    border-top: 4px solid #000;
    content: "";
  }
`;

const SelectMenuBtn = ({ url, text, selected, num, onSelected }) => {
  return (
    <>
      {selected === num ? (
        <Container>
          <Link onClick={() => onSelected(num)} to={url}>
            <ListAfter>{text}</ListAfter>
          </Link>
        </Container>
      ) : (
        <Container>
          <Link onClick={() => onSelected(num)} to={url}>
            <List>{text}</List>
          </Link>
        </Container>
      )}
    </>
  );
};

export default SelectMenuBtn;
