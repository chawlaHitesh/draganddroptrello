import { SyntheticEvent, useState } from "react";
import { loginform } from "./types";

const Login = () => {
  const [loginDetail, setloginDetail] = useState<loginform>({
    email: "",
    password: "",
  });
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };
  console.log(loginDetail, setloginDetail);
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="please enter your email" />
        <input type="text" placeholder="please enter your password" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
