import * as Yup from 'yup';

export const cartItemValidationSchema = Yup.object({
  id: Yup.number().required('Item ID is required'),
  name: Yup.string().required('Item name is required'),
  image: Yup.string().url('Invalid image URL').required('Image URL is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be a positive number'),
  quantity: Yup.number()
    .required('Quantity is required')
    .integer('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1'),
});
