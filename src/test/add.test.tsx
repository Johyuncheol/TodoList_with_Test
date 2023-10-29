import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Add from "../pages/Add";
import * as todosApi from "../api/todos"; 

/*
    예상 시나리오:
    title 입력 -> detail 입력 -> 시작날짜 입력 -> 끝 날짜입력 -> 추가버튼 클릭
*/

describe("AddPage 컴포넌트 테스트", () => {
  it("Add Todo 시나리오", async () => {
    // 대체 모의 함수를 만들어서 테스트중 호출 반환값 추적
    const mockAddTodo = jest.spyOn(todosApi, "_addTodo");

    render(
      <MemoryRouter>
        <Add />
      </MemoryRouter>
    );

    // 화면에 각 요소들이 출력되는지
    const titleInput = screen.getByPlaceholderText("title");
    const detailTextarea = screen.getByPlaceholderText("detail");
    const startDateInput = screen.getByLabelText("시작 날짜 :");
    const endDateInput = screen.getByLabelText("끝 날짜 :");

    // onchage가 잘일어나는지
    fireEvent.change(titleInput, { target: { value: "테스트 제목" } });
    fireEvent.change(detailTextarea, { target: { value: "테스트 상세 내용" } });
    fireEvent.change(startDateInput, { target: { value: "2023-10-30" } });
    fireEvent.change(endDateInput, { target: { value: "2023-11-05" } });

    //버튼 클릭
    const addButton = screen.getByText("추가");
    fireEvent.click(addButton);

    // mockAddTodo의 호출에 제대로 된 값이 들어갔는지 확인
    expect(mockAddTodo).toHaveBeenCalledWith({
      title: "테스트 제목",
      detail: "테스트 상세 내용",
      startDate: "2023-10-30",
      endDate: "2023-11-05",
      state: false, 
    });
  });
});
