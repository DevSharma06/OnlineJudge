import { useRef, useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const isEmailValid = (value) => value.match(emailRegex);
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
const isPasswordValid = (value) => value.match(passwordRegex);

const LoginForm = (props) => {
  const name = props.name;

  const { signup, error, isLoading } = useSignup();

  const signupUser = async (e, email, password) => {
    e.preventDefault();

    await signup(email, password);
  };

  const [formInputValidity, setFormInputValidity] = useState({
    email: true,
    password: true,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const emailIsValid = isEmailValid(enteredEmail);
    const passwordIsValid = isPasswordValid(enteredPassword);

    setFormInputValidity({
      email: emailIsValid,
      password: passwordIsValid,
    });

    const isFormValid = emailIsValid && passwordIsValid;

    if (!isFormValid) {
      return;
    }

    if (name === "Register") {
      await signupUser(e, enteredEmail, enteredPassword);
    }
  };

  return (
    <div className="login-container">
      <h3>{name}</h3>
      <form className="login">
        <div className="email-input">
          <label>Email</label>
          <input type="email" ref={emailInputRef} />
        </div>
        <div>
          {!formInputValidity.email && <p>Please enter a valid email</p>}
        </div>

        <div className="password-input">
          <label>Password</label>
          <input type="password" ref={passwordInputRef} />
        </div>
        <div>
          {!formInputValidity.password && (
            <p>Please enter a valid Password (8 - 15 characters long)</p>
          )}
        </div>

        <button onClick={loginHandler} disabled={isLoading}>
          {name}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
