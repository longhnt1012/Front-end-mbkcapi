import { OrderSortBy } from 'common/@types';

export const getRuleWidths = (selected: readonly string[]) => ({
  name:
    !selected.includes(OrderSortBy.LOGO) &&
    !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) &&
    !selected.includes(OrderSortBy.KITCHEN_CENTER) &&
    !selected.includes(OrderSortBy.BRAND)
      ? 500
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) &&
        !selected.includes(OrderSortBy.LOGO) &&
        !selected.includes(OrderSortBy.KITCHEN_CENTER)
      ? 320
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) &&
        !selected.includes(OrderSortBy.LOGO) &&
        !selected.includes(OrderSortBy.BRAND)
      ? 320
      : !selected.includes(OrderSortBy.KITCHEN_CENTER) &&
        !selected.includes(OrderSortBy.LOGO) &&
        !selected.includes(OrderSortBy.BRAND)
      ? 320
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) &&
        !selected.includes(OrderSortBy.KITCHEN_CENTER) &&
        !selected.includes(OrderSortBy.BRAND)
      ? 450
      : !selected.includes(OrderSortBy.KITCHEN_CENTER) && !selected.includes(OrderSortBy.BRAND)
      ? 300
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) && !selected.includes(OrderSortBy.KITCHEN_CENTER)
      ? 300
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) && !selected.includes(OrderSortBy.BRAND)
      ? 300
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) && !selected.includes(OrderSortBy.LOGO)
      ? 250
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL)
      ? 230
      : !selected.includes(OrderSortBy.KITCHEN_CENTER)
      ? 220
      : !selected.includes(OrderSortBy.BRAND)
      ? 230
      : 180,
  store_manager_email:
    !selected.includes(OrderSortBy.KITCHEN_CENTER) &&
    !selected.includes(OrderSortBy.LOGO) &&
    !selected.includes(OrderSortBy.BRAND)
      ? 350
      : !selected.includes(OrderSortBy.KITCHEN_CENTER) && !selected.includes(OrderSortBy.BRAND)
      ? 350
      : !selected.includes(OrderSortBy.KITCHEN_CENTER)
      ? 260
      : !selected.includes(OrderSortBy.BRAND)
      ? 280
      : 180,
  kitchen_center:
    !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) &&
    !selected.includes(OrderSortBy.LOGO) &&
    !selected.includes(OrderSortBy.BRAND)
      ? 350
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) && !selected.includes(OrderSortBy.LOGO)
      ? 270
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) && !selected.includes(OrderSortBy.BRAND)
      ? 350
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL)
      ? 250
      : !selected.includes(OrderSortBy.BRAND)
      ? 250
      : 200,
  brand:
    !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) &&
    !selected.includes(OrderSortBy.LOGO) &&
    !selected.includes(OrderSortBy.KITCHEN_CENTER)
      ? 320
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) && !selected.includes(OrderSortBy.LOGO)
      ? 270
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) && !selected.includes(OrderSortBy.KITCHEN_CENTER)
      ? 350
      : !selected.includes(OrderSortBy.STORE_MANAGER_EMAIL)
      ? 250
      : !selected.includes(OrderSortBy.KITCHEN_CENTER)
      ? 250
      : 180,
});
