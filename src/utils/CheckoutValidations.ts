import * as Yup from 'yup';

export const checkoutValidationSchema = Yup.object({
  address: Yup.string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters long'),
  paymentMethod: Yup.string()
    .required('Payment method is required')
    .oneOf(['Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'Cash on Delivery'], 'Invalid payment method'),
});
