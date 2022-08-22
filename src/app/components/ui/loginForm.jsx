import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn, getAuthError } from "../../store/users";

const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({ email: "", password: "" });
    const loginError = useSelector(getAuthError());
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => { validate(); }, [data]);

    const validateConfig = {
        email: {
            isRequired: { message: "Email is required" },
            isEmail: { message: "Email entered incorrectly" }
        },
        password: {
            isRequired: { message: "Password is required" },
            containCapitalCharacter: { message: "Password must contain at least one capital letter" },
            containDigit: { message: "Password must contain at least one number" },
            min: { message: "Password must be at least 8 characters", value: 8 }
        }
    };

    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) return;
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(signIn({ payload: data, redirect }));
    };

    const isValid = Object.keys(errors).length === 0;
    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="E-mail"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />                
                {loginError && <p className="text-danger">{loginError}</p>}
                <button disabled={!isValid} className="btn btn-primary w-100 mb-4">Login</button>
            </form>
        </>
    );
};
export default LoginForm;