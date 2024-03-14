import { useNavigate } from 'react-router-dom';
// @mui
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Link, Breadcrumbs as MUIBreadcrumbs, Stack, Typography } from '@mui/material';
//
import { Breadcrumb, Role } from 'common/enums';
import { useLocales } from 'hooks';
import { useAppSelector } from 'redux/configStore';
import { PATH_ADMIN_APP, PATH_BRAND_APP, PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';

interface BreadcrumbsProps {
  sx?: object;
  pathname: string;
  navigateDashboard: string;
}

function Breadcrumbs({ pathname, navigateDashboard, sx }: BreadcrumbsProps) {
  const navigate = useNavigate();
  const { translate } = useLocales();

  const { userAuth } = useAppSelector((state) => state.auth);

  const pathnames = pathname
    .split('/')
    .slice(2)
    .filter((x) => x);

  const pathnameBread = !isNaN(parseInt(pathnames[2]))
    ? pathnames.filter((x) => isNaN(parseInt(x)))
    : !isNaN(parseInt(pathnames[1]))
    ? [...pathnames.filter((x) => isNaN(parseInt(x))), Breadcrumb.DETAIL]
    : pathnames[0] === Breadcrumb.BRANDS ||
      pathnames[0] === Breadcrumb.KITCHEN_CENTERS ||
      pathnames[0] === Breadcrumb.STORES ||
      pathnames[0] === Breadcrumb.PARTNERS ||
      pathnames[0] === Breadcrumb.STORE_PARTNERS ||
      pathnames[0] === Breadcrumb.CATEGORIES ||
      pathnames[0] === Breadcrumb.EXTRA_CATEGORIES ||
      pathnames[0] === Breadcrumb.PRODUCTS ||
      pathnames[0] === Breadcrumb.PARTNER_PRODUCTS ||
      pathnames[0] === Breadcrumb.CASHIERS ||
      pathnames[0] === Breadcrumb.ORDERS ||
      pathnames[0] === Breadcrumb.BANKING_ACCOUNTS ||
      pathnames[0] === Breadcrumb.TRANSACTIONS ||
      pathnames[1] === Breadcrumb.MONEY_EXCHANGES ||
      pathnames[1] === Breadcrumb.SHIPPER_PAYMENTS ||
      pathnames[0] === Breadcrumb.PAYMENT_FOR_STORES
    ? [...pathnames, Breadcrumb.LIST]
    : pathnames;

  const routeTo =
    pathnames[0] === Breadcrumb.BRANDS || pathnames[0] === Breadcrumb.BRAND
      ? PATH_ADMIN_APP.brand.list
      : pathnames[0] === Breadcrumb.KITCHEN_CENTERS || pathnames[0] === Breadcrumb.KITCHEN_CENTER
      ? PATH_ADMIN_APP.kitchenCenter.list
      : pathnames[0] === Breadcrumb.STORES || pathnames[0] === Breadcrumb.STORE
      ? userAuth?.roleName === Role.MBKC_ADMIN
        ? PATH_ADMIN_APP.store.list
        : userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
        ? PATH_KITCHEN_CENTER_APP.store.list
        : PATH_BRAND_APP.store.list
      : pathnames[0] === Breadcrumb.PARTNERS || pathnames[0] === Breadcrumb.PARTNER
      ? PATH_BRAND_APP.storePartner.list
      : pathnames[0] === Breadcrumb.STORE_PARTNERS || pathnames[0] === Breadcrumb.STORE_PARTNER
      ? PATH_BRAND_APP.storePartner.list
      : pathnames[0] === Breadcrumb.CATEGORIES || pathnames[0] === Breadcrumb.CATEGORY
      ? PATH_BRAND_APP.category.list
      : pathnames[0] === Breadcrumb.EXTRA_CATEGORIES || pathnames[0] === Breadcrumb.EXTRA_CATEGORY
      ? PATH_BRAND_APP.category.extraList
      : pathnames[0] === Breadcrumb.PRODUCTS || pathnames[0] === Breadcrumb.PRODUCT
      ? PATH_BRAND_APP.product.list
      : pathnames[0] === Breadcrumb.PARTNER_PRODUCTS || pathnames[0] === Breadcrumb.PARTNER_PRODUCT
      ? PATH_BRAND_APP.partnerProduct.list
      : pathnames[0] === Breadcrumb.PAYMENT_FOR_STORES
      ? PATH_KITCHEN_CENTER_APP.paymentForStores.list
      : pathnames[0] === Breadcrumb.CASHIERS || pathnames[0] === Breadcrumb.CASHIER
      ? PATH_KITCHEN_CENTER_APP.cashier.list
      : pathnames[0] === Breadcrumb.ORDERS || pathnames[0] === Breadcrumb.ORDER
      ? userAuth?.roleName === Role.CASHIER
        ? PATH_CASHIER_APP.order.list
        : PATH_KITCHEN_CENTER_APP.order.list
      : pathnames[0] === Breadcrumb.WALLET
      ? userAuth?.roleName === Role.CASHIER
        ? PATH_CASHIER_APP.wallet.root
        : PATH_KITCHEN_CENTER_APP.wallet.root
      : pathnames[0] === Breadcrumb.BANKING_ACCOUNTS || pathnames[0] === Breadcrumb.BANKING_ACCOUNT
      ? PATH_KITCHEN_CENTER_APP.bankingAccount.list
      : '';

  return (
    <MUIBreadcrumbs separator={<FiberManualRecordIcon sx={{ fontSize: 8 }} />} aria-label="breadcrumb">
      {pathnameBread.length > 0 ? (
        <Stack direction="row" gap={1} alignItems="center">
          <Link onClick={() => navigate(navigateDashboard)} underline="none" sx={{ cursor: 'pointer' }}>
            {translate('breadcrumb.dashboard')}
          </Link>
        </Stack>
      ) : (
        <Typography>{translate('breadcrumb.dashboard')}</Typography>
      )}
      {pathnameBread.map((path, index) => {
        if (pathnames[1] === Breadcrumb.SHIPPER_PAYMENTS) {
          console.log('routeTo', routeTo);
        }
        const isLast = index === pathnameBread.length - 1;
        const nameFinal =
          path === Breadcrumb.BRAND
            ? translate('breadcrumb.brand')
            : path === Breadcrumb.BRANDS
            ? translate('breadcrumb.brands')
            : path === Breadcrumb.KITCHEN_CENTER
            ? translate('breadcrumb.kitchen-center')
            : path === Breadcrumb.KITCHEN_CENTERS
            ? translate('breadcrumb.kitchen-centers')
            : path === Breadcrumb.STORE
            ? translate('breadcrumb.store')
            : path === Breadcrumb.STORES
            ? translate('breadcrumb.stores')
            : path === Breadcrumb.CATEGORY
            ? translate('breadcrumb.normalCategory')
            : path === Breadcrumb.CATEGORIES
            ? translate('breadcrumb.categories')
            : path === Breadcrumb.EXTRA_CATEGORY
            ? translate('breadcrumb.extra-category')
            : path === Breadcrumb.EXTRA_CATEGORIES
            ? translate('breadcrumb.extra-categories')
            : path === Breadcrumb.PRODUCT
            ? translate('breadcrumb.product')
            : path === Breadcrumb.PRODUCTS
            ? translate('breadcrumb.products')
            : path === Breadcrumb.PARTNER_PRODUCT
            ? translate('breadcrumb.partnerProduct')
            : path === Breadcrumb.PARTNER_PRODUCTS
            ? translate('breadcrumb.partnerProducts')
            : path === Breadcrumb.CASHIER
            ? translate('breadcrumb.cashier')
            : path === Breadcrumb.CASHIERS
            ? translate('breadcrumb.cashiers')
            : path === Breadcrumb.ORDER
            ? translate('breadcrumb.order')
            : path === Breadcrumb.ORDERS
            ? translate('breadcrumb.orders')
            : path === Breadcrumb.BANKING_ACCOUNT
            ? translate('breadcrumb.banking-account')
            : path === Breadcrumb.BANKING_ACCOUNTS
            ? translate('breadcrumb.banking-accounts')
            : path === Breadcrumb.TRANSACTION
            ? translate('breadcrumb.transaction')
            : path === Breadcrumb.TRANSACTIONS
            ? translate('breadcrumb.transactions')
            : path === Breadcrumb.PARTNER
            ? translate('breadcrumb.partner')
            : path === Breadcrumb.PARTNERS
            ? translate('breadcrumb.partners')
            : path === Breadcrumb.STORE_PARTNER
            ? translate('breadcrumb.storePartner')
            : path === Breadcrumb.STORE_PARTNERS
            ? translate('breadcrumb.storePartners')
            : path === Breadcrumb.MONEY_EXCHANGES
            ? translate('breadcrumb.transactions')
            : path === Breadcrumb.SHIPPER_PAYMENTS
            ? translate('breadcrumb.shipperPayments')
            : path === Breadcrumb.WALLET
            ? translate('breadcrumb.wallet')
            : path === Breadcrumb.LIST
            ? translate('breadcrumb.list')
            : path === Breadcrumb.DETAIL
            ? translate('breadcrumb.detail')
            : path === Breadcrumb.UPDATE
            ? translate('breadcrumb.update')
            : path === Breadcrumb.CREATE
            ? translate('breadcrumb.create-new')
            : path === Breadcrumb.REGISTER
            ? translate('breadcrumb.registration')
            : path === Breadcrumb.PROFILE
            ? translate('model.capitalizeOne.accountInformation')
            : path === Breadcrumb.INFORMATION
            ? translate('breadcrumb.information')
            : path === Breadcrumb.CONFIGURATIONS
            ? translate('breadcrumb.configurations')
            : path === Breadcrumb.END_OF_SHIFT
            ? translate('breadcrumb.endOfShift')
            : path === Breadcrumb.PAYMENT_FOR_STORES
            ? translate('breadcrumb.payment-for-stores')
            : path === Breadcrumb.TRANSFER_MONEY
            ? translate('model.capitalizeOne.transferMoney')
            : path;
        return isLast ? (
          <Typography key={path}>{nameFinal}</Typography>
        ) : (
          <span key={path}>
            {path === Breadcrumb.SHIPPER_PAYMENTS || path === Breadcrumb.MONEY_EXCHANGES ? (
              <Link underline="none">{nameFinal}</Link>
            ) : (
              <Link underline="none" sx={{ cursor: 'pointer' }} onClick={() => navigate(routeTo)}>
                {nameFinal}
              </Link>
            )}
          </span>
        );
      })}
    </MUIBreadcrumbs>
  );
}

export default Breadcrumbs;
