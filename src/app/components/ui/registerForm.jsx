import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radioField";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        sex: "male",
        contactInfo: ""
    });
   
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
        name: {
            isRequired: { message: "Name is required" },
            min: { message: "Name must be at least 3 characters", value: 3 }
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

    function handleSubmit(event) {
        event.preventDefault();
        if (!validate()) return;  
        dispatch(signUp(data));
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
                    label="Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <TextField
                    label="Contact information"
                    name="contactInfo"
                    value={data.contactInfo}
                    onChange={handleChange}
                />             
                <RadioField
                    options={[
                        { name: "Male", _id: "male" },
                        { name: "Female", _id: "female" },
                        { name: "Other", _id: "other" }
                    ]}
                    onChange={handleChange}
                    value={data.sex}
                    name="sex"
                    label="Choose your gender"
                />              
                <button disabled={!isValid} className="btn btn-primary w-100 mb-4">Отправить</button>
            </form>
        </>
    );
};
export default RegisterForm;
