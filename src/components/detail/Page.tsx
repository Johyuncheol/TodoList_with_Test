import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { _getDetail, _changeTodo, _delTodo } from "../../api/todos";
import styled from "styled-components";

const Page = () => {
  interface detailData {
    title: string;
    detail: string;
    endDate: string;
    startDate: string;
    id: string;
    state: boolean;
  }
  const navigate=useNavigate();
  const [searchParams] = useSearchParams();
  const queryParam1 = searchParams.get("id");
  const queryParam2 = searchParams.get("state");
  const [changeMode, setChangeMode] = useState(false);
  const [newState, setNewState] = useState<boolean>(false);
  const [inputData, setInputData] = useState<detailData>({
    title: "",
    detail: "",
    endDate: "",
    startDate: "",
    id: "",
    state: false,
  });

  console.log(queryParam2);

  const getDataHandler = async () => {
    if (queryParam1 && queryParam2) {
      const data = await _getDetail(queryParam1, queryParam2);
      await setNewState(data.state);
      await setInputData({ ...data, state: data.state });
    }
  };

  const changeDataHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (queryParam1) {
      console.log(inputData);
      const addResult = await _changeTodo(inputData, newState);

      if (!addResult) {
        alert("다시 시도해주세요");
      } else {
        alert("변경 완료");
        setChangeMode(false);
      }
    }
  };

  const deleteDataHandler = async (id: string, state: boolean) => {
    const addResult = await _delTodo(id, state);

    if (addResult===200) {
      alert("삭제완료");
      navigate(-1);
    } else {
      alert(addResult);
    }
  };

  //훅으로 빼보자
  const inputDataHandler = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    type: string
  ) => {
    const { name, value, type: inputType } = e.target;
    console.log(inputType);

    if (inputType === "select-one") {
      value === "true" ? setNewState(true) : setNewState(false);
      console.log(value);
    } else {
      setInputData((prevData) => ({
        ...prevData,
        [type]: value,
      }));
    }
  };

  useEffect(() => {
    getDataHandler();
  }, []);

  console.log(inputData.state);
  return (
    <MainContent>
      {changeMode ? (
        <form className="addForm">
          <input
            type="text"
            placeholder="title"
            name="title"
            value={inputData?.title}
            onChange={(e) => inputDataHandler(e, "title")}
          />
          <textarea
            placeholder="detail"
            name="detail"
            value={inputData?.detail}
            onChange={(e) => inputDataHandler(e, "detail")}
          />

          <input
            type="date"
            name="startDate"
            value={inputData?.startDate}
            onChange={(e) => inputDataHandler(e, "startDate")}
          />

          <input
            type="date"
            name="endDate"
            value={inputData?.endDate}
            onChange={(e) => inputDataHandler(e, "endDate")}
          />
          <select name="state" onChange={(e) => inputDataHandler(e, "state")}>
            {inputData.state ? (
              <>
                <option value="true">Done</option>
                <option value="false">Running</option>
              </>
            ) : (
              <>
                <option value="false">Running</option>
                <option value="true">Done</option>
              </>
            )}
          </select>

          <div className="buttonsWrap">
            <button>취소</button>
            <button onClick={changeDataHandler}>변경완료</button>
          </div>
        </form>
      ) : (
        <div className="addForm">
          <div className="title">제목: {inputData?.title}</div>
          <div className="detail">{inputData?.detail}</div>
          <label>시작 날짜 : {inputData?.startDate}</label>

          <label>끝 날짜 : {inputData?.endDate}</label>
          <div className="buttonsWrap">
            <button onClick={() => setChangeMode(!changeMode)}>변경하기</button>
            <button
              onClick={() => deleteDataHandler(inputData.id, inputData.state)}
            >
              삭제하기
            </button>
          </div>
        </div>
      )}
    </MainContent>
  );
};

export default Page;

const MainContent = styled.section`
  padding: 5vh 0 5vh 0;
  min-height: 85vh;
  background-color: rgb(220, 211, 235);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .addForm {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 60%;
    max-width: 500px;

    .title {
      height: 50px;
    }
    .detail {
      height: 300px;
    }
    .buttonsWrap {
      display: flex;
      gap: 20px;
      justify-content: space-around;
    }
  }
`;
