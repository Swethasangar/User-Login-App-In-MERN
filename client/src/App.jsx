import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/index";
import InvalidPage from "./components/Invalid Page/index";
import SignUp from "./components/Signup/index";
import Home from "./components/Home/index"
import AuthContextProvider from "./components/context/ContextProvider";

function App() {
  return (
    <>
     <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<InvalidPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
