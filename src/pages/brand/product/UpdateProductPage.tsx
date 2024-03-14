/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
// redux
import { getAllCategories } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllProductsParent, getProductDetail, updateProduct } from 'redux/product/productSlice';
//
import { ListParams, Params } from 'common/@types';
import { Color, Status } from 'common/enums';
import { CategoryType, ProductSizeEnum, ProductToCreate, ProductToUpdate, ProductTypeEnum } from 'common/models';
import { LoadingScreen, Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import { ProductForm } from 'sections/product';

function UpdateProductPage() {
  const { id: productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaProduct } = useValidationForm();

  const { categories } = useAppSelector((state) => state.category);
  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { product, productParent, productsParent, isEditing, isLoading } = useAppSelector((state) => state.product);

  const createProductForm = useForm<ProductToCreate>({
    defaultValues: {
      name: '',
      code: '',
      description: '',
      historicalPrice: 0,
      sellingPrice: 0,
      discountPrice: 0,
      displayOrder: 0,
      image: '',
      size: '',
      type: '',
      parentProductId: Number(product?.parentProductId),
      categoryId: 0,
    },
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

  // const params = useMemo(() => {
  //   return {
  //     productId: parentProductId,
  //     navigate,
  //   };
  // }, [parentProductId]);

  const paramsEditing = useMemo(() => {
    return {
      productId: productId,
      navigate,
    };
  }, [productId]);

  const paramsCategoryNormal: ListParams = useMemo(() => {
    return {
      optionParams: {
        type: CategoryType.NORMAL,
      },
      navigate,
    };
  }, []);

  const paramsCategoryExtra: ListParams = useMemo(() => {
    return {
      optionParams: {
        type: CategoryType.EXTRA,
      },
      navigate,
    };
  }, [type]);

  const paramsProductParent: ListParams = useMemo(() => {
    return {
      optionParams: {
        type: ProductTypeEnum.PARENT,
        isGetAll: true,
      },
      navigate,
    };
  }, [type]);

  useEffect(() => {
    if (type === ProductTypeEnum.CHILD && type !== undefined) {
      dispatch<any>(getAllProductsParent(paramsProductParent));
    }
    if (type === ProductTypeEnum.EXTRA && type !== undefined) {
      dispatch<any>(getAllCategories(paramsCategoryExtra));
    }
    if (type === ProductTypeEnum.SINGLE || (type === ProductTypeEnum.PARENT && type !== undefined)) {
      dispatch<any>(getAllCategories(paramsCategoryNormal));
    }
  }, [type]);

  // useEffect(() => {
  //   if (type === ProductTypeEnum.CHILD) {
  //     if (parentProductId !== undefined && parentProductId !== 0) {
  //       console.log('get parent product');
  //       dispatch(getProductParentDetail(params));
  //     }
  //   }
  // }, [parentProductId]);

  useEffect(() => {
    if (isEditing) {
      dispatch(getProductDetail(paramsEditing));
    }
  }, [isEditing]);

  //for set product to form
  useEffect(() => {
    reset({
      name: product?.name,
      code: product?.code,
      description: product?.description,
      historicalPrice: product?.historicalPrice,
      sellingPrice: product?.sellingPrice,
      discountPrice: product?.discountPrice,
      displayOrder: product?.displayOrder,
      image: product?.image,
      size: product?.size !== null ? product?.size : ProductSizeEnum.LARGE,
      type: product?.type,
      parentProductId: Number(product?.parentProductId),
      categoryId: product?.categoryId,
    });
  }, [product]);

  //for set name of product child
  useEffect(() => {
    if (product?.type === ProductTypeEnum.CHILD || type === ProductTypeEnum.CHILD) {
      if (productParent?.name !== undefined) {
        // console.log('parentProductId', parentProductId);
        // const sizeChild = product?.name.split(' ').slice(-2).join(' ');
        // console.log(productParent?.name);
        reset({
          // name: `${product?.name === undefined ? 'parent name' : productParent?.name} ${sizeChild}`,
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
      }
    }
  }, [parentProductId, productParent]);

  useEffect(() => {
    if (product !== null && isEditing) {
      if (product?.type === ProductTypeEnum.SINGLE && productParent === null) {
        console.log('SINGLE set');
        reset({
          name: product?.name,
          code: product?.code,
          description: product?.description,
          historicalPrice: product?.historicalPrice,
          sellingPrice: product?.sellingPrice,
          discountPrice: product?.discountPrice,
          displayOrder: product?.displayOrder,
          image: product?.image,
          size: ProductSizeEnum.LARGE,
          type: ProductTypeEnum.SINGLE,
          parentProductId: 0,
          categoryId: product?.categoryId,
        });
      }
      if (product?.type === ProductTypeEnum.PARENT && productParent === null) {
        console.log('PARENT set');
        reset({
          name: product?.name,
          code: product?.code,
          description: product?.description,
          historicalPrice: 0,
          sellingPrice: 0,
          discountPrice: 0,
          displayOrder: product?.displayOrder,
          image: product?.image,
          size: ProductSizeEnum.SMALL,
          type: ProductTypeEnum.PARENT,
          parentProductId: 0,
          categoryId: product?.categoryId,
        });
      }
      if (product?.type === ProductTypeEnum.CHILD) {
        console.log(' CHILD set');
        reset({
          name: product?.name,
          code: product?.code,
          description: product?.description,
          historicalPrice: product?.historicalPrice,
          sellingPrice: product?.sellingPrice,
          discountPrice: product?.discountPrice,
          displayOrder: product?.displayOrder,
          image: product?.image,
          size:
            product?.size === ProductSizeEnum.SMALL
              ? ProductSizeEnum.SMALL
              : product?.size === ProductSizeEnum.MEDIUM
              ? ProductSizeEnum.MEDIUM
              : ProductSizeEnum.LARGE,
          type: ProductTypeEnum.CHILD,
          parentProductId: Number(product?.parentProductId),
          categoryId: 0,
        });
      }
      if (product?.type === ProductTypeEnum.EXTRA && productParent === null) {
        console.log('EXTRA set');
        reset({
          name: product?.name,
          code: product?.code,
          description: product?.description,
          historicalPrice: product?.historicalPrice,
          sellingPrice: product?.sellingPrice,
          discountPrice: product?.discountPrice,
          displayOrder: product?.displayOrder,
          image: product?.image,
          size: ProductSizeEnum.LARGE,
          type: ProductTypeEnum.EXTRA,
          parentProductId: 0,
          categoryId: product?.categoryId,
        });
      }
    }
  }, [product]);

  const onSubmit = async (values: ProductToCreate) => {
    const data = { ...values };
    const paramsCreate: Params<ProductToUpdate> = {
      data: {
        name: type === ProductTypeEnum.CHILD ? '' : data.name,
        image: typeof values.image === 'string' ? '' : data.image,
        description: data.description,
        displayOrder: data.displayOrder,
        historicalPrice: type === ProductTypeEnum.PARENT ? '' : data.historicalPrice,
        sellingPrice: type === ProductTypeEnum.PARENT ? '' : data.sellingPrice,
        discountPrice: type === ProductTypeEnum.PARENT ? '' : data.discountPrice,
        parentProductId:
          type === ProductTypeEnum.PARENT || type === ProductTypeEnum.SINGLE || type === ProductTypeEnum.EXTRA
            ? ''
            : data.parentProductId,

        categoryId: type === ProductTypeEnum.CHILD ? '' : data?.categoryId,
        status: product?.status === Status.ACTIVE ? Status.ACTIVE : Status.INACTIVE,
      },
      idParams: { productId: Number(productId) },
      pathname: pathnameToBack,
      navigate,
    };
    dispatch(updateProduct(paramsCreate));
  };

  return (
    <>
      {isEditing && (
        <>
          {isLoading && (
            <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
              <LoadingScreen />
            </Box>
          )}
        </>
      )}

      <Page
        containerWidth="xl"
        title={translate('page.title.update', { model: translate('model.lowercase.product') })}
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
                variant="contained"
                color="inherit"
                disabled={isLoading}
                onClick={() => {
                  reset({
                    name: product?.name,
                    code: product?.code,
                    description: product?.description,
                    historicalPrice: product?.historicalPrice,
                    sellingPrice: product?.sellingPrice,
                    discountPrice: product?.discountPrice,
                    displayOrder: product?.displayOrder,
                    image: product?.image,
                    size: product?.size ? product?.size : '',
                    type: product?.type,
                    parentProductId: Number(product?.parentProductId),
                    categoryId: product?.categoryId,
                  });
                }}
              >
                {translate('button.reset')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
                color={Color.WARNING}
              >
                {translate('button.update')}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>
    </>
  );
}

export default UpdateProductPage;
