import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(3, 'Наименование обязательно'),
  price: z.number().min(1, 'Укажите цену'),
  article: z.string().min(5, 'Укажите артикул'),
  discount: z.number().optional().refine(value => value === undefined || value >= 0, {
    message: 'Скидка должна быть больше нуля, если указана',
  }),
}).refine(data => data.discount === undefined || data.discount <= data.price, {
  message: 'Скидка не должна превышать цену',
  path: [ 'discount' ],
});
