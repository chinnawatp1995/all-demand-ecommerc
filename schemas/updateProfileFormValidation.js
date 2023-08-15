import * as yup from "yup";

export const updateProfileFormValidation = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().min(10).max(10).required(),
});

