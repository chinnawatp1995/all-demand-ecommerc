import * as yup from "yup";

export const logInWithEmailFormValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

export const logInWithEmailFormInitialValues = {
    email: '',
    password: '',
};

export const logInWithPhoneNumberFormValidation = yup.object().shape({
    phoneNumber: yup.string().min(10).max(10).required(),
});

export const logInWithPhoneNumberFormInitialValues = {
    phoneNumber: '',
};