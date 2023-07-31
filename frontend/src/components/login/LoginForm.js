import { useRef, useState } from "react";

const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const isEmailValid = (value) => value.matches(emailRegex);
const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
const isPasswordValid = (value) => value.matches(passwordRegex);

const LoginForm = (props) => {
    const name = props.name

    const [formInputValidity, setFormInputValidity] = useState({
        email: true,
        password: true,
    });

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const loginHandler = (e) => {
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
    };

    return (
        <div className="login-container">
            <h3>{name}</h3>
            <form className="login">

                <div className="email-input">
                    <label>Email</label>
                    <input type="email" ref={emailInputRef} />
                    {!formInputValidity.email && <p>Please enter a valid email</p>}
                </div>

                <div className="password-input">
                    <label>Password</label>
                    <input type="password" ref={passwordInputRef} />
                    {!formInputValidity.email && <p>Please enter a valid Password (8 - 15 characters long)</p>}
                </div>

                <button onClick={loginHandler}>{name}</button>
            </form>
        </div>
    );
};

export default LoginForm;
