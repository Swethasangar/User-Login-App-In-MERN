import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/ContextProvider";
import axios from "axios";

const SignUp = () => {
  const { user, setUser, err, setErr } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick =()=>{
    setErr("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(user);

    if (!user.email || !user.password) {
      setErr("Please fill in all fields");
      return;
    }

    const url = `http://localhost:5000/signup`;

    try {
      const response = await axios.post(url, user);
      // console.log(response);

      if (response.status === 201) {
        setErr("");
        navigate("/");
      }
    } catch (error) {
      const errmsg =
        error.response.data.message ;
      // console.log(errmsg);
      setErr(errmsg);
    }
    // console.log("hi", response.data.message);
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-35 h-500 rounded-lg box">
        <h1 className="text-2xl font-medium mt-2 mr-3">Sign Up</h1>
        <form className="mr-5 md:mr-16" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="flex w-64 md:w-72 border-bottom items-center ml-5 mt-10 p-1 md:ml-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 md:w-7 h-7 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>

            <input
              type="text"
              placeholder="Email ID"
              className="focus:outline-none w-72 bg-transparent placeholder-black text-base md:text-lg"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            ></input>
          </div>

          {/* Password Input */}
          <div className="flex w-64 md:w-72 ml-5 border-bottom items-center md:ml-16 mt-9 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 md:w-7 h-7 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>

            <input
              type="password"
              placeholder="Password"
              className="focus:outline-none w-72 bg-transparent placeholder-black md:text-lg"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            ></input>
          </div>

          {/* Login Button */}
          <div className="flex justify-center items-center mt-8">
            <button className="mt-3 border border-black w-60 px-1 py-1 rounded-xl md:ml-10 font-medium hover:border-fuchsia-600">
              Sign Up
            </button>
          </div>
        </form>

        {/* Error */}
        {err && (
          <div className="text-red-800 text-center mt-5 ml-2 md:ml-10 ">
            {err}
          </div>
        )}

        {/*SignUp Link */}
        <p className="mr-5 mt-7 ml-7 md:text-lg">
          Have an account?
          <Link to="/" className="hover:text-fuchsia-700" onClick={handleClick}>
            {" "}
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
};
export default SignUp;
