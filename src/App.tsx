import React from "react";

import MyRequests from "./components/myRequests/MyRequests";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewRequestDetails from "./components/viewRequestDetails/ViewRequestDetails";
import EditRequetsDetails from "./components/editRequetsDetails/EditRequetsDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyRequests />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route
          path="/end-user/view-request-details"
          element={<ViewRequestDetails />}
        />
        <Route
          path="/end-user/edit-request-details"
          element={<EditRequetsDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
