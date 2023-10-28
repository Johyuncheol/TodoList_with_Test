const { v4 } = require("uuid"); // UUID

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const fs = require("fs");
const cors = require("cors");

// Body Parser 미들웨어를 추가
app.use(bodyParser.json());

// CORS 미들웨어를 사용하여 모든 도메인에서의 요청을 허용
app.use(cors());

// 미들웨어 함수: 요청 로그를 출력하는 미들웨어
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// running 요소 get 응답
app.get("/todos/running", (req, res) => {
  const dbData = JSON.parse(fs.readFileSync("db.json"));
  console.log(dbData.todos.running);
  res.json(dbData.todos.running);
});

// done 요소 get 응답
app.get("/todos/done", (req, res) => {
  const dbData = JSON.parse(fs.readFileSync("db.json"));
  console.log(dbData.todos.done);
  res.json(dbData.todos.done);
});

app.get("/list/detail", (req, res) => {
  console.log(1);
  console.log(req.query.id);
  console.log(req.query.state);

  //state: false => running
  //state: true => done
  const dbData = JSON.parse(fs.readFileSync("db.json"));

  let resData;
  //id 같은값 찾기
  if (req.query.state === "true") {
    resData = dbData.todos.done.filter((item) => item.id === req.query.id);
  } else {
    resData = dbData.todos.running.filter((item) => item.id === req.query.id);
  }
  console.log(resData[0]);
  res.status(200).json(resData[0]);
});

app.post("/todos", (req, res) => {
  let newTodo = req.body;
  const dbData = JSON.parse(fs.readFileSync("db.json"));

  newTodo = { ...newTodo, id: v4() };

  // "todos"에 새로운 데이터 추가
  dbData.todos.running.push(newTodo);
  // db.json 파일에 새로운 데이터 저장
  fs.writeFileSync("db.json", JSON.stringify(dbData, null, 2));

  res.json(newTodo);
});

app.post("/todos/del", (req, res) => {
  const id = req.body.id;
  const state = req.body.state;

  const dbData = JSON.parse(fs.readFileSync("db.json"));

  if (state) {
    // id값이 같은 데이터 찾기
    const findItem = dbData.todos.done.find((item) => item.id === id);

    if (findItem) {
      // done에서 삭제
      const findItemIndex = dbData.todos.done.indexOf(findItem);
      dbData.todos.done.splice(findItemIndex, 1);

      fs.writeFileSync("db.json", JSON.stringify(dbData, null, 2));

      res.status(200).json({ message: "삭제완료", data: findItem });
    } else {
      res.status(404).json({ error: "찾으시는 데이터가 완료에 없습니다" });
    }
  } else {
    // id값이 같은 데이터 찾기
    const findItem = dbData.todos.running.find((item) => item.id === id);
    if (findItem) {
      // running에서 삭제
      const findItemIndex = dbData.todos.running.indexOf(findItem);
      dbData.todos.running.splice(findItemIndex, 1);

      fs.writeFileSync("db.json", JSON.stringify(dbData, null, 2));

      res.status(200).json({ message: "삭제완료'", data: findItem });
    } else {
      res.status(404).json({ error: "찾으시는 데이터가 진행 중에 없습니다" });
    }
  }
});

app.post("/todos/change", (req, res) => {
  const Todo = req.body.Todo;
  const newState = req.body.newState;
  console.log(Todo, newState);
  try {
    let dbData = JSON.parse(fs.readFileSync("db.json"));

    if (Todo.state) {
      // id값이 같은 데이터 찾기
      const findItem = dbData.todos.done.find((item) => item.id === Todo.id);
      console.log(Todo.id);
      if (findItem) {
        //입력된 값으로 변경해준다
        const updatedItem = { ...findItem, ...Todo };
        console.log("ew" + newState);
        const findItemIndex = dbData.todos.done.indexOf(findItem);
        // 상태가 변했다면
        if (Todo.state !== newState) {
          // done에서 삭제
          dbData.todos.done.splice(findItemIndex, 1);

          // running 추가
          updatedItem.state = newState;
          console.log(newState);
          dbData.todos.running.push(updatedItem);
        } else {
          dbData.todos.done[findItemIndex] = {
            ...dbData.todos.done[findItemIndex],
            ...updatedItem,
          };
        }

        fs.writeFileSync("db.json", JSON.stringify(dbData, null, 2));

        res.status(200).json({ message: "변경완료", data: findItem });
      } else {
        res.status(404).json({ error: "찾으시는 데이터가 완료에 없습니다" });
      }
    } else {
      // id값이 같은 데이터 찾기
      const findItem = dbData.todos.running.find((item) => item.id === Todo.id);
      if (findItem) {
        //입력된 값으로 변경해준다
        const updatedItem = { ...findItem, ...Todo };
        console.log("ew" + newState);

        const findItemIndex = dbData.todos.running.indexOf(findItem);
        // 상태가 변했다면
        if (Todo.state !== newState) {
          // running에서 삭제
          console.log(123);
          const findItemIndex = dbData.todos.running.indexOf(findItem);
          dbData.todos.running.splice(findItemIndex, 1);
          // done에 추가
          updatedItem.state = newState;
          dbData.todos.done.push(updatedItem);
        } else {
          dbData.todos.running[findItemIndex] = {
            ...dbData.todos.running[findItemIndex],
            ...updatedItem,
          };
        }

        fs.writeFileSync("db.json", JSON.stringify(dbData, null, 2));

        res.status(200).json({ message: "변경완료'", data: findItem });
      } else {
        res.status(404).json({ error: "찾으시는 데이터가 진행 중에 없습니다" });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Express.js server is running on port ${port}`);
});
