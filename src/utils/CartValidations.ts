import * as Yup from 'yup';

export const cartValidationSchema = Yup.object({
  coupon: Yup.string()
    .nullable() 
    .matches(/SAVE10|SAVE50/, {
      excludeEmptyString: true,
      message: 'Invalid coupon code',
    }),
});
