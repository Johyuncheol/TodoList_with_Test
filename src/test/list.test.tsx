import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Contents from "../components/todoList/Contents"; // Contents 컴포넌트의 실제 경로로 수정하세요
import { MemoryRouter } from "react-router-dom";

// 모킹할 더미 데이터
const dummyData = [
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

// _getTodo 함수를 모킹하고 더미 데이터 반환
import * as todosApi from "../api/todos"; // 실제 모듈 경로로 수정하세요

jest.mock("../api/todos", () => ({
    _getTodo: (path: string) => {
      return Promise.resolve(dummyData);
    },
  }));

test("renders list of tasks", async () => {
  // _getTodo 함수를 mockResolvedValue 또는 mockImplementation을 사용하여 더미 데이터 반환하도록 설정
  todosApi._getTodo("running");

  render(
    <MemoryRouter>
      <Contents path="running" />
    </MemoryRouter>
  );

  // Wait for the component to render with dummy data
  screen.findByText("Dummy Task 1");
    screen.findByText("Dummy Task 2");

});




// Add more test cases as needed
