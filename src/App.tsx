import React from "react";

import MyRequests from "./components/myRequests/MyRequests";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <MyRequests />
    // <Routes>
    //   <Route path="/" element={<MyRequests />} />
    //   <Route path="/my-requests" element={<MyRequests />} />
    // </Routes>
  );
}

export default App;
