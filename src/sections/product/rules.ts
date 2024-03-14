import { OrderSortBy } from 'common/@types';

export const getRuleWidths = (selected: readonly string[], inTab: boolean) => ({
  name:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 550
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 500
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 400
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 400
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 400
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 400
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 400
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 400
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 400
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 360
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 360
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 360
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 360
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 360
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 360
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 360
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 300
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 220
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER)
      ? 220
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 220
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 220
      : !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 220
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.IMAGE)
      ? 220
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.IMAGE)
      ? 220
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.TYPE) &&
        !selected.includes(OrderSortBy.IMAGE)
      ? 220
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 220
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 220
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 220
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 220
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.CATEGORY) && !selected.includes(OrderSortBy.TYPE)
      ? 180
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) && !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 180
      : 160,
  code:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 400
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 360
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 300
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 280
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 220
      : !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 180
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 180
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 180
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 180
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : !selected.includes(OrderSortBy.CATEGORY) && !selected.includes(OrderSortBy.TYPE)
      ? 180
      : !selected.includes(OrderSortBy.DISPLAY_ORDER)
      ? 150
      : !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 150
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 150
      : !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 150
      : !selected.includes(OrderSortBy.CATEGORY)
      ? 150
      : !selected.includes(OrderSortBy.TYPE)
      ? 150
      : 160,
  display_order:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 400
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 360
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 200
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 200
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 200
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 200
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 200
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER)
      ? 150
      : !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 150
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 150
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 150
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 150
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 150
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 150
      : 130,
  selling_price:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 400
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 360
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 160
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 160
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 160
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 160
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 160
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) && !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? inTab
        ? 120
        : 160
      : !selected.includes(OrderSortBy.DISPLAY_ORDER)
      ? 120
      : !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 120
      : !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 120
      : !selected.includes(OrderSortBy.CATEGORY)
      ? 120
      : !selected.includes(OrderSortBy.TYPE)
      ? 120
      : 130,
  discount_price:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 400
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 360
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 160
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 160
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 160
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 160
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 160
      : !selected.includes(OrderSortBy.DISPLAY_ORDER)
      ? 120
      : !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 120
      : !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 120
      : !selected.includes(OrderSortBy.CATEGORY)
      ? 120
      : !selected.includes(OrderSortBy.TYPE)
      ? 120
      : 130,
  historical_price:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 450
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 360
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 160
      : !selected.includes(OrderSortBy.DISPLAY_ORDER)
      ? 120
      : !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 120
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 120
      : !selected.includes(OrderSortBy.CATEGORY)
      ? 120
      : !selected.includes(OrderSortBy.TYPE)
      ? 120
      : 130,
  category:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 400
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 360
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 300
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 280
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 220
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 180
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.TYPE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 180
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 180
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) && !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 160
      : 140,
  type:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY)
      ? 400
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 360
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 300
      : !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 280
      : !selected.includes(OrderSortBy.SELLING_PRICE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 220
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 180
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 140
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 140
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 160
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.SELLING_PRICE)
      ? 180
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? 180
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : !selected.includes(OrderSortBy.CODE) &&
        !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
        !selected.includes(OrderSortBy.CATEGORY)
      ? 180
      : !selected.includes(OrderSortBy.DISCOUNT_PRICE) && !selected.includes(OrderSortBy.DISCOUNT_PRICE)
      ? inTab
        ? 120
        : 160
      : 120,
});
