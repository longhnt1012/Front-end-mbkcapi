import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { ref } from 'yup';
//
import { LoginForm } from 'common/@types';
import { Breadcrumb, Language } from 'common/enums';
import useLocales from './useLocales';

function useValidationForm() {
  const { translate, currentLang } = useLocales();

  const { pathname } = useLocation();

  const schemaLogin: yup.ObjectSchema<LoginForm> = yup.object({
    email: yup
      .string()
      .required(translate('page.validation.required', { name: 'email' }))
      .email(translate('page.validation.emailFormat')),
    password: yup.string().required(translate('page.validation.required', { name: translate('page.form.password') })),
  });

  const schemaForgotPassword = yup.object({
    email: yup
      .string()
      .required(translate('page.validation.required', { name: 'Email' }))
      .email(translate('page.validation.emailFormat')),
  });

  const schemaVerifyOtp = yup.object({
    email: yup
      .string()
      .required(translate('page.validation.required', { name: 'Email' }))
      .email(translate('page.validation.emailFormat')),
    otpCode: yup
      .string()
      .required(translate('page.validation.required', { name: translate('page.form.otpCode') }))
      .min(6, translate('page.validation.otpAlLeast'))
      .max(6, translate('page.validation.otpMax'))
      .matches(/^[0-9]+$/, translate('page.validation.otpMatches')),
  });

  const schemaResetPassword = yup.object({
    email: yup
      .string()
      .required(translate('page.validation.required', { name: 'Email' }))
      .email(translate('page.validation.emailFormat')),
    newPassword: yup
      .string()
      .required(translate('page.validation.required', { name: translate('page.form.newPassword') })),
    confirmPassword: yup
      .string()
      .required(translate('page.validation.required', { name: translate('page.form.confirmPassword') }))
      .oneOf([ref('newPassword')], translate('page.validation.matchPassword')),
  });

  const schemaUpdatePassword = yup.object({
    newPassword: yup
      .string()
      .required(translate('page.validation.required', { name: translate('page.form.newPassword') })),
    confirmPassword: yup
      .string()
      .required(translate('page.validation.required', { name: translate('page.form.confirmPassword') }))
      .oneOf([ref('newPassword')], translate('page.validation.matchPassword')),
  });

  const schemaStore = yup.object({
    name: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate(
            'page.form.nameExchange',
            currentLang.value === Language.ENGLISH
              ? {
                  model: translate('model.lowercase.store'),
                  name: translate('page.form.nameLower'),
                }
              : {
                  model: translate('page.form.nameLower'),
                  name: translate('model.lowercase.store'),
                }
          ),
        })
      )
      .max(80, translate('page.validation.max80')),
    storeManagerEmail: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate('table.lowercase.email'),
        })
      )
      .email(translate('page.validation.emailFormat'))
      .max(100, translate('page.validation.max100')),
    kitchenCenterId: yup
      .number()
      .typeError(translate('page.validation.select', { name: translate('model.lowercase.kitchenCenter') }))
      .min(1, translate('page.validation.select', { name: translate('model.lowercase.kitchenCenter') }))
      .required(translate('page.validation.select', { name: translate('model.lowercase.kitchenCenter') })),
  });

  const schemaCategory = yup.object({
    name: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate(
            'page.form.nameExchange',
            currentLang.value === Language.ENGLISH
              ? {
                  model: translate('model.lowercase.category'),
                  name: translate('page.form.nameLower'),
                }
              : {
                  model: translate('page.form.nameLower'),
                  name: translate('model.lowercase.category'),
                }
          ),
        })
      )
      .max(100, translate('page.validation.max100')),
    code: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate(
            'page.form.nameExchange',
            currentLang.value === Language.ENGLISH
              ? {
                  model: translate('model.lowercase.category'),
                  name: translate('page.form.codeLower'),
                }
              : {
                  model: translate('page.form.codeLower'),
                  name: translate('model.lowercase.category'),
                }
          ),
        })
      )
      .max(20, translate('page.validation.max20')),
    type: yup.string().required(
      translate('page.validation.select', {
        name: translate(
          'page.form.nameExchange',
          currentLang.value === Language.ENGLISH
            ? {
                model: translate('model.lowercase.category'),
                name: translate('table.lowercase.type'),
              }
            : {
                model: translate('table.lowercase.type'),
                name: translate('model.lowercase.category'),
              }
        ),
      })
    ),
    displayOrder: yup
      .number()
      .typeError(
        translate('page.validation.required', {
          name: translate('table.lowercase.displayOrder'),
        })
      )
      .required(
        translate('page.validation.required', {
          name: translate('table.lowercase.displayOrder'),
        })
      )
      .min(1, translate('page.validation.displayOrderMoreThan0')),
    description: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate('table.lowercase.description'),
        })
      )
      .max(100, translate('page.validation.max100')),
  });

  const schemaProduct = yup.object({
    name: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate(
            'page.form.nameExchange',
            currentLang.value === Language.ENGLISH
              ? {
                  model: translate('model.lowercase.product'),
                  name: translate('page.form.nameLower'),
                }
              : {
                  model: translate('page.form.nameLower'),
                  name: translate('model.lowercase.product'),
                }
          ),
        })
      )
      .max(120, translate('page.validation.max120')),
    code: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate(
            'page.form.nameExchange',
            currentLang.value === Language.ENGLISH
              ? {
                  model: translate('model.lowercase.product'),
                  name: translate('page.form.codeLower'),
                }
              : {
                  model: translate('page.form.codeLower'),
                  name: translate('model.lowercase.product'),
                }
          ),
        })
      )
      .max(20, translate('page.validation.max20')),
    description: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate('table.lowercase.description'),
        })
      )
      .max(1000, translate('page.validation.max1000')),
    historicalPrice: yup
      .number()
      .typeError(translate('page.validation.required', { name: translate('table.lowercase.historicalPrice') }))
      .required(translate('page.validation.required', { name: translate('table.lowercase.historicalPrice') }))
      .moreThan(-1, translate('page.validation.historicalPriceGreaterThan0')),
    sellingPrice: yup
      .number()
      .typeError(translate('page.validation.required', { name: translate('table.lowercase.sellingPrice') }))
      .required(translate('page.validation.required', { name: translate('table.lowercase.sellingPrice') }))
      .moreThan(-1, translate('page.validation.sellingPriceGreaterThan0')),
    discountPrice: yup
      .number()
      .typeError(translate('page.validation.required', { name: translate('table.lowercase.discountPrice') }))
      .required(translate('page.validation.required', { name: translate('table.lowercase.discountPrice') }))
      .moreThan(-1, translate('page.validation.discountPriceGreaterThan0')),
    displayOrder: yup
      .number()
      .typeError(
        translate('page.validation.required', {
          name: translate('table.lowercase.displayOrder'),
        })
      )
      .required(
        translate('page.validation.required', {
          name: translate('table.lowercase.displayOrder'),
        })
      )
      .min(0, translate('page.validation.displayOrderMoreThan0')),
    size: yup.string().required(translate('page.validation.select', { name: translate('table.lowercase.size') })),
    type: yup.string().required(
      translate('page.validation.select', {
        name: translate(
          'page.form.nameExchange',
          currentLang.value === Language.ENGLISH
            ? {
                model: translate('model.lowercase.product'),
                name: translate('table.lowercase.type'),
              }
            : {
                model: translate('table.lowercase.type'),
                name: translate('model.lowercase.product'),
              }
        ),
      })
    ),
    parentProductId: yup
      .number()
      .typeError(translate('page.validation.select', { name: translate('model.lowercase.parentProduct') }))
      .required(translate('page.validation.select', { name: translate('model.lowercase.parentProduct') })),
    categoryId: yup
      .number()
      .typeError(translate('page.validation.select', { name: translate('model.lowercase.category') }))
      .required(translate('page.validation.select', { name: translate('model.lowercase.category') })),
  });

  const schemaPartnerProduct = yup.object({
    productId: yup
      .number()
      .typeError(translate('page.validation.select', { name: translate('model.lowercase.product') }))
      .required(translate('page.validation.select', { name: translate('model.lowercase.product') }))
      .min(1, translate('page.validation.select', { name: translate('model.lowercase.product') })),
    partnerId: yup
      .number()
      .typeError(translate('page.validation.select', { name: translate('model.lowercase.partner') }))
      .required(translate('page.validation.select', { name: translate('model.lowercase.partner') }))
      .min(1, translate('page.validation.select', { name: translate('model.lowercase.partner') })),
    storeId: yup
      .number()
      .typeError(translate('page.validation.select', { name: translate('model.lowercase.store') }))
      .required(translate('page.validation.select', { name: translate('model.lowercase.store') }))
      .min(1, translate('page.validation.select', { name: translate('model.lowercase.store') })),
    status: yup.string().required(translate('page.validation.select', { name: translate('table.lowercase.status') })),
    productCode: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate(
            'page.form.nameExchange',
            currentLang.value === Language.ENGLISH
              ? {
                  model: translate('model.lowercase.product'),
                  name: translate('page.form.codeLower'),
                }
              : {
                  model: translate('page.form.codeLower'),
                  name: translate('model.lowercase.product'),
                }
          ),
        })
      )
      .max(50, translate('page.validation.max50')),
    price: yup
      .number()
      .typeError(
        translate('page.validation.required', {
          name: translate('table.lowercase.price'),
        })
      )
      .required(
        translate('page.validation.required', {
          name: translate('table.lowercase.price'),
        })
      )
      .moreThan(1, translate('page.validation.pricePositiveNumber')),
  });

  const schemaStorePartner = yup.object().shape({
    storeId: yup
      .number()
      .typeError(translate('page.validation.select', { name: translate('model.lowercase.store') }))
      .min(1, translate('page.validation.select', { name: translate('model.lowercase.store') }))
      .required(translate('page.validation.select', { name: translate('model.lowercase.store') })),
    partnerAccounts: yup
      .array()
      .of(
        yup.object().shape({
          partnerId: yup
            .number()
            .typeError(translate('page.validation.select', { name: translate('model.lowercase.partner') }))
            .min(1, translate('page.validation.select', { name: translate('model.lowercase.partner') }))
            .required(translate('page.validation.select', { name: translate('model.lowercase.partner') })),
          userName: yup
            .string()
            .required(translate('page.validation.required', { name: translate('page.form.userName') })),
          password: yup
            .string()
            .required(translate('page.validation.required', { name: translate('page.form.password') })),
          commission: yup
            .number()
            .typeError(translate('page.validation.required', { name: translate('page.form.commission') }))
            .required(translate('page.validation.required', { name: translate('page.form.commission') }))
            .moreThan(-1, translate('page.validation.commisstionPositiveNumber'))
            .max(100, translate('page.validation.commissionLimit100')),
        })
      )
      .required('Must have fields')
      .min(1, 'Minimum of 1 field'),
  });

  const schemaPartner = yup.object({
    name: yup.string().required(
      translate('page.validation.required', {
        name: `${translate('page.form.nameLower')} ${translate('model.lowercase.partner')}`,
      })
    ),
    webUrl: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate('page.form.webUrlLower'),
        })
      )
      .url(translate('page.validation.formatUrl')),
    taxCommission: yup
      .number()
      .typeError(translate('page.validation.required', { name: translate('table.taxCommission') }))
      .required(translate('page.validation.required', { name: translate('table.taxCommission') }))
      .moreThan(-1, translate('page.validation.taxCommisstionPositiveNumber'))
      .max(100, translate('page.validation.taxCommissionLimit100')),
  });

  const schemaCommonBrandKitchenCenter = yup.object({
    name: yup
      .string()
      .max(100, translate('page.validation.max100'))
      .required(
        translate('page.validation.required', {
          name: translate(
            'page.form.nameExchange',
            currentLang.value === Language.ENGLISH
              ? {
                  model:
                    pathname
                      .split('/')
                      .slice(2)
                      .filter((x) => x)[0] === Breadcrumb.BRAND
                      ? translate('model.lowercase.brand')
                      : translate('model.lowercase.kitchenCenter'),
                  name: translate('page.form.nameLower'),
                }
              : {
                  model: translate('page.form.nameLower'),
                  name:
                    pathname
                      .split('/')
                      .slice(2)
                      .filter((x) => x)[0] === Breadcrumb.BRAND
                      ? translate('model.lowercase.brand')
                      : translate('model.lowercase.kitchenCenter'),
                }
          ),
        })
      ),
    managerEmail: yup
      .string()
      .email(translate('page.validation.emailFormat'))
      .required(translate('page.validation.required', { name: translate('model.lowercase.managerEmail') })),
    address: yup
      .string()
      .required(translate('page.validation.required', { name: translate('table.lowercase.address') })),
    provinceId: yup
      .number()
      .required(translate('page.validation.select', { name: translate('page.form.province') }))
      .typeError(translate('page.validation.select', { name: translate('page.form.province') }))
      .min(1, translate('page.validation.select', { name: translate('page.form.province') })),
    districtId: yup
      .number()
      .required(translate('page.validation.select', { name: translate('page.form.district') }))
      .typeError(translate('page.validation.select', { name: translate('page.form.district') }))
      .min(1, translate('page.validation.select', { name: translate('page.form.district') })),
    wardId: yup
      .number()
      .required(translate('page.validation.select', { name: translate('page.form.ward') }))
      .typeError(translate('page.validation.select', { name: translate('page.form.ward') }))
      .min(1, translate('page.validation.select', { name: translate('page.form.ward') })),
  });

  const schemaBankingAccount = yup.object({
    bankName: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate(
            'page.form.nameExchange',
            currentLang.value === Language.ENGLISH
              ? {
                  model: translate('model.lowercase.bankingAccount'),
                  name: translate('page.form.nameLower'),
                }
              : {
                  model: translate('page.form.nameLower'),
                  name: translate('model.lowercase.bankingAccount'),
                }
          ),
        })
      )
      .max(100, translate('page.validation.max100')),
    numberAccount: yup
      .string()
      .required(translate('page.validation.required', { name: translate('model.lowercase.numberAccount') }))
      .min(10, translate('page.validation.minNumber10', { name: translate('model.capitalizeOne.numberAccount') }))
      .max(20, translate('page.validation.maxNumber20', { name: translate('model.capitalizeOne.numberAccount') })),
  });

  const schemaPaymentForStore = yup.object({
    storeId: yup
      .number()
      .typeError(translate('page.validation.select', { name: translate('model.lowercase.store') }))
      .min(1, translate('page.validation.select', { name: translate('model.lowercase.store') }))
      .required(translate('page.validation.select', { name: translate('model.lowercase.store') })),
    amount: yup.string().required(translate('page.validation.required', { name: translate('page.form.amount') })),
  });

  const schemaShipperPayment = yup.object({
    bankingAccountId: yup
      .string()
      .typeError(translate('page.validation.select', { name: translate('model.lowercase.store') }))
      .min(1, translate('page.validation.select', { name: translate('model.lowercase.store') }))
      .required(translate('page.validation.select', { name: translate('model.lowercase.store') })),
    paymentType: yup.string().required(
      translate('page.validation.select', {
        name: translate('page.form.paymentMethod'),
      })
    ),
  });

  const schemaCashier = yup.object({
    fullName: yup.string().required(
      translate('page.validation.required', {
        name: translate(
          'page.form.nameExchange',
          currentLang.value === Language.ENGLISH
            ? {
                model: translate('model.lowercase.cashier'),
                name: translate('page.form.nameLower'),
              }
            : {
                model: translate('page.form.nameLower'),
                name: translate('model.lowercase.cashier'),
              }
        ),
      })
    ),
    email: yup
      .string()
      .email(translate('page.validation.emailFormat'))
      .required(translate('page.validation.required', { name: translate('table.lowercase.email') })),
    citizenNumber: yup
      .string()
      .required(translate('page.validation.required', { name: translate('model.lowercase.citizenNumber') }))
      .matches(/^[0-9]{12}$/, translate('page.validation.citizenNumberLimit12Number')),
    dateOfBirth: yup
      .string()
      .required(translate('page.validation.select', { name: translate('model.lowercase.dateOfBirth') })),
    gender: yup.string().required(translate('page.validation.select', { name: translate('model.lowercase.gender') })),
  });

  const schemaUpdateProfile = yup.object({
    name: yup.string().required(
      translate('page.validation.required', {
        name: `${translate('page.form.nameLower')} ${translate('model.lowercase.brand')}`,
      })
    ),
    address: yup.string().required(
      translate('page.validation.required', {
        name: translate('table.lowercase.address'),
      })
    ),
    provinceId: yup
      .number()
      .required(translate('page.validation.select', { name: translate('page.form.province') }))
      .typeError(translate('page.validation.select', { name: translate('page.form.province') }))
      .min(1, translate('page.validation.select', { name: translate('page.form.province') })),
    districtId: yup
      .number()
      .required(translate('page.validation.select', { name: translate('page.form.district') }))
      .typeError(translate('page.validation.select', { name: translate('page.form.district') }))
      .min(1, translate('page.validation.select', { name: translate('page.form.district') })),
    wardId: yup
      .number()
      .required(translate('page.validation.select', { name: translate('page.form.ward') }))
      .typeError(translate('page.validation.select', { name: translate('page.form.ward') }))
      .min(1, translate('page.validation.select', { name: translate('page.form.ward') })),
  });

  const schemaUpdateStorePartner = yup.object({
    userName: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: `${translate('page.form.lowercase.userName')}`,
        })
      )
      .max(100, translate('page.validation.max100')),
    password: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate('page.form.lowercase.password'),
        })
      )
      .max(50, translate('page.validation.max50')),
    commission: yup
      .number()
      .typeError(translate('page.validation.required', { name: translate('page.form.commission') }))
      .required(translate('page.validation.required', { name: translate('page.form.commission') }))
      .moreThan(-1, translate('page.validation.commisstionPositiveNumber'))
      .max(100, translate('page.validation.commissionLimit100')),
  });

  return {
    schemaLogin,
    schemaForgotPassword,
    schemaVerifyOtp,
    schemaResetPassword,
    schemaStore,
    schemaCategory,
    schemaBankingAccount,
    schemaProduct,
    schemaPartner,
    schemaUpdatePassword,
    schemaCashier,
    schemaUpdateProfile,
    schemaCommonBrandKitchenCenter,
    schemaUpdateStorePartner,
    schemaPartnerProduct,
    schemaStorePartner,
    schemaPaymentForStore,
    schemaShipperPayment,
  };
}

export default useValidationForm;
