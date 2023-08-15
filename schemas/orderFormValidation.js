import * as yup from 'yup';

export const orderFormValidation = yup.object().shape({
    name: yup.string().required(),
    phoneNumber: yup.string().min(10).max(10).required(),
    email: yup.string().email(),
    additionalInfo: yup.string(),
});
