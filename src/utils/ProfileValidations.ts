import * as Yup from 'yup';

export const profileValidationSchema = Yup.object({
  phone: Yup.string()
    .nullable()
    .matches(/^[\d\s+-]+$/, 'Invalid phone number'),
  newPassword: Yup.string()
    .nullable()
    .min(6, 'Password must be at least 6 characters'),
  confirmNewPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  address: Yup.string()
    .nullable()
    .min(10, 'Address must be at least 10 characters long'),
});
