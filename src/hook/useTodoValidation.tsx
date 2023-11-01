import { useState } from "react";

const useValidation = () => {
  // Todo 입력상태
  const [InputData, setInputData] = useState({
    title: "",
    detail: "",
    startDate: "",
    endDate: "",
    state: false,
  });

  //Todo 유효성결과 메세지
  const [errors, setErrors] = useState({
    title: "제목을 입력하세요.",
    detail: "내용을 입력하세요.",
    startDate: "시작 날짜를 입력하세요.",
    endDate: "끝 날짜를 입력하세요.",
  });

  //Todo 상태 변경함수
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputData({
      ...InputData,
      [name]: value,
    });

    validationHandler(value, name);
  };

  const validationHandler = (value: string, name: string) => {
    //유효성검사 (입력안한 항목이 있는지)
    if (value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} 값이 빈값입니다`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ``,
      }));
    }
  };

  return {
    handleInputChange,
    InputData,
    errors,
  };
};

export default useValidation;
