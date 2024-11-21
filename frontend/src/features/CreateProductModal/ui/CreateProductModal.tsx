'use client';

import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';

import cls from './CreateProductModal.module.scss';

import { useCreateProduct } from '@/entities/Product/api/useCreateProduct';
import { productSchema } from '@/entities/Product/model/schema/productSchema';
import { Spinner } from '@/shared/ui/Spinner';
import { TextField } from '@/shared/ui/TextField';

export const CreateProductModal = ({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element | null => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [article, setArticle] = useState('');
  const [errorText, setErrorText] = useState('');

  const { createProduct, isPending } = useCreateProduct();

  const handleConfirm = useCallback(async () => {
    setErrorText('');

    try {
      const product = { title, description, price: parseFloat(price || '0'), discount: parseFloat(discount || '0'), article };

      productSchema.parse(product);

      await createProduct({ title, description, price: parseFloat(price), discount: parseFloat(discount), article });

      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorText(error.errors.map(e => e.message).join('; '));
      } else {
        setErrorText('Произошла ошибка при создании продукта.');
      }
    }
  }, [article, createProduct, description, discount, onClose, price, title]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ handleConfirm ]);

  return (
    <div className={cls.CreateProductModal}>
      <button className={cls.closeBtn} onClick={onClose} />
      <TextField
        value={title}
        onChange={setTitle}
        placeholder='Введите наименование'
        className={cls.field}
      />
      <TextField
        type='number'
        value={price}
        onChange={setPrice}
        placeholder='Введите цену'
        className={cls.field}
      />
      <TextField
        type='number'
        value={discount}
        onChange={setDiscount}
        placeholder='Введите скидку'
        className={cls.field}
      />
      <TextField
        value={description}
        onChange={setDescription}
        placeholder='Введите описание'
        className={cls.field}
      />
      <TextField
        value={article}
        onChange={setArticle}
        placeholder='Введите артикул'
        className={cls.field}
      />
      <div className={cls.errorText}>{errorText}</div>
      {isPending ? (
        <Spinner className={cls.spinner} />
      ) : (
        <button className={cls.button} onClick={handleConfirm}>
          Создать продукт
        </button>
      )}
    </div>
  );
};
