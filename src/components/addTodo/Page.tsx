import React, { useState } from "react";
import styled from "styled-components";
import { _addTodo } from "../../api/todos";
import { useNavigate } from "react-router-dom";
import NormalModal from "../common/modal/NormalModal";
import useTodoValidation from "../../hook/useTodoValidation";

const Page = () => {
  // input 관련 유효성검사가 포함된 훅
  const { handleInputChange, InputData, errors } = useTodoValidation();

  const [modalState, setModalState] = useState("false");
  const [modalContent, setModalContent] = useState("");

  const AddTodoHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //입력값중 하나라도 빈값이 있다면
    for (const key in errors) {
      if (errors[key as keyof typeof errors] !== "") {
        setModalContent(Object.values(errors).join("\n"));
        setModalState("true");
        return;
      }
    }

    const addResult = await _addTodo(InputData);

    if (!addResult) {
      setModalContent("다시 시도해주세요");
    } else {
      setModalContent("할 일이 추가되었습니다.");
    }

    setModalState("true");
  };

  return (
    <MainContent>
      <NormalModal
        content={modalContent}
        modalState={modalState}
        setModalState={setModalState}
      />
      <form className="addForm" onSubmit={AddTodoHandler}>
        <input
          className="title"
          type="text"
          placeholder="title"
          name="title"
          value={InputData.title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="detail"
          name="detail"
          value={InputData.detail}
          onChange={handleInputChange}
        />
        <label>
          시작 날짜 :
          <input
            type="date"
            name="startDate"
            value={InputData.startDate}
            onChange={handleInputChange}
          />
        </label>

        <label>
          끝 날짜 :
          <input
            type="date"
            name="endDate"
            value={InputData.endDate}
            onChange={handleInputChange}
          />
        </label>
        <button>추가</button>
      </form>
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
    textarea {
      height: 300px;
    }
  }
`;
