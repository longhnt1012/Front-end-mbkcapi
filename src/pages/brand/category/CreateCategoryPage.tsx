/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
// redux
import { createNewCategory, getCategoryDetail, updateCategory } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
// section
import { CategoryForm } from 'sections/category';
//
import { Params } from 'common/@types';
import { CategoryToCreate, CategoryToUpdate, CategoryType } from 'common/models';
import { Color, Status } from 'common/enums';
import { LoadingScreen, Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

function CreateCategoryPage() {
  const { id: categoryId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaCategory } = useValidationForm();

  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isEditing, isLoading, categoryType, category } = useAppSelector((state) => state.category);

  const createCategoryForm = useForm<CategoryToCreate>({
    defaultValues: {
      name: '',
      code: '',
      type: categoryType === CategoryType.NORMAL ? CategoryType.NORMAL : CategoryType.EXTRA,
      displayOrder: 0,
      description: '',
      imageUrl: '',
    },
    resolver: yupResolver(schemaCategory),
  });

  const { handleSubmit, reset, setValue } = createCategoryForm;

  const paramsDetail = useMemo(() => {
    return {
      categoryId,
      navigate,
    };
  }, [categoryId, navigate]);

  useEffect(() => {
    if (category !== null && isEditing === true) {
      setValue('name', category?.name);
      setValue('code', category?.code);
      setValue('type', categoryType === CategoryType.NORMAL ? CategoryType.NORMAL : CategoryType.EXTRA);
      setValue('displayOrder', category?.displayOrder);
      setValue('description', category?.description);
      setValue('imageUrl', category?.imageUrl);
    }
  }, [category]);

  useEffect(() => {
    if (isEditing) {
      dispatch(getCategoryDetail(paramsDetail));
    }
  }, [dispatch, navigate, paramsDetail]);

  const onSubmit = async (values: CategoryToCreate) => {
    const data = { ...values };

    if (isEditing) {
      const paramUpdate: Params<CategoryToUpdate> = {
        data: {
          name: data.name,
          code: data.code,
          displayOrder: data.displayOrder,
          imageUrl: typeof values.imageUrl === 'string' ? '' : data.imageUrl,
          description: data.description,
          status: category?.status === Status.ACTIVE ? Status.ACTIVE : Status.INACTIVE,
        },
        idParams: {
          categoryId: category?.categoryId,
        },
        optionParams: {
          type: category?.type,
        },
        pathname: pathnameToBack,
        navigate,
      };
      dispatch(updateCategory(paramUpdate));
    } else {
      const paramCreate: Params<CategoryToCreate> = {
        data: { ...data, brandId: 1 },
        navigate,
      };
      dispatch(createNewCategory(paramCreate));
    }
  };

  return (
    <>
      {isLoading && (
        <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
          <LoadingScreen />
        </Box>
      )}

      <Page
        title={
          isEditing
            ? translate('page.title.update', {
                model:
                  categoryType === CategoryType.NORMAL
                    ? translate('model.lowercase.category')
                    : translate('model.lowercase.extraCategory'),
              })
            : translate('page.title.create', {
                model:
                  categoryType === CategoryType.NORMAL
                    ? translate('model.lowercase.category')
                    : translate('model.lowercase.extraCategory'),
              })
        }
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
      >
        <FormProvider {...createCategoryForm}>
          <Card sx={{ p: 3 }}>
            <CategoryForm />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit" onClick={() => navigate(pathnameToBack)}>
              {translate('button.back')}
            </Button>
            <Stack direction="row" gap={2}>
              {isEditing && (
                <Button
                  variant="contained"
                  color="inherit"
                  disabled={isLoading}
                  onClick={() => {
                    reset({
                      name: category?.name,
                      code: category?.code,
                      type: categoryType === CategoryType.NORMAL ? CategoryType.NORMAL : CategoryType.EXTRA,
                      displayOrder: category?.displayOrder,
                      description: category?.description,
                      imageUrl: category?.imageUrl,
                    });
                  }}
                >
                  {translate('button.reset')}
                </Button>
              )}
              <Button
                disabled={isLoading}
                variant="contained"
                color={isEditing ? Color.WARNING : Color.PRIMARY}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                {isEditing ? translate('button.update') : translate('button.create')}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>
    </>
  );
}

export default CreateCategoryPage;
