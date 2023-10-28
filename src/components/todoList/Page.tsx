import React from "react";
import styled from "styled-components";
import Contents from "./Contents";
import CategoryNav from "./CategoryNav";
import { useParams } from "react-router-dom";
const Page = () => {
  const { id } = useParams();

  return (
    <MainContent>
      <CategoryNav />
      <ItemSection>
        <Contents path={id} />
      </ItemSection>
    </MainContent>
  );
};

export default Page;

const MainContent = styled.section`
  padding: 5vh 0 5vh 0;
  background-color: rgb(220, 211, 235);
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemSection = styled.section`
  display: flex;
  justify-content: center;
  width: 80%;
  max-width: 1000px;
  gap: 5%;

  padding: 30px;
`;
