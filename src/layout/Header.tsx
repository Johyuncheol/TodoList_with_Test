import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderSection>
      <div className="mainOption">
        <Link to="/"> 홈 </Link>
        <Link to="/add">투두 작성</Link>
        <Link to="/list/total">투두 전체</Link>
        <Link to="/">로그인</Link>
      </div>
    </HeaderSection>
  );
};

export default Header;

const HeaderSection = styled.section`
  .mainOption {
    width: 100%;
    height: 10vh;
    background-color: #b4b2cb;
    color: whitesmoke;

    display: flex;
    justify-content: space-around;
    align-items: center;

    span {
      cursor: pointer;
    }
  }
`;
