/* eslint-disable react-hooks/exhaustive-deps */
import { useFormContext } from 'react-hook-form';
//
import { Grid, Stack, Typography, InputAdornment } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import {
  Category,
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  Product,
  ProductSizeEnum,
  ProductToCreate,
  ProductTypeEnum,
} from 'common/models';
import { Language } from 'common/enums';
import { AutoCompleteField, InputField, SelectField, UploadImageField } from 'components';
import { useLocales } from 'hooks';

interface ProductFormProps {
  productsParent: Product[];
  categories: Category[];
}

function ProductForm({ productsParent, categories }: ProductFormProps) {
  const { translate, currentLang } = useLocales();

  const { isEditing } = useAppSelector((state) => state.product);

  const { watch } = useFormContext<ProductToCreate>();

  const productType = watch('type');

  const categoriesOptions = categories.map((category) => ({
    label: category.name,
    value: category.categoryId,
  }));

  const getOpObjCategory = (option: any) => {
    if (!option) return option;
    if (!option.value) return categoriesOptions.find((opt) => opt.value === option);
    return option;
  };

  const productsOptions = productsParent.map((product) => ({
    label: product.name,
    value: product.productId,
  }));

  const getOpObjProduct = (option: any) => {
    if (!option) return option;
    if (!option.value) return productsOptions.find((opt) => opt.value === option);
    return option;
  };

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={3} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.image')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.contentImage', { model: translate('model.lowercase.product') })}
            </Typography>
          </Stack>
          <UploadImageField
            label={translate('page.content.dragDrop')}
            subLabel={translate('page.content.imageAllowed')}
            margin="auto"
            name="image"
            defaultValue=""
            isEditing={isEditing}
          />
        </Stack>
      </Grid>
      <Grid item md={9} sm={12}>
        <Stack gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.detail')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('table.name')}, {translate('table.lowercase.code')}, {translate('table.lowercase.type')},{' '}
              {translate('table.lowercase.description')},...
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <Stack direction="row" alignItems="start" gap={2}>
              <SelectField<ProductTypeEnum>
                fullWidth
                name="type"
                disabled={isEditing}
                options={PRODUCT_TYPE_OPTIONS}
                label={translate(
                  'page.form.nameExchange',
                  currentLang.value === Language.ENGLISH
                    ? {
                        model: translate('model.capitalizeOne.product'),
                        name: translate('table.lowercase.type'),
                      }
                    : {
                        model: translate('table.type'),
                        name: translate('model.lowercase.product'),
                      }
                )}
              />
            </Stack>
            <Stack direction="row" alignItems="start" gap={2}>
              <InputField
                fullWidth
                name="name"
                label={translate(
                  'page.form.nameExchange',
                  currentLang.value === Language.ENGLISH
                    ? {
                        model: translate('model.capitalizeOne.product'),
                        name: translate('page.form.nameLower'),
                      }
                    : {
                        model: translate('page.form.name'),
                        name: translate('model.lowercase.product'),
                      }
                )}
                disabled={productType === ProductTypeEnum.CHILD}
                helperText={
                  productType === ProductTypeEnum.CHILD ? translate('page.validation.nameProductHelperText') : ''
                }
              />
            </Stack>
            {productType === ProductTypeEnum.CHILD && (
              <Stack direction="row" alignItems="start" gap={2}>
                <AutoCompleteField
                  type="text"
                  name="parentProductId"
                  label={translate('page.form.parentProduct')}
                  options={productsOptions}
                  getOptionLabel={(value: any) => {
                    return getOpObjProduct(value)?.label;
                  }}
                  isOptionEqualToValue={(option: any, value: any) => {
                    if (!option) return option;
                    return option.value === getOpObjProduct(value)?.value;
                  }}
                  transformValue={(opt: any) => opt.value}
                />
                <SelectField<ProductSizeEnum>
                  fullWidth
                  name="size"
                  disabled={isEditing}
                  options={PRODUCT_SIZE_OPTIONS}
                  label={translate('page.form.productSize')}
                />
              </Stack>
            )}

            <Stack direction="row" alignItems="start" gap={2}>
              <InputField
                fullWidth
                name="code"
                disabled={isEditing}
                label={translate(
                  'page.form.nameExchange',
                  currentLang.value === Language.ENGLISH
                    ? {
                        model: translate('model.capitalizeOne.product'),
                        name: translate('page.form.codeLower'),
                      }
                    : {
                        model: translate('page.form.code'),
                        name: translate('model.lowercase.product'),
                      }
                )}
              />
              <InputField type="number" fullWidth name="displayOrder" label={translate('table.displayOrder')} />
            </Stack>

            {(productType === ProductTypeEnum.CHILD ||
              productType === ProductTypeEnum.SINGLE ||
              productType === ProductTypeEnum.EXTRA) && (
              <Stack direction="row" alignItems="start" gap={2}>
                <InputField
                  fullWidth
                  type="number"
                  name="sellingPrice"
                  label={translate('table.sellingPrice') + '*'}
                  helperText={translate('page.validation.sellingPriceContent')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                  }}
                />
                <InputField
                  fullWidth
                  type="number"
                  name="discountPrice"
                  label={translate('table.discountPrice') + '*'}
                  helperText={translate('page.validation.discountPriceContent')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                  }}
                />
                <InputField
                  fullWidth
                  type="number"
                  name="historicalPrice"
                  label={translate('table.historicalPrice') + '*'}
                  helperText={translate('page.validation.historicalPriceContent')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                  }}
                />
              </Stack>
            )}
            {(productType === ProductTypeEnum.EXTRA ||
              productType === ProductTypeEnum.SINGLE ||
              productType === ProductTypeEnum.PARENT) && (
              <AutoCompleteField
                type="text"
                name="categoryId"
                label={
                  productType === ProductTypeEnum.EXTRA
                    ? translate('page.form.containExtraProduct')
                    : translate('page.form.containProduct')
                }
                options={categoriesOptions}
                getOptionLabel={(value: any) => {
                  return getOpObjCategory(value)?.label;
                }}
                isOptionEqualToValue={(option: any, value: any) => {
                  if (!option) return option;
                  return option.value === getOpObjCategory(value)?.value;
                }}
                transformValue={(opt: any) => opt.value}
              />
            )}

            <InputField fullWidth name="description" label={translate('table.description')} multiline minRows={3} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ProductForm;
