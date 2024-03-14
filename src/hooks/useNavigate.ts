import { Role } from 'common/enums';
import { useNavigate as useNavigateRouter } from 'react-router-dom';
import { useAppSelector } from 'redux/configStore';
import { PATH_ADMIN_APP, PATH_AUTH, PATH_BRAND_APP, PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function useNavigate() {
  const navigate = useNavigateRouter();
  const { userAuth, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleNavigateDashboard = () => {
    if (isAuthenticated) {
      if (userAuth?.roleName === Role.MBKC_ADMIN) {
        navigate(PATH_ADMIN_APP.root);
      } else if (userAuth?.roleName === Role.BRAND_MANAGER) {
        navigate(PATH_BRAND_APP.root);
      } else if (userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER) {
        navigate(PATH_KITCHEN_CENTER_APP.root);
      } else if (userAuth?.roleName === Role.CASHIER) {
        navigate(PATH_CASHIER_APP.root);
      } else {
        navigate(PATH_AUTH.login);
      }
    }
  };

  const handleNavigateProfile = () => {
    if (isAuthenticated) {
      if (userAuth?.roleName === Role.BRAND_MANAGER) {
        navigate(PATH_BRAND_APP.profile);
      } else if (userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER) {
        navigate(PATH_KITCHEN_CENTER_APP.profile);
      } else if (userAuth?.roleName === Role.CASHIER) {
        navigate(PATH_CASHIER_APP.profile);
      }
    }
  };

  return { navigate, handleNavigateDashboard, handleNavigateProfile };
}

export default useNavigate;
