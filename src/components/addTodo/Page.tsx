import React from "react";
import styled from "styled-components";
import { _addTodo } from "../../api/todos";
import { useNavigate } from "react-router-dom";

const Page = () => {

  const navigate=useNavigate();
const AddTodoHandler= async(event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget)

    const addResult = await _addTodo({
        title: formData.get('title') as string,
        detail: formData.get('detail') as string,
        startDate: formData.get('startDate') as string,
        endDate: formData.get('endDate') as string
    })

    if(!addResult){
        alert('다시 시도해주세요');
    }
    else{
        alert('추가 완료');
        navigate(-1);
      
    }
}

  return (
    <MainContent>
      <form className="addForm" onSubmit={AddTodoHandler}>
        <input className="title" type="text" placeholder="title" name="title"/>
        <textarea placeholder="detail" name="detail"/>
        <label>
          시작 날짜 : 
          <input type="date" name="startDate" />
        </label>

        <label>
            끝 날짜 : 
          <input type="date" name="endDate" />
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
