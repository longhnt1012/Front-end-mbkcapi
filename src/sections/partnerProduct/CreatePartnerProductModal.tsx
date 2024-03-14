/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllPartners } from 'redux/partner/partnerSlice';
import {
  createNewPartnerProduct,
  setFieldNameError,
  setStatusCode,
  updatePartnerProduct,
} from 'redux/partnerProduct/partnerProductSlice';
import { getAllProducts } from 'redux/product/productSlice';
import { getAllStores } from 'redux/store/storeSlice';
//
import { ListParams, Params } from 'common/@types';
import { Color, FieldNameError, Language, Status } from 'common/enums';
import {
  PARTNER_PRODUCT_STATUS_OPTIONS,
  PartnerProduct,
  PartnerProductStatusEnum,
  PartnerProductStatusUpdateEnum,
  PartnerProductToCreate,
  PartnerProductToUpdate,
} from 'common/models';
import { AutoCompleteField, InputField, SelectField } from 'components';
import { useLocales, usePagination, useValidationForm } from 'hooks';

interface CreatePartnerProductModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  partnerProduct?: PartnerProduct | null;
  filterName?: string;
  sortBy?: string;
}

function CreatePartnerProductModal({
  isOpen,
  handleOpen,
  partnerProduct,
  filterName,
  sortBy,
}: CreatePartnerProductModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate, currentLang } = useLocales();
  const { schemaPartnerProduct } = useValidationForm();
  const { page, rowsPerPage } = usePagination();

  const { stores } = useAppSelector((state) => state.store);
  const { partners } = useAppSelector((state) => state.partner);
  const { products } = useAppSelector((state) => state.product);
  const { brandProfile } = useAppSelector((state) => state.profile);
  const { isLoading, isEditing, statusCode, fieldNameError } = useAppSelector((state) => state.partnerProduct);

  const productOptions = products.map((product) => ({
    label: product.name,
    value: product.productId,
    category: product.categoryName,
    image: product.image,
  }));

  const getOpObjProduct = (option: any) => {
    if (!option) return option;
    if (!option.value) return productOptions.find((opt) => opt.value === option);
    return option;
  };

  const storeOptions = stores
    .filter((store) => store.status !== Status.BE_CONFIRMING && store.status !== Status.REJECTED)
    .map((store) => ({
      label: store.name,
      value: store.storeId,
      center: store.kitchenCenter.name,
      image: store.logo,
    }));

  const getOpObjStore = (option: any) => {
    if (!option) return option;
    if (!option.value) return storeOptions.find((opt) => opt.value === option);
    return option;
  };

  const partnerOptions = partners.map((partner) => ({
    label: partner.name,
    value: partner.partnerId,
    image: partner.logo,
  }));

  const getOpObjPartner = (option: any) => {
    if (!option) return option;
    if (!option.value) return partnerOptions.find((opt) => opt.value === option);
    return option;
  };

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        isGetAll: true,
      },
      navigate,
    };
  }, []);

  const paramStore: ListParams = useMemo(() => {
    return {
      optionParams: {
        isGetAll: true,
        idBrand: brandProfile?.brandId,
      },
      navigate,
    };
  }, []);

  useEffect(() => {
    dispatch(getAllProducts(params));
    dispatch(getAllStores(paramStore));
    dispatch(getAllPartners(params));
  }, [params]);

  const partnerProductForm = useForm<PartnerProductToCreate>({
    defaultValues: {
      productId: isEditing ? partnerProduct?.productId : 0,
      partnerId: isEditing ? partnerProduct?.partnerId : 0,
      storeId: isEditing ? partnerProduct?.storeId : 0,
      productCode: isEditing ? partnerProduct?.productCode : '',
      status: isEditing
        ? partnerProduct?.status.toLowerCase() === PartnerProductStatusEnum.AVAILABLE.toLowerCase()
          ? PartnerProductStatusUpdateEnum.AVAILABLE
          : partnerProduct?.status.toLowerCase() === PartnerProductStatusEnum.OUT_OF_STOCK_TODAY.toLowerCase()
          ? PartnerProductStatusUpdateEnum.OUT_OF_STOCK_TODAY
          : partnerProduct?.status.toLowerCase() === PartnerProductStatusEnum.OUT_OF_STOCK_INDEFINITELY.toLowerCase()
          ? PartnerProductStatusUpdateEnum.OUT_OF_STOCK_INDEFINITELY
          : ''
        : '',
      price: isEditing ? partnerProduct?.price : 0,
    },
    resolver: yupResolver(schemaPartnerProduct),
  });

  const { handleSubmit, reset, setValue } = partnerProductForm;

  const onSubmit = async (values: PartnerProductToCreate) => {
    const data = { ...values };

    if (isEditing) {
      const paramsToUpdate: Params<PartnerProductToUpdate> = {
        data: {
          productCode: data.productCode,
          status: data.status,
          price: data.price,
        },
        idParams: {
          productId: data?.productId,
          partnerId: data?.partnerId,
          storeId: data?.storeId,
        },
        optionParams: { searchValue: filterName, currentPage: page + 1, itemsPerPage: rowsPerPage, sortBy: sortBy },
        pathname,
        navigate,
      };
      await dispatch(updatePartnerProduct(paramsToUpdate));
    } else {
      const paramsToCreate: Params<PartnerProductToCreate> = {
        data,
        optionParams: { searchValue: filterName, currentPage: page + 1, itemsPerPage: rowsPerPage, sortBy: sortBy },
        navigate,
      };
      await dispatch(createNewPartnerProduct(paramsToCreate));
    }
  };

  const handleCloseModal = () => {
    handleOpen();
    dispatch(setStatusCode());
    dispatch(setFieldNameError());
  };

  useEffect(() => {
    if (statusCode === 200) {
      handleCloseModal();
    }
  }, [statusCode]);

  useEffect(() => {
    if (fieldNameError === FieldNameError.PRICE) {
      setValue('price', 0);
    }
    if (fieldNameError === FieldNameError.PRODUCT_CODE) {
      setValue('productCode', '');
    }
    if (fieldNameError === FieldNameError.STORE_ID) {
      setValue('storeId', 0);
    }
    if (fieldNameError === FieldNameError.MAPPING_PRODUCT) {
      setValue('productId', 0);
    }
  }, [fieldNameError]);

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleCloseModal}>
          <FormProvider {...partnerProductForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {isEditing ? translate('button.updateProductLink') : translate('button.createProductLink')}
                </Typography>
                <IconButton onClick={handleCloseModal}>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack alignItems="center" pt={3.5} pb={1} gap={2}>
                <AutoCompleteField
                  options={productOptions}
                  getOptionLabel={(value: any) => {
                    const label = getOpObjProduct(value)?.label;
                    return label === undefined ? '' : label;
                  }}
                  isOptionEqualToValue={(option: any, value: any) => {
                    if (!option) return option;
                    return option.value === getOpObjProduct(value)?.value;
                  }}
                  transformValue={(opt: any) => opt.value}
                  name="productId"
                  type="text"
                  disabled={isEditing || isLoading}
                  label={translate('model.capitalizeOne.product')}
                />
                <AutoCompleteField
                  options={storeOptions}
                  getOptionLabel={(value: any) => {
                    const label = getOpObjStore(value)?.label;
                    return label === undefined ? '' : label;
                  }}
                  isOptionEqualToValue={(option: any, value: any) => {
                    if (!option) return option;
                    return option.value === getOpObjStore(value)?.value;
                  }}
                  transformValue={(opt: any) => opt.value}
                  name="storeId"
                  type="text"
                  disabled={isEditing || isLoading}
                  label={translate('model.capitalizeOne.store')}
                />
                <AutoCompleteField
                  options={partnerOptions}
                  getOptionLabel={(value: any) => {
                    const label = getOpObjPartner(value)?.label;
                    return label === undefined ? '' : label;
                  }}
                  isOptionEqualToValue={(option: any, value: any) => {
                    if (!option) return option;
                    return option.value === getOpObjPartner(value)?.value;
                  }}
                  transformValue={(opt: any) => opt.value}
                  name="partnerId"
                  type="text"
                  disabled={isEditing || isLoading}
                  label={translate('model.capitalizeOne.partner')}
                />
                <InputField
                  fullWidth
                  type="text"
                  name="productCode"
                  disabled={isLoading}
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
                <SelectField<PartnerProductStatusUpdateEnum>
                  fullWidth
                  name="status"
                  disabled={isLoading}
                  options={PARTNER_PRODUCT_STATUS_OPTIONS}
                  label={translate('table.status') + ' ' + translate('model.lowercase.partnerProduct')}
                />
                <InputField
                  fullWidth
                  type="number"
                  name="price"
                  disabled={isLoading}
                  label={translate(
                    'page.form.nameExchange',
                    currentLang.value === Language.ENGLISH
                      ? {
                          model: translate('model.capitalizeOne.product'),
                          name: translate('table.lowercase.price'),
                        }
                      : {
                          model: translate('table.price'),
                          name: translate('model.lowercase.product'),
                        }
                  )}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                  }}
                />
              </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Stack direction="row" gap={2}>
                {isEditing && (
                  <Button
                    variant="contained"
                    color="inherit"
                    disabled={isLoading}
                    onClick={() => {
                      reset({
                        productId: partnerProduct?.productId,
                        partnerId: partnerProduct?.partnerId,
                        storeId: partnerProduct?.storeId,
                        productCode: partnerProduct?.productCode,
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
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default CreatePartnerProductModal;
