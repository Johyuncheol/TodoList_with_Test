import React,{useEffect, useState} from "react";
import FallBoxs from "./FallBoxs";
import Img_Man from "../../assets/main/man_main.png";
import styled from "styled-components";
import { _getTodo } from "../../api/todos";

const Page = () => {
  const [data,setData]=useState([]);

  const GetTodo = async () => {
    const _data = await _getTodo("running");
    setData(_data.slice(0,6));
  };

  useEffect(()=>{
    GetTodo()
  },[])

  return (
    <MainContent>
      <img src={Img_Man} alt="메인캐릭터"></img>
      <FallBoxs data={data}/>
    </MainContent>
  );
};

export default Page;

const MainContent = styled.section`
  height: 85vh;
  padding-top: 5vh;
  background-color: rgb(220, 211, 235);

  display: flex;
  justify-content: center;
  img {
    height: 100%;
    width: 30%;
    min-width: 250px;
  }
`;
