/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
// redux
import { getAllCategories } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { createNewProduct, getAllProductsParent, getProductParentDetail } from 'redux/product/productSlice';
// interface
import { ListParams, Params } from 'common/@types';
import { Color } from 'common/enums';
import { CategoryType, ProductSizeEnum, ProductToCreate, ProductToCreateParams, ProductTypeEnum } from 'common/models';
//
import { LoadingScreen, Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import { ProductForm } from 'sections/product';

function CreateProductPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaProduct } = useValidationForm();

  const { categories } = useAppSelector((state) => state.category);
  const { productParent, productsParent, isLoading } = useAppSelector((state) => state.product);

  const createProductForm = useForm<ProductToCreate>({
    defaultValues: { name: '' },
    resolver: yupResolver(schemaProduct),
  });

  const { handleSubmit, watch, reset } = createProductForm;

  const type = watch('type');
  const name = watch('name');
  const code = watch('code');
  const image = watch('image');
  const size = watch('size');
  const description = watch('description');
  const displayOrder = watch('displayOrder');
  const historicalPrice = watch('historicalPrice');
  const sellingPrice = watch('sellingPrice');
  const discountPrice = watch('discountPrice');
  const parentProductId = watch('parentProductId');
  const categoryId = watch('categoryId');

  // get product parent detail
  const params = useMemo(() => {
    return {
      productId: parentProductId,
      navigate,
    };
  }, [parentProductId, navigate]);

  useEffect(() => {
    if (
      type === ProductTypeEnum.CHILD &&
      parentProductId !== undefined &&
      parentProductId !== 0 &&
      parentProductId.toString() !== ''
    ) {
      dispatch(getProductParentDetail(params));
    }
  }, [params]);

  // get category to select from
  const paramsCategory: ListParams = useMemo(() => {
    return {
      optionParams: {
        type: type === ProductTypeEnum.EXTRA ? CategoryType.EXTRA : CategoryType.NORMAL,
        isGetAll: true,
      },
      navigate,
    };
  }, [type]);

  // get product parent to select from
  const paramsProduct: ListParams = useMemo(() => {
    return {
      optionParams: {
        type: ProductTypeEnum.PARENT,
        isGetAll: true,
      },
      navigate,
    };
  }, [type]);

  // get product parent and category to select from
  useEffect(() => {
    if (type === ProductTypeEnum.CHILD && type !== undefined) {
      dispatch<any>(getAllProductsParent(paramsProduct));
    }
    if (type !== ProductTypeEnum.CHILD && type !== undefined && type !== '') {
      dispatch<any>(getAllCategories(paramsCategory));
    }
  }, [type, name, parentProductId]);

  //set image
  useEffect(() => {
    reset({
      name: name,
      type: type,
      code: code,
      image: image,
      description: description,
      displayOrder: displayOrder,
      parentProductId: parentProductId,
      historicalPrice: historicalPrice,
      sellingPrice: sellingPrice,
      discountPrice: discountPrice,
      size: size,
      categoryId: categoryId,
    });
  }, [image]);

  //for set name of product child
  useEffect(() => {
    if (type === ProductTypeEnum.CHILD && type !== undefined && productParent?.name !== undefined) {
      console.log('type', type);
      reset({
        name: `${productParent?.name === undefined ? 'Tên sản phẩm cha' : productParent.name} - Size ${size}`,
        type: type,
        code: code,
        image: image,
        description: description,
        displayOrder: displayOrder,
        parentProductId: parentProductId,
        historicalPrice: historicalPrice,
        sellingPrice: sellingPrice,
        discountPrice: discountPrice,
        size: size,
        categoryId: 0,
      });
    }
  }, [parentProductId, productParent, size]);

  const resetForm = async (type: string) => {
    let initialValues = {};
    if (type === ProductTypeEnum.SINGLE) {
      initialValues = {
        type: type,
        name: '',
        code: code,
        image: image,
        description: description,
        displayOrder: displayOrder,
        parentProductId: 0,
        historicalPrice: '',
        sellingPrice: '',
        discountPrice: '',
        size: ProductSizeEnum.MEDIUM,
        categoryId: '',
      };
    }

    if (type === ProductTypeEnum.PARENT) {
      initialValues = {
        type: type,
        name: '',
        code: code,
        image: image,
        description: description,
        displayOrder: displayOrder,
        parentProductId: 0,
        historicalPrice: 0,
        sellingPrice: 0,
        discountPrice: 0,
        size: ProductSizeEnum.MEDIUM,
        categoryId: '',
      };
    }

    if (type === ProductTypeEnum.CHILD) {
      initialValues = {
        type: type,
        code: code,
        image: image,
        description: description,
        displayOrder: displayOrder,
        name: `Tên sản phẩm cha - Size`,
        historicalPrice: '',
        sellingPrice: '',
        discountPrice: '',
        categoryId: 0,
        parentProductId: '',
        size: '',
      };
    }

    if (type === ProductTypeEnum.EXTRA) {
      initialValues = {
        type: type,
        name: '',
        code: code,
        image: image,
        description: description,
        displayOrder: displayOrder,
        historicalPrice: '',
        sellingPrice: '',
        discountPrice: '',
        categoryId: '',
        parentProductId: 0,
        size: ProductSizeEnum.MEDIUM,
      };
    }

    reset(initialValues);
  };

  useEffect(() => {
    resetForm(type);
  }, [type]);

  const onSubmit = async (values: ProductToCreate) => {
    const data = { ...values };
    const paramsCreate: Params<ProductToCreateParams> = {
      data: {
        ...data,
        size:
          type === ProductTypeEnum.PARENT || type === ProductTypeEnum.SINGLE || type === ProductTypeEnum.EXTRA
            ? ''
            : data.size,
        parentProductId:
          type === ProductTypeEnum.PARENT || type === ProductTypeEnum.SINGLE || type === ProductTypeEnum.EXTRA
            ? ''
            : data.parentProductId,
        historicalPrice: type === ProductTypeEnum.PARENT ? '' : data.historicalPrice,
        sellingPrice: type === ProductTypeEnum.PARENT ? '' : data.sellingPrice,
        discountPrice: type === ProductTypeEnum.PARENT ? '' : data.discountPrice,
        categoryId: type === ProductTypeEnum.CHILD ? '' : data.categoryId,
      },
      navigate,
    };
    dispatch(createNewProduct(paramsCreate));
  };

  return (
    <>
      {isLoading && (
        <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
          <LoadingScreen />
        </Box>
      )}

      <Page
        containerWidth="xl"
        title={translate('page.title.create', { model: translate('model.lowercase.product') })}
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
      >
        <FormProvider {...createProductForm}>
          <Card sx={{ p: 3 }}>
            <ProductForm productsParent={productsParent} categories={categories} />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit" onClick={() => navigate(PATH_BRAND_APP.product.list)}>
              {translate('button.back')}
            </Button>
            <Stack direction="row" gap={2}>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
                color={Color.PRIMARY}
              >
                {translate('button.create')}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>
    </>
  );
}

export default CreateProductPage;
