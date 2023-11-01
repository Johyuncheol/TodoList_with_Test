import { BASE_URL } from "./const";
import axios, { AxiosRequestConfig } from "axios";

export interface AddRequest {
  title: string;
  detail: string;
  startDate: string;
  endDate: string;
  state?: boolean;
}

const axiosClient = async (url: string, options: AxiosRequestConfig) => {
  return axios(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
};

export const _addTodo = async (args: AddRequest) => {
  console.log(123)
  try {
    //상태를 추가해 줌
    args = { ...args, state: false };
    const addRes = await axiosClient(`${BASE_URL}/todos`, {
      method: "POST",
      data: JSON.stringify(args),
    });

    return true;
  } catch (error) {
    console.log("Error :", error);

    return false;
  }
};

export const _getTodo = async (path: string) => {
  try {
    const getRes = await axiosClient(`${BASE_URL}/todos/${path}`, {
      method: "get",
    });

    return getRes.data;
  } catch (error) {
    console.log("Error :", error);

    return false;
  }
};

export const _getDetail = async (path: string, state: string) => {
  try {
    const getRes = await axiosClient(
      `${BASE_URL}/list/detail?id=${path}&state=${state}`,
      {
        method: "get",
      }
    );
    console.log(getRes);
    return getRes.data;
  } catch (error) {
    console.log("Error :", error);

    return false;
  }
};
interface _changeTodoData {
  id: string;
  detail: string;
  state: boolean;
  endDate: string;
  startDate: string;
  title: string;
}
export const _changeTodo = async (Todo: _changeTodoData, newState: boolean) => {
  console.log(newState);
  try {
    console.log(Todo);
    const getRes = await axiosClient(`${BASE_URL}/todos/change`, {
      method: "post",
      data: { Todo: Todo, newState: newState },
    });
    console.log(getRes);
    return getRes.status;
  } catch (error) {
    console.log("Error :", error);

    return false;
  }
};

export const _delTodo = async (id: string, state: boolean) => {
  try {
    const getRes = await axiosClient(`${BASE_URL}/todos/del`, {
      method: "post",
      data: { id: id, state: state },
    });
    console.log(getRes);
    return getRes.status;
  } catch (error) {
    console.log("Error :", error);

    return false;
  }
};
