import { Link } from "react-router-dom";
const InvalidPage = () => {
  return (
    <>
      <div className="border p-8 flex justify-evenly">
        <Link to="/">Login Form</Link>
        <div>
          <Link to="/">
            <b className="rounded-md px-3 py-1 bg-violet-600 text-white hover:opacity-80">
              {" "}
              Log in
            </b>
          </Link>
          <Link to="/signup">
            <b className="ml-3 rounded-md px-3 py-1 text-violet-600 hover:text-black">
              {" "}
              Sign Up
            </b>
          </Link>
        </div>
      </div>
      <h1 className="font-medium text-2xl text-center mt-4">
        Sorry, this page isn't avaliable.
      </h1>
    </>
  );
};
export default InvalidPage;
