import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { _getTodo, _changeTodo } from "../../api/todos";
import { useNavigate } from "react-router-dom";

interface ContentsType {
  path?: string;
}

const Contents: React.FC<ContentsType> = ({ path }) => {
  const navigate = useNavigate();

  const [list, setList] = useState<any>([{ running: [], done: [] }]);

  // 서버로부터 데이터를 받아오는 함수
  const getDataHandler = async (path?: string) => {
    if (path) {
      if (path === "total") {
        const R_data = await _getTodo("running");
        const D_data = await _getTodo("done");
        setList({ running: R_data, done: D_data });
      } else {
        const data = await _getTodo(path);
        setList({ [path]: data });
      }
    }
  };


  interface _changeTodoData {
    id: string;
    detail: string;
    state: boolean;
    endDate: string;
    startDate: string;
    title:string;
  }

  //todo의 진행상태 변경시 동작하는 함수
  const ChageStateHandler = async (todo:_changeTodoData) => {
    try {
      const res = await _changeTodo(todo,!todo.state);
      console.log(res);
      if (res === 200) {
        await getDataHandler(path);
      }
    } catch {
      alert("에러입니다");
    }
  };

  //todo의 디테일 페이지로 이동하는 함수
  const goDetailHandler = (id: string,state:boolean) => {
    navigate(`/list/detail?id=${id}&state=${state}`);
  };

  useEffect(() => {
    getDataHandler(path);
  }, [path]);

  //아래 Card 함수 랜더링시 중복되는 부분 따로 뺀함수
  const renderList = (data: any) => {
    return (
      <Div>
        {data &&
          data.map((item: any, index: number) => (
            <Card item={item} key={index} />
          ))}
      </Div>
    );
  };

  // Todolist의 카드 형식 함수
  const Card = ({ item }: any) => {
    return (
      <CardItem>
        <div onClick={() => goDetailHandler(item.id,item.state)}>
          <div>{item.title}</div>
          <div>{item.detail}</div>
          <div>{item.time}</div>
        </div>

        <div className="buttonWrap">
          <button onClick={() => ChageStateHandler(item)}>
            {item.state ? "취소하기" : "완료하기"}
          </button>
          <button onClick={() => goDetailHandler(item.id,item.state)}>상세보기</button>
        </div>
      </CardItem>
    );
  };

  return (
    <ContentsSection>
      {path === "total" ? (
        <>
          <Div>
            <span>{"running"}</span>
            {renderList(list.running)}
          </Div>
          <Div>
            <span>{"done"}</span>
            {renderList(list.done)}
          </Div>
        </>
      ) : (
        <Div>
          <span>{path}</span>
          {path && list[path] && renderList(list[path])}
        </Div>
      )}
    </ContentsSection>
  );
};

export default Contents;

const ContentsSection = styled.section`
  width: 100%;
  display: flex;
  gap: 30px;
`;

const Div = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const CardItem = styled.div`
  border: 3px solid gray;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
  max-width: 300px;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  cursor: pointer;
  &:hover {
    background-color: rgb(204, 196, 218);
  }

  .buttonWrap {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`;
