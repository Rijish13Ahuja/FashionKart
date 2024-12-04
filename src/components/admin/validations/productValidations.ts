import * as Yup from 'yup';

export const productValidationSchema = Yup.object({
  name: Yup.string().required('Product name is required').min(3, 'Name must be at least 3 characters'),
  category: Yup.string().required('Category is required'),
  imageUrl: Yup.string().url('Please enter a valid URL'),
  originalPrice: Yup.number()
    .required('Original price is required')
    .positive('Original price must be a positive number'),
  reducedPrice: Yup.number()
    .required('Reduced price is required')
    .positive('Reduced price must be a positive number')
    .lessThan(Yup.ref('originalPrice'), 'Reduced price must be less than the original price'),
  stock: Yup.number().required('Stock is required').integer('Stock must be an integer').min(1, 'Stock must be at least 1'),
  discount: Yup.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100%'),
});
