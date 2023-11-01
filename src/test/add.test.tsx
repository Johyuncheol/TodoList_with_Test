import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Add from "../pages/Add";
import * as todosApi from "../api/todos";

/*
  테스트 항목 :
      빈 제목으로 할 일을 추가하면 에러 메시지를 표시.
      빈 내용으로 할 일을 추가하면 에러 메시지를 표시.
      빈 시작 날짜로 할 일을 추가하면 에러 메시지를 표시.
      빈 끝 날짜로 할 일을 추가하면 에러 메시지를 표시.
      정상적인 데이터로 할 일을 추가할 수 있는지 확인.

      부가적: 
      제목 내용 시작날짜 끝날짜가 화면에 보이는지
      함수 호출에 올바른 인자가 전달되는지  
*/

describe("AddPage 컴포넌트 테스트", () => {

  it("빈 제목으로 할 일을 추가하면 에러 메시지를 표시", async () => {
    const mockAddTodo = jest.spyOn(todosApi, "_addTodo");

    render(
      <MemoryRouter>
        <Add />
      </MemoryRouter>
    );

    // 각 입력 요소를 찾고 값 입력
    const titleInput = screen.getByPlaceholderText("title");
    const detailTextarea = screen.getByPlaceholderText("detail");
    const startDateInput = screen.getByLabelText("시작 날짜 :");
    const endDateInput = screen.getByLabelText("끝 날짜 :");

    fireEvent.change(titleInput, { target: { value: "" } });
    fireEvent.change(detailTextarea, { target: { value: "할 일 설명입니다." } });
    fireEvent.change(startDateInput, { target: { value: "2023-10-30" } });
    fireEvent.change(endDateInput, { target: { value: "2023-11-05" } });

    const addButton = screen.getByText("추가");
    fireEvent.click(addButton);

    // mockAddTodo는 호출되지 않아야 함
    expect(mockAddTodo).not.toHaveBeenCalled();

    // 빈 제목 에러 메시지 확인
    const errorMessage = await screen.findByText("제목을 입력하세요.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("빈 내용으로 할 일을 추가하면 에러 메시지를 표시", async () => {
    const mockAddTodo = jest.spyOn(todosApi, "_addTodo");

    render(
      <MemoryRouter>
        <Add />
      </MemoryRouter>
    );

    // 각 입력 요소를 찾고 값 입력
    const titleInput = screen.getByPlaceholderText("title");
    const detailTextarea = screen.getByPlaceholderText("detail");
    const startDateInput = screen.getByLabelText("시작 날짜 :");
    const endDateInput = screen.getByLabelText("끝 날짜 :");

    fireEvent.change(titleInput, { target: { value: "새로운 할 일" } });
    fireEvent.change(detailTextarea, { target: { value: "" } });
    fireEvent.change(startDateInput, { target: { value: "2023-10-30" } });
    fireEvent.change(endDateInput, { target: { value: "2023-11-05" } });

    const addButton = screen.getByText("추가");
    fireEvent.click(addButton);

    // mockAddTodo는 호출되지 않아야 함
    expect(mockAddTodo).not.toHaveBeenCalled();

    // 빈 제목 에러 메시지 확인
    const errorMessage = await screen.findByText("내용을 입력하세요.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("빈 시작날짜로 할 일을 추가하면 에러 메시지를 표시", async () => {
    const mockAddTodo = jest.spyOn(todosApi, "_addTodo");

    render(
      <MemoryRouter>
        <Add />
      </MemoryRouter>
    );

    // 각 입력 요소를 찾고 값 입력
    const titleInput = screen.getByPlaceholderText("title");
    const detailTextarea = screen.getByPlaceholderText("detail");
    const startDateInput = screen.getByLabelText("시작 날짜 :");
    const endDateInput = screen.getByLabelText("끝 날짜 :");

    fireEvent.change(titleInput, { target: { value: "새로운 할 일" } });
    fireEvent.change(detailTextarea, { target: { value: "할 일 설명입니다." } });
    fireEvent.change(startDateInput, { target: { value: "" } });
    fireEvent.change(endDateInput, { target: { value: "2023-11-05" } });

    const addButton = screen.getByText("추가");
    fireEvent.click(addButton);

    // mockAddTodo는 호출되지 않아야 함
    expect(mockAddTodo).not.toHaveBeenCalled();

    // 빈 제목 에러 메시지 확인
    const errorMessage = await screen.findByText("시작 날짜를 입력하세요.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("빈 끝날짜로 할 일을 추가하면 에러 메시지를 표시", async () => {
    const mockAddTodo = jest.spyOn(todosApi, "_addTodo");

    render(
      <MemoryRouter>
        <Add />
      </MemoryRouter>
    );

    // 각 입력 요소를 찾고 값 입력
    const titleInput = screen.getByPlaceholderText("title");
    const detailTextarea = screen.getByPlaceholderText("detail");
    const startDateInput = screen.getByLabelText("시작 날짜 :");
    const endDateInput = screen.getByLabelText("끝 날짜 :");

    fireEvent.change(titleInput, { target: { value: "새로운 할 일" } });
    fireEvent.change(detailTextarea, { target: { value: "할 일 설명입니다." } });
    fireEvent.change(startDateInput, { target: { value: "2023-10-30" } });
    fireEvent.change(endDateInput, { target: { value: "" } });

    const addButton = screen.getByText("추가");
    fireEvent.click(addButton);

    // mockAddTodo는 호출되지 않아야 함
    expect(mockAddTodo).not.toHaveBeenCalled();

    // 빈 제목 에러 메시지 확인
    const errorMessage = await screen.findByText("끝 날짜를 입력하세요.");
    expect(errorMessage).toBeInTheDocument();
  });


  it("할 일을 추가할 수 있는지 확인", async () => {
    // 대체 모의 함수를 만들어서 테스트 중 호출 반환값 추적
    const mockAddTodo = jest.spyOn(todosApi, "_addTodo");

    render(
      <MemoryRouter>
        <Add />
      </MemoryRouter>
    );

    // 각 입력 요소를 찾고 값 입력
    const titleInput = screen.getByPlaceholderText("title");
    const detailTextarea = screen.getByPlaceholderText("detail");
    const startDateInput = screen.getByLabelText("시작 날짜 :");
    const endDateInput = screen.getByLabelText("끝 날짜 :");

    fireEvent.change(titleInput, { target: { value: "새로운 할 일" } });
    fireEvent.change(detailTextarea, { target: { value: "할 일 설명입니다." } });
    fireEvent.change(startDateInput, { target: { value: "2023-10-30" } });
    fireEvent.change(endDateInput, { target: { value: "2023-11-05" } });

    // 추가 버튼 클릭
    const addButton = screen.getByText("추가");
    fireEvent.click(addButton);

    // mockAddTodo의 호출에 제대로 된 값이 들어갔는지 확인
    expect(mockAddTodo).toHaveBeenCalledWith({
      title: "새로운 할 일",
      detail: "할 일 설명입니다.",
      startDate: "2023-10-30",
      endDate: "2023-11-05",
      state: false,
    });

    // 추가 후 성공 메시지 확인 
    const successMessage = await screen.findByText("할 일이 추가되었습니다.");
    expect(successMessage).toBeInTheDocument();
  });
});

