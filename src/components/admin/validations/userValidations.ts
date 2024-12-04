import * as Yup from 'yup';

export const userValidationSchema = Yup.object({
  name: Yup.string().required('User name is required').min(3, 'Name must be at least 3 characters'),
  email: Yup.string().required('Email is required').email('Enter a valid email address'),
  status: Yup.string()
    .required('Status is required')
    .oneOf(['Active', 'Inactive'], 'Status must be either Active or Inactive'),
});
