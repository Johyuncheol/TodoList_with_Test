# TodoList_with_Test
개발 과정 : https://johc.tistory.com/119
클라이언트 : React.js 
언어 : TypeScripts




서버: node express
언어 : javaScripts
서버시작 : node app 

API 명세는 아래와 같습니다 

| API | URI | res | req | 비고 |
| --- | --- | --- | --- | --- |
| 진행 중 GET | /todos/running | \[{     id:string,     detail:string,     startDate:string,     endDate:string,     title:string,     state:boolean   },   {}   \] |   |   |
| 완료 GET | /todos/done | \[{     id:string,     detail:string,     startDate:string,     endDate:string,     title:string,     state:boolean   },   {}   \] |   |   |
| todo 세부 GET | /list/detail/?id=${}&state=${} | 성공시 : status(200), {     id:string,     detail:string,     startDate:string,     endDate:string,     title:string,     state:boolean   }         실패시: status(404),{errror: "찾으시는 데이터가 없습니다"} | querystring:{   id:string,   state:boolean   } | 이것만 쿼리스트링으로 만들어서 다시 body에 담아서 보내는걸로 변경하겠습니다 |
| Todo추가  POST | /todos | 성공시 : status(200),{   message: 등록 완료   }         실패시: status(404),{errror: "등록 실패"} | body:{     id:string,     detail:string,     startDate:string,     endDate:string,     title:string,     state:boolean   } |   |
| Todo 삭제 POST  | /todos/del | 성공시 : status(200),{   message: 삭제완료   }         실패시: status(404),{errror: "찾으시는데이터가 완료/삭제에 없습니다"} | body:{   id:string,   state:boolean   } |   |
| Todo 변경 POST  | /todos/change | 성공시 : status(200),{   message: 변경완료   }         실패시: status(404),{errror: "찾으시는데이터가 완료/삭제에 없습니다"} | body:\[   Todo:{     id:string,     detail:string,     startDate:string,     endDate:string,     title:string,     state:boolean   },   newState:boolean   \] |   |

