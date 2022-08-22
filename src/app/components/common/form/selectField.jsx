import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, name, onChange, defaultOption, options, error, classNames }) => {
    
    const classes = "form-select" + (error ? " is-invalid " : " ");
    const handleChange = ({ target }) => {
        onChange({ name: name, value: target.value });
    };
    return (
        <div>
            <label htmlFor={name} className="form-label ">{label}</label>
            <select
                className={classes + classNames}
                id={name}
                name={name}
                value={value}
                onChange = {handleChange}
            >
                <option disabled value="">{defaultOption}</option>
                {
                    options && options.map(option =>
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    )
                }
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    defaultOption: PropTypes.string.isRequired,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    classNames: PropTypes.string
};
export default SelectField;
