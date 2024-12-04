import * as Yup from 'yup';

export const settingsValidationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Invalid email address'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[\d\s+-]+$/, 'Invalid phone number'),
  currentPassword: Yup.string()
    .nullable()
    .min(6, 'Password must be at least 6 characters'),
  newPassword: Yup.string()
    .nullable()
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  notifications: Yup.object({
    orderUpdates: Yup.boolean(),
    promotionalEmails: Yup.boolean(),
  }),
  privacy: Yup.object({
    activityRecommendations: Yup.boolean(),
  }),
});
