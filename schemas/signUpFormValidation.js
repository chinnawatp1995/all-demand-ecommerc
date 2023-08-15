import * as yup from 'yup';

export const signUpFormValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});

export const signUpFormInitialValues = {
    email: '',
    password: '',
    confirmPassword: '',
};
