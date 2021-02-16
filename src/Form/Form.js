import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';



const letter = value => value && /^.*[^A-zА-яЁё].*$/i.test(value) ? 'Only letters' : undefined;

const required = value => value ? undefined : 'Required'

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined

const maxLength15 = maxLength(15)

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(1)

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined

const tooMuch = value =>
    value && value > 1000000 ? 'Too much' : undefined

const aol = value =>
    value && /.+@aol\.com/.test(value) ?
        'Really? You still use AOL for your email?' : undefined

const phoneMask = createTextMask({
    pattern: '+7 (999) 999-9999',
});

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const FieldLevelValidationForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field name="id" type="number"
                   component={renderField} label="id"
                   validate={[ required, number, minValue18 ]}
                   warn={tooMuch}
            />
            <Field name="firstName" type="text"
                   component={renderField} label="firstName"
                   validate={[ required, maxLength15 ]}
                   warn={letter}
            />
            <Field name="lastName" type="text"
                   component={renderField} label="lastName"
                   validate={[ required, maxLength15 ]}
                   warn={letter}
            />
            <Field name="email" type="email"
                   component={renderField} label="Email"
                   validate={[ required, email ]}
                   warn={aol}
            />
            <Field name="phone" type="tel"
                   component={renderField} label="phone"
                   validate={[ required ]}
                   {...phoneMask}
            />
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'fieldLevelValidation' // a unique identifier for this form
})(FieldLevelValidationForm)