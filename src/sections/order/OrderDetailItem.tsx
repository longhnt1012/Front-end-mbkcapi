// @mui
import SellIcon from '@mui/icons-material/Sell';
import { Avatar, Stack, Typography } from '@mui/material';
//
import { OrderDetails, Product } from 'common/models';
//
import { useLocales } from 'hooks';
import { formatCurrency } from 'utils';

interface OrderDetailItemProps {
  padding?: number;
  paddingTop?: number;
  quantity: number;
  noteContent: string;
  productDetail: Product;
  orderDetail: OrderDetails;
}

function OrderDetailItem({
  padding,
  paddingTop,
  productDetail,
  quantity,
  noteContent,
  orderDetail,
}: OrderDetailItemProps) {
  const { translate } = useLocales();

  return (
    <Stack gap={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" p={padding} pt={paddingTop}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Avatar alt={productDetail.name} src={productDetail.image} />
          <Stack direction="column">
            <Typography variant="body2" noWrap>
              {productDetail.name}
            </Typography>
            <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[500] }} noWrap>
              {productDetail.categoryName}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" width="22rem">
          <Typography variant="body2">{formatCurrency(productDetail.sellingPrice)}</Typography>
          <Typography variant="body2">x{quantity}</Typography>
          <Stack direction="column" gap={0.5}>
            <Typography variant="body2">{formatCurrency(quantity * productDetail.sellingPrice)}</Typography>
            {productDetail.discountPrice > 0 && (
              <Stack direction="row" alignItems="center" gap={0.5}>
                <SellIcon sx={{ fontSize: 15 }} color="success" />
                <Typography variant="body2">-{formatCurrency(productDetail.discountPrice)}</Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>

      {orderDetail.extraOrderDetails.length > 0 && (
        <Typography variant="subtitle2">
          {translate('page.content.extraProducts')}:{' '}
          {orderDetail.extraOrderDetails.map((extraOrderDetail, index) => {
            const isLast = index === orderDetail.extraOrderDetails.length - 1;

            return (
              <Typography variant="caption" component="span">
                {extraOrderDetail.product.name} {isLast && '-'}
              </Typography>
            );
          })}
        </Typography>
      )}

      {noteContent && (
        <Typography variant="subtitle2">
          {translate('page.content.note')}:{' '}
          <Typography variant="caption" component="span">
            {noteContent}
          </Typography>
        </Typography>
      )}
    </Stack>
  );
}

export default OrderDetailItem;
