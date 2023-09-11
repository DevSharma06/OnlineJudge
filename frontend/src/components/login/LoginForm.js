import { useRef, useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useLogin } from "../../hooks/useLogin";

const usernameRegex = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
const isUsernameValid = (value) => value.match(usernameRegex);
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const isEmailValid = (value) => value.match(emailRegex);
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const isPasswordValid = (value) => value.match(passwordRegex);

const LoginForm = (props) => {
  const name = props.name;

  const { signup, error, isLoading } = useSignup();

  const signupUser = async (e, username, email, password) => {
    e.preventDefault();

    await signup(username, email, password);
  };

  const { login, error: loginError, isLoading: loginIsLoading } = useLogin();

  const loginUser = async (e, email, password) => {
    e.preventDefault();

    await login(email, password);
  };

  const [formInputValidity, setFormInputValidity] = useState({
    username: true,
    email: true,
    password: true,
  });

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();

    
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let enteredUsername = ""
    let usernameIsValid = true;
    if (name == "Register") {
      enteredUsername = usernameInputRef.current.value;
      usernameIsValid = isUsernameValid(enteredUsername);
    }
    const emailIsValid = isEmailValid(enteredEmail);
    const passwordIsValid = isPasswordValid(enteredPassword);

    setFormInputValidity({
      username: usernameIsValid,
      email: emailIsValid,
      password: passwordIsValid,
    });

    const isFormValid = usernameIsValid && emailIsValid && passwordIsValid;

    if (!isFormValid) {
      return;
    }

    if (name === "Register") {
      await signupUser(e, enteredUsername, enteredEmail, enteredPassword);
    } else {
      await loginUser(e, enteredEmail, enteredPassword);
    }
  };

  return (
    <div className="login-container">
      <h3>{name}</h3>
      <form className="login">
        {name == "Register" && (
          <div className="username">
            <div className="username-input">
              <label>Username</label>
              <input
                type="username"
                ref={usernameInputRef}
                autoComplete="off"
              />
            </div>
            <div>
              {!formInputValidity.username && (
                <small>
                  Username must be alphanumeric and min 5 characters with _ as
                  special character
                </small>
              )}
            </div>
          </div>
        )}

        <div className="email-input">
          <label>Email</label>
          <input type="email" ref={emailInputRef} autoComplete="off" />
        </div>
        <div>
          {!formInputValidity.email && (
            <small>Please enter a valid email</small>
          )}
        </div>

        <div className="password-input">
          <label>Password</label>
          <input type="password" ref={passwordInputRef} autoComplete="off" />
        </div>
        <div>
          {!formInputValidity.password && (
            <small>
              Password must have at least 8 characters that include at least 1
              lowercase character, 1 uppercase characters, 1 number, and 1
              special character in (!@#$%^&*)
            </small>
          )}
        </div>

        <button onClick={loginHandler} disabled={isLoading || loginIsLoading}>
          {name}
        </button>
        {error && <div className="error">{error}</div>}
        {loginError && <div className="error">{loginError}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
