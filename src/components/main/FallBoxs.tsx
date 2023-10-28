import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

interface FallBoxData {
  title: string;
  detail: string;
  startDate: string;
  endDate: string;
  state:boolean;
  id:string;
}

const FallBoxs: React.FC<{ data: FallBoxData[] }> = ({ data }) => {
  const speeds = [1, 0.9, 0.8, 1, 0.9, 0.8];
  const angles = [0, 2, -8, -5, 2, -5];

  const navigate=useNavigate();

  //todo의 디테일 페이지로 이동하는 함수
  const goDetailHandler = (id: string, state: boolean) => {
    navigate(`/list/detail?id=${id}&state=${state}`);
  };
  const BoxList: React.FC<{ item: FallBoxData; index: number }> = ({
    item,
    index,
  }) => {
    console.log(item);
    return (
      <FallboxWrap
        speed={speeds[index]}
        onClick={() => goDetailHandler(item.id,item.state)}
      >
        <TiltedBox angle={angles[index]}>
          <div>{item.title}</div>
          <div>start: {item.startDate}</div>
          <div>end: {item.endDate}</div>
        </TiltedBox>
      </FallboxWrap>
    );
  };

  return (
    <Div>
      <FallBoxSection>
        {data &&
          data.map((item, index) => {
            return <BoxList item={item} index={index} key={index}></BoxList>;
          })}
      </FallBoxSection>
    </Div>
  );
};

export default FallBoxs;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 20%;

  max-width: 300px;
  min-width: 200px;
`;

const FallBoxSection = styled.div`
  display: flex;
  height: 70vh;
  flex-direction: column-reverse;
  align-items: center;
`;
const fall = keyframes`
  0% {
    transform: translateY(-500%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const TiltedBox = styled.div<{ angle: number }>`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #3498db;
  color: white;
  text-align: center;

  border: 1px solid black;
  transform: rotate(${(props) => props.angle}deg);

  &:hover {
    transform: translateX(-20%);
  }
`;

const FallboxWrap = styled.div<{ speed: number }>`
  height: 20%;
  width: 80%;
  animation: ${fall} ${(props) => props.speed}s linear forwards;

  cursor: pointer;
`;
