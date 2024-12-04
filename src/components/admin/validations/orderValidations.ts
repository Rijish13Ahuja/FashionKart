import * as Yup from 'yup';

export const orderValidationSchema = Yup.object({
  id: Yup.number().required('Order ID is required').integer('Order ID must be an integer'),
  customerName: Yup.string().required('Customer name is required'),
  total: Yup.number().required('Total amount is required').positive('Total must be a positive number'),
  status: Yup.string()
    .required('Status is required')
    .oneOf(['Pending', 'Shipped', 'Delivered', 'Cancelled'], 'Invalid order status'),
});
