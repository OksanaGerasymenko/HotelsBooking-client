import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [typeForm, setTypeForm] = useState(type === "register" ? type : "login");
    const toggleTypeForm = () => {
        setTypeForm((prevState) => prevState === "register" ? "login" : "register");
    };
    return (
        <div className="layout">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow bg-light my-5 p-4">
                        {
                            typeForm === "register"
                                ? (
                                    <>
                                        <h3 className="mb-4 mx-auto w-50">Registration</h3>
                                        <RegisterForm />
                                        <p>Already have an account?&nbsp;
                                            <a
                                                role="button"
                                                onClick={toggleTypeForm}
                                                className="link-primary"
                                            >
                                                SignIn
                                            </a>
                                        </p>
                                    </>
                                )
                                : (
                                    <>
                                        <h3 className="mb-4 mx-auto w-50">Authorization</h3>
                                        <LoginForm />
                                        <p className="text-center">Dont have an account?&nbsp;
                                            <a
                                                className="link-primary"
                                                role="button"
                                                onClick={toggleTypeForm}
                                            >
                                                SignUp
                                            </a>
                                        </p>
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login