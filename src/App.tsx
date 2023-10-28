import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Layout from "./layout/Layout";
import List from "./pages/List";
import Add from "./pages/Add";
import Globalstyles from './globalStyle/GlobalStyle';
import Detail from "./pages/Detail";
function App() {
  return (
    <>
      <Globalstyles />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/list/:id" element={<List />} />
          <Route path="/list/detail" element={<Detail />} />
          <Route path="/add" element={<Add />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
