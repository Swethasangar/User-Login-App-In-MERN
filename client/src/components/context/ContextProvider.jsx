import { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // console.log(children);
  const [user, setUser] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  return (
    <AuthContext.Provider value={{ user, setUser,err,setErr }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
