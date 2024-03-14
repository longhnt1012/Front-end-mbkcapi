import {
  BankingAccountTable,
  BrandTable,
  CashierTable,
  CategoryTable,
  HeadCell,
  KitchenCenterTable,
  MoneyExchangeTable,
  OrderHistoryTable,
  OrderTable,
  PartnerProductTable,
  PartnerTable,
  ProductDashboardTable,
  ProductTable,
  ShipperPaymentTable,
  StorePartnerDetailTable,
  StorePartnerTable,
  StoreTable,
} from 'common/@types';
import { Language } from 'common/enums';
import useLocales from './useLocales';

function useConfigHeadTable() {
  const { translate, currentLang } = useLocales();

  const kitchenCenterHeadCells: HeadCell<KitchenCenterTable>[] = [
    {
      id: 'logo',
      label: translate('table.logo'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'name',
      label: translate('table.name'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'address',
      label: translate('table.address'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const brandHeadCells: HeadCell<BrandTable>[] = [
    {
      id: 'logo',
      label: translate('table.logo'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'name',
      label: translate('table.name'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'address',
      label: translate('table.address'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const storeHeadCells: HeadCell<StoreTable>[] = [
    {
      id: 'logo',
      label: translate('table.logo'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'name',
      label: translate('table.name'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'storeManagerEmail',
      label: translate('table.manageEmail'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'kitchenCenter',
      label: translate('table.kitchenCenter'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'brand',
      label: translate('table.brand'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const categoryHeadCells: HeadCell<CategoryTable>[] = [
    {
      id: 'imageUrl',
      label: translate('table.image'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'name',
      label: translate(
        'page.form.nameExchange',
        currentLang.value === Language.ENGLISH
          ? {
              model: translate('model.capitalizeOne.category'),
              name: translate('page.form.nameLower'),
            }
          : {
              model: translate('page.form.name'),
              name: translate('model.lowercase.category'),
            }
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'code',
      label: translate(
        'page.form.nameExchange',
        currentLang.value === Language.ENGLISH
          ? {
              model: translate('model.capitalizeOne.category'),
              name: translate('page.form.codeLower'),
            }
          : {
              model: translate('page.form.code'),
              name: translate('model.lowercase.category'),
            }
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'displayOrder',
      label: translate('table.displayOrder'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const productHeadCells: HeadCell<ProductTable>[] = [
    {
      id: 'image',
      label: translate('table.image'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'name',
      label: translate(
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
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'code',
      label: translate(
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
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'displayOrder',
      label: translate('table.displayOrder'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'sellingPrice',
      label: translate('table.sellingPrice'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'discountPrice',
      label: translate('table.discountPrice'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'historicalPrice',
      label: translate('table.historicalPrice'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'category',
      label: translate('model.capitalizeOne.category'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'type',
      label: translate('table.type'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const productDashboardHeadCells: HeadCell<ProductDashboardTable>[] = [
    {
      id: 'image',
      label: translate('table.image'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'name',
      label: translate(
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
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'code',
      label: translate(
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
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'numberOfProductsSold',
      label: translate('table.quantity'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'sellingPrice',
      label: translate('table.sellingPrice'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'category',
      label: translate('model.capitalizeOne.category'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'type',
      label: translate('table.type'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const partnerProductHeadCells: HeadCell<PartnerProductTable>[] = [
    {
      id: 'productName',
      label: translate(
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
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'productCode',
      label: translate(
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
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'partnerName',
      label: translate('model.capitalizeOne.partner'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'storeName',
      label: translate('model.capitalizeOne.store'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const cashierHeadCells: HeadCell<CashierTable>[] = [
    {
      id: 'avatar',
      label: translate('table.avatar'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'fullName',
      label: translate('table.fullName'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'email',
      label: translate('table.email'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'gender',
      label: translate('table.gender'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const bankingAccountHeadCells: HeadCell<BankingAccountTable>[] = [
    {
      id: 'logoUrl',
      label: translate('table.logo'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'name',
      label: translate('table.name'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const partnerHeadCells: HeadCell<PartnerTable>[] = [
    {
      id: 'logo',
      label: translate('table.logo'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'name',
      label: translate('table.name'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'taxCommission',
      label: translate('table.taxCommission') + " (%)",
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const storePartnerHeadCells: HeadCell<StorePartnerTable>[] = [
    {
      id: 'storeName',
      label: translate(
        'page.form.nameExchange',
        currentLang.value === Language.ENGLISH
          ? {
              model: translate('model.capitalizeOne.store'),
              name: translate('page.form.nameLower'),
            }
          : {
              model: translate('page.form.name'),
              name: translate('model.lowercase.store'),
            }
      ),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'kitchenCenterName',
      label: translate(
        'page.form.nameExchange',
        currentLang.value === Language.ENGLISH
          ? {
              model: translate('model.capitalizeOne.kitchenCenter'),
              name: translate('page.form.nameLower'),
            }
          : {
              model: translate('page.form.name'),
              name: translate('model.lowercase.kitchenCenter'),
            }
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const storePartnerDetailHeadCells: HeadCell<StorePartnerDetailTable>[] = [
    {
      id: 'partnerLogo',
      label: translate('table.logo'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'partnerName',
      label: translate(
        'page.form.nameExchange',
        currentLang.value === Language.ENGLISH
          ? {
              model: translate('model.capitalizeOne.partner'),
              name: translate('page.form.nameLower'),
            }
          : {
              model: translate('page.form.name'),
              name: translate('model.lowercase.partner'),
            }
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'commission',
      label: translate('page.form.commission'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'userName',
      label: translate('page.form.userName'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'password',
      label: translate('page.form.password'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const orderHeadCells: HeadCell<OrderTable>[] = [
    {
      id: 'orderId',
      label: translate('table.orderId'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'orderPartnerId',
      label: translate('table.partnerOrderId'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'partnerName',
      label: translate('table.partnerName'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'storeName',
      label: translate('table.storeName'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'collectedPrice',
      label: translate('table.collect'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'systemStatus',
      label: translate('table.systemStatus'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'partnerOrderStatus',
      label: translate('table.partnerOrderStatus'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
  ];

  const orderHistoryHeadCells: HeadCell<OrderHistoryTable>[] = [
    {
      id: 'createdDate',
      label: 'Created date',
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'partnerOrderStatus',
      label: 'Partner order status',
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'systemStatus',
      label: 'System status',
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
  ];

  const MoneyExchangeHeadCells: HeadCell<MoneyExchangeTable>[] = [
    {
      id: 'sender',
      label: translate('table.sender'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'receiver',
      label: translate('table.receiver'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'transactionTime',
      label: translate('table.transactionTime'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'amount',
      label: translate('page.form.amount'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'exchangeType',
      label: translate('table.exchangeType'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
  ];

  const shipperPaymentHeadCells: HeadCell<ShipperPaymentTable>[] = [
    {
      id: 'orderPartnerId',
      label: translate('table.partnerOrderId'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'cashierCreated',
      label: translate('table.cashierCreated'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'createDate',
      label: translate('table.createdDate'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'amount',
      label: translate('table.collect'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'finalTotalPrice',
      label: translate('page.content.finalTotalPrice'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'paymentMethod',
      label: translate('page.content.paymentMethod'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'kcBankingAccountName',
      label: translate('model.capitalizeOne.bankingAccount'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  return {
    kitchenCenterHeadCells,
    brandHeadCells,
    storeHeadCells,
    categoryHeadCells,
    productHeadCells,
    cashierHeadCells,
    bankingAccountHeadCells,
    partnerHeadCells,
    orderHeadCells,
    orderHistoryHeadCells,
    MoneyExchangeHeadCells,
    storePartnerHeadCells,
    storePartnerDetailHeadCells,
    shipperPaymentHeadCells,
    partnerProductHeadCells,
    productDashboardHeadCells,
  };
}

export default useConfigHeadTable;
