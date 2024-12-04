import * as Yup from 'yup';

export const cartValidationSchema = Yup.object({
  quantity: Yup.number()
    .required('Quantity is required')
    .integer('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1'),
  coupon: Yup.string()
    .optional()
    .matches(/SAVE10|SAVE50/, 'Invalid coupon code'),
});
