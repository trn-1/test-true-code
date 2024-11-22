'use client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import cls from './ProductCard.module.scss';

import { productApi } from '../api/productApi';
import { useDeleteProduct } from '../api/useDeleteProduct';
import { useUpdateProduct } from '../api/useUpdateProduct';
import { Product } from '../model/types/product';

import { BASE_URL } from '@/shared/api/apiInstance';
import { classNames, formatNumberToTriads } from '@/shared/lib';
import { clearNumber } from '@/shared/lib/clearNumber';
import { Spinner } from '@/shared/ui/Spinner';
import { TextField } from '@/shared/ui/TextField';

interface ProductCardProps {
  id: Product['id'];
  className?: string;
}

interface IField {
  id?: keyof Product;
  name: string;
  value?: string | number;
  postfix?: string;
  canChange?: boolean;
}

export const ProductCard = (props: ProductCardProps): JSX.Element => {
  const { id, className } = props;

  const router = useRouter();

  const { data, isPending, refetch } = useQuery(productApi.getProduct(id));
  const { updateProduct } = useUpdateProduct();
  const { deleteProduct, isPending: isDeletePending } = useDeleteProduct();

  const [editMode, setEditMode] = useState(false);
  const [product, setProduct] = useState<Product>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [ data ]);

  if (isPending || isDeletePending || !product) {
    return (
      <Spinner className={cls.spinner}/>
    );
  }

  if (!data) {
    notFound();
  }

  const handleChangeProduct = (id: keyof Product, value: string) => {
    if (!product) {
      return;
    }

    let newValue;

    if (typeof data[id] === 'number') {
      newValue = clearNumber(value) || 0;
    }  else {
      newValue = value;
    }

    setProduct({ ...product, [id]: newValue });
  };

  const handleCancelChange = () => {
    setProduct(data);
    setEditMode(false);
  };

  const handleSaveBtnClick = () => {
    if (editMode) {
      updateProduct(product);
      setEditMode(!editMode);
    } else {
      setEditMode(!editMode);
    }
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(id);
    router.push('/catalog?page=1');
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    } else {
      setSelectedImage(null);
    }
  };

  const handleLoadPhoto = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedImage) return;

    const formData = new FormData();

    formData.append('file', selectedImage);

    await fetch(`${BASE_URL}/files/${data.id}`, {
      method: 'POST',
      body: formData,
    });

    refetch();
  };

  const handleDeletePhoto = () => {
    updateProduct({ id, photoPath: '' });
  };

  const fields: IField[] = [
    {
      id: 'title',
      name: 'Наименование',
      value: product['title'],
      canChange: true,
    },
    {
      id: 'price',
      name: product['discount'] ? 'Цена без скидки' : 'Цена',
      value: formatNumberToTriads(product['price']),
      postfix: 'руб.',
      canChange: true
    },
    {
      id: 'discount',
      name: 'Скидка',
      value: product['discount'] && formatNumberToTriads(product['discount']),
      postfix: 'руб.',
      canChange: true
    },
    {
      name: 'Цена со скидкой',
      value: product['discount']
        ? formatNumberToTriads(clearNumber(product['price']) - clearNumber(product['discount']))
        : 0,
      postfix: 'руб.'
    },
    {
      id: 'article',
      name: 'Артикул',
      value: product['article'],
    },
    {
      id: 'description',
      name: 'Описание',
      value: product['description'],
      canChange: true
    },
  ];

  const renderField = (field: IField) => {
    const { name, postfix, value } = field;

    return (
      <p className={cls.field}>
        <span className={cls.field__name}>
          {name}
        </span>
        <span className={cls.field__value}>
          {value}
          {postfix && ` ${postfix}`}
        </span>
      </p>
    );
  };

  const renderEditModeField = (field: IField) => {
    const { name, value, canChange, id } = field;

    return (
      <p className={cls.field}>
        <span className={cls.field__name}>
          {name}
        </span>
        <span className={cls.field__value}>
          {canChange ?
            <TextField
              value={String(value)}
              onChange={(value) => id && handleChangeProduct(id, value)}
              className={cls.input}
            />
            :
            <>
              {field.value}
              {field.postfix && ` ${field.postfix}`}
            </>
          }
        </span>
      </p>
    );
  };

  return (
    <div>
      <button
        type='button'
        className={cls.backBtn}
        onClick={() => {
          router.back();
        }}
      >
        Вернуться к каталогу
      </button>

      <div className={classNames(cls.ProductCard, {}, [ className ])}>
        <div className={cls.photoWrapper}>
          {
            data.photoPath ? (
              <>
                <Image
                  src={`${process.env.SERVER_HOST_STATIC || 'http://localhost:4000'}/uploads/${data.photoPath}`}
                  alt='фото'
                  className={cls.photo}
                  width={300}
                  height={300}
                />
                <button
                  className={cls.button}
                  onClick={handleDeletePhoto}
                >
                  {
                    data.photoPath
                      ? 'Удалить фото'
                      : 'Загрузить фото'
                  }
                </button>
              </>
            ) : (
              <form
                className={cls.loadPhoto}
                onSubmit={handleLoadPhoto}
              >
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    return handleImageChange(e);
                  }}
                />
                <button
                  className={cls.button}
                  type='submit'
                >
                  {
                    data.photoPath
                      ? 'Удалить фото'
                      : 'Загрузить фото'
                  }
                </button>
              </form>
            )
          }
        </div>

        <div className={cls.infoWrapper}>
          {fields.map(field => editMode ? renderEditModeField(field) : renderField(field))}

          <div className={cls.buttonsWrapper}>
            <div className={cls.buttonsCreate}>
              <button
                type='button'
                className={cls.button}
                onClick={handleSaveBtnClick}
              >
                {editMode ? 'Сохранить' : 'Редактировать'}
              </button>
              {editMode && (
                <button
                  type='button'
                  className={cls.button}
                  onClick={handleCancelChange}
                >
                  Отменить
                </button>
              )}
            </div>
            {!editMode && (
              <button
                type='button'
                className={cls.button}
                onClick={handleDeleteProduct}
              >
                Удалить
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
