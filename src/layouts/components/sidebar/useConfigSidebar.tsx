// @mui icons
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import ContactsIcon from '@mui/icons-material/Contacts';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import LinkIcon from '@mui/icons-material/Link';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PaymentsIcon from '@mui/icons-material/Payments';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import StoreIcon from '@mui/icons-material/Store';
import SummarizeIcon from '@mui/icons-material/Summarize';
import WalletIcon from '@mui/icons-material/Wallet';
//
import { NavSection } from 'common/@types';
import { useLocales } from 'hooks';
import { PATH_ADMIN_APP, PATH_BRAND_APP, PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function useConfigSidebar() {
  const { translate } = useLocales();

  const navAdmin: NavSection[] = [
    {
      missions: translate('model.lowercase.overview'),
      listNav: [
        {
          title: translate('model.lowercase.dashboard'),
          path: PATH_ADMIN_APP.root,
          icon: <AssessmentIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: translate('model.lowercase.manage'),
      listNav: [
        {
          title: translate('model.lowercase.kitchenCenters'),
          path: PATH_ADMIN_APP.kitchenCenter.list,
          icon: <BusinessIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.brands'),
          path: PATH_ADMIN_APP.brand.list,
          icon: <BrandingWatermarkOutlinedIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.stores'),
          path: PATH_ADMIN_APP.store.list,
          icon: <StoreIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.partners'),
          path: PATH_ADMIN_APP.partner.list,
          icon: <HandshakeIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: translate('model.lowercase.configurations'),
      listNav: [
        {
          title: translate('model.lowercase.systemConfigurations'),
          path: PATH_ADMIN_APP.configurations,
          icon: <SettingsTwoToneIcon fontSize="medium" />,
        },
      ],
    },
  ];

  const navBrand: NavSection[] = [
    {
      missions: translate('model.lowercase.overview'),
      listNav: [
        {
          title: translate('model.lowercase.dashboard'),
          path: PATH_BRAND_APP.root,
          icon: <AssessmentIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.information'),
          path: PATH_BRAND_APP.information,
          icon: <ContactsIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: translate('model.lowercase.manage'),
      listNav: [
        {
          title: translate('model.lowercase.stores'),
          path: PATH_BRAND_APP.store.list,
          icon: <RestaurantMenuIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.storePartners'),
          path: PATH_BRAND_APP.storePartner.list,
          icon: <HandshakeIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.normalCategories'),
          path: PATH_BRAND_APP.category.list,
          icon: <SummarizeIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.extraCategories'),
          path: PATH_BRAND_APP.category.extraList,
          icon: <LanOutlinedIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.products'),
          path: PATH_BRAND_APP.product.list,
          icon: <DinnerDiningIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.partnerProducts'),
          path: PATH_BRAND_APP.partnerProduct.list,
          icon: <LinkIcon fontSize="medium" />,
        },
      ],
    },
  ];

  const navKitchenCenter: NavSection[] = [
    {
      missions: translate('model.lowercase.overview'),
      listNav: [
        {
          title: translate('model.lowercase.dashboard'),
          path: PATH_KITCHEN_CENTER_APP.root,
          icon: <AssessmentIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.information'),
          path: PATH_KITCHEN_CENTER_APP.information,
          icon: <ContactsIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: translate('model.lowercase.manage'),
      listNav: [
        {
          title: translate('model.lowercase.stores'),
          path: PATH_KITCHEN_CENTER_APP.store.list,
          icon: <RestaurantMenuIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.cashiers'),
          path: PATH_KITCHEN_CENTER_APP.cashier.list,
          icon: <AssignmentIndIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.bankingAccounts'),
          path: PATH_KITCHEN_CENTER_APP.bankingAccount.list,
          icon: <AccountBalanceOutlinedIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.orders'),
          path: PATH_KITCHEN_CENTER_APP.order.list,
          icon: <ListAltIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.paymentForStores'),
          path: PATH_KITCHEN_CENTER_APP.paymentForStores.list,
          icon: <PaymentsIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.wallet'),
          path: PATH_KITCHEN_CENTER_APP.wallet.root,
          icon: <WalletIcon fontSize="medium" />,
        },
      ],
    },
  ];

  const navCashier: NavSection[] = [
    {
      missions: translate('model.lowercase.overview'),
      listNav: [
        {
          title: translate('model.lowercase.dashboard'),
          path: PATH_CASHIER_APP.root,
          icon: <AssessmentIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: translate('model.lowercase.manage'),
      listNav: [
        {
          title: translate('model.lowercase.orders'),
          path: PATH_CASHIER_APP.order.list,
          icon: <ListAltIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: translate('model.lowercase.transaction'),
      listNav: [
        {
          title: translate('model.lowercase.wallet'),
          path: PATH_CASHIER_APP.wallet.root,
          icon: <WalletIcon fontSize="medium" />,
        },
        {
          title: translate('model.lowercase.transferMoney'),
          path: PATH_CASHIER_APP.transferMoney,
          icon: <PendingActionsIcon fontSize="medium" />,
        },
      ],
    },
  ];

  return { navBrand, navKitchenCenter, navCashier, navAdmin };
}

export { useConfigSidebar };
