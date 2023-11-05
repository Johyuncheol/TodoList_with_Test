import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BASE_URL } from "../api/const";
import Contents from "../components/todoList/Contents";
import { MemoryRouter } from "react-router-dom"; // MemoryRouter를 가져옴
import "@testing-library/jest-dom/extend-expect";
import * as todosApi from "../api/todos";


/*
  테스트 항목 :
      get 요청을 통해 받아온 Todo데이터를 랜더링하고있는지
      완료하기/취소하기 버튼을 눌렀을때 _changeTodo API에 정확한 인자를 전달하는 지
*/

const mockAxios = new MockAdapter(axios);

describe("listComponent", () => {
  it("get API를 통해 받아온 데이터 랜더링 확인", async () => {
    //path가 running 일때 받아올 더미데이터입니다
    const responseData = [
      {
        id: "1",
        title: "Dummy Task 1",
        detail: "Sample detail",
        state: false,
        startDate: "2023-10-30",
        endDate: "2023-10-30",
      },
      {
        id: "2",
        title: "Dummy Task 2",
        detail: "Sample detail",
        state: false,
        startDate: "2023-10-30",
        endDate: "2023-10-30",
      },
    ];
    //path가 running 일때 GET요청 결과 목업
    mockAxios.onGet(`${BASE_URL}/todos/running`).reply(200, responseData);

    const { container } = render(
      <MemoryRouter>
        <Contents path="total" />
      </MemoryRouter>
    );

    await waitFor(() => {
      // 데이터가 렌더링되었는지 확인합니다.
      expect(container).toHaveTextContent("Dummy Task 1");
      expect(container).toHaveTextContent("Dummy Task 2");
    });
  });

  it("완료하기 버튼 눌렀을 때", async () => {
    const mockChangeTodo = jest.spyOn(todosApi, "_changeTodo");

    render(
      <MemoryRouter>
        <Contents path="total" />
      </MemoryRouter>
    );

    await waitFor(async () => {
      //완료하기 버튼이 랜더링 되었는지 확인합니다
      const completeButtons = screen.getAllByText("완료하기");
      // 더미데이터가 2개의 객체라 첫 객체의 버튼을 지정
      const targetButton = completeButtons[0]; 
      fireEvent.click(targetButton);
    });

    // mockChangeTodo 호출에 제대로 된 값이 들어갔는지 확인
    expect(mockChangeTodo).toHaveBeenCalledWith(
      {
        id: "1",
        title: "Dummy Task 1",
        detail: "Sample detail",
        state: false,
        startDate: "2023-10-30",
        endDate: "2023-10-30",
      },
      true
    );
  });

  it("취소하기 버튼 눌렀을 때", async () => {
    //path가 done일때 받아오는 더미데이터입니다
    const responseData2 = [
      {
        id: "1",
        title: "Dummy Task 1",
        detail: "Sample detail",
        state: true,
        startDate: "2023-10-30",
        endDate: "2023-10-30",
      },
      {
        id: "2",
        title: "Dummy Task 2",
        detail: "Sample detail",
        state: true,
        startDate: "2023-10-30",
        endDate: "2023-10-30",
      },
    ];

    //path가 done 일때 GET요청 결과 목업
    mockAxios.onGet(`${BASE_URL}/todos/done`).reply(200, responseData2);

    const mockChangeTodo = jest.spyOn(todosApi, "_changeTodo");

    render(
      <MemoryRouter>
        <Contents path="done" />
      </MemoryRouter>
    );

    await waitFor(async () => {
      //취소하기 버튼이 랜더링되었는지 확인합니다
      const completeButtons = screen.getAllByText("취소하기");
      // 첫 번째 버튼 선택
      const targetButton = completeButtons[0]; 
      fireEvent.click(targetButton);
    });

    // mockChangeTodo 호출에 제대로 된 값이 들어갔는지 확인
    expect(mockChangeTodo).toHaveBeenCalledWith(
      {
        id: "1",
        title: "Dummy Task 1",
        detail: "Sample detail",
        state: true,
        startDate: "2023-10-30",
        endDate: "2023-10-30",
      },
      false
    );
  });
});
