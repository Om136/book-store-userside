/* eslint-disable no-unused-vars */
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Books from "./pages/Books.jsx";
import Buy from "./pages/Buy.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import OrdersList from "./pages/OrderList.jsx";

function App() {
  return (
    <div className=" flex-col h-[100vh]  justify-center bg-[#242a2e] text-[#ececec]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Books />} />
            <Route path="/books" element={<Books />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/buy/:id" element={<Buy />} />
            <Route path="/orders" element={<OrdersList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
