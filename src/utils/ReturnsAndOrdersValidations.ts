import * as Yup from 'yup';

export const orderValidationSchema = Yup.object({
  id: Yup.number().required('Order ID is required'),
  status: Yup.string()
    .required('Status is required')
    .oneOf(['Delivered', 'Canceled', 'Processing'], 'Invalid status'),
  total: Yup.number()
    .required('Total is required')
    .positive('Total must be a positive number'),
  items: Yup.array().of(
    Yup.object({
      id: Yup.number().required('Item ID is required'),
      name: Yup.string().required('Item name is required'),
      image: Yup.string().url('Invalid image URL').required('Image URL is required'),
      quantity: Yup.number()
        .required('Quantity is required')
        .integer('Quantity must be an integer')
        .min(1, 'Quantity must be at least 1'),
      price: Yup.number()
        .required('Price is required')
        .positive('Price must be a positive number'),
    })
  ),
});
