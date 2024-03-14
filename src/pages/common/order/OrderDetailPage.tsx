/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import BurstModeIcon from '@mui/icons-material/BurstMode';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PaymentsIcon from '@mui/icons-material/Payments';
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
// section
import { OrderDetailItem, OrderDetailPageSkeleton, OrderTimeline } from 'sections/order';
import { CreateShipperPaymentModal } from 'sections/shipperPayment';
//redux
import { getCashierReportShift } from 'redux/cashier/cashierSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { changeOrderToReadyDelivery, getOrderDetail } from 'redux/order/orderSlice';
// interface
import { Color, Language, PartnerOrderStatus, PaymentMethod, Role, SystemStatus } from 'common/enums';
import { OrderDetails, OrderStatusActions } from 'common/models';
//
import { ConfirmDialog, Helmet, Label } from 'components';
import { useLocales, useModal } from 'hooks';
import { PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { formatCurrency } from 'utils';

function OrderDetailPage() {
  const { id: orderId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate, currentLang } = useLocales();
  const { handleOpen: handleOpenCreateShipperPaymentModal, isOpen: isOpenCreateShipperPaymentModal } = useModal();
  const { handleOpen: handleOpenModalReadyDelivery, isOpen: isOpenModalConfirmReadyDelivery } = useModal();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { shiftReport } = useAppSelector((state) => state.cashier);
  const { order, isLoading: isLoadingOrder } = useAppSelector((state) => state.order);

  const imageConfirm = order?.orderHistories?.map((history) => history.image);

  const paramsDetails = useMemo(() => {
    return {
      orderId,
      navigate,
    };
  }, [orderId]);

  useEffect(() => {
    dispatch<any>(getOrderDetail(paramsDetails));
    if (userAuth?.roleName === Role.CASHIER) {
      dispatch<any>(getCashierReportShift(navigate));
    }
  }, [paramsDetails]);

  const handleOrderReadyDelivery = () => {
    dispatch<any>(
      changeOrderToReadyDelivery({
        orderId,
        navigate,
      })
    );
  };

  return (
    <>
      <Helmet title={translate('page.title.detail', { model: translate('model.lowercase.order') })} />
      <Container maxWidth="lg">
        {isLoadingOrder ? (
          <OrderDetailPageSkeleton />
        ) : (
          <Box>
            <Stack direction="column" gap={4} mb={5}>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center" gap={1}>
                  <IconButton
                    onClick={
                      userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
                        ? () => navigate(PATH_KITCHEN_CENTER_APP.order.list)
                        : () => navigate(PATH_CASHIER_APP.order.list)
                    }
                  >
                    <KeyboardArrowLeftOutlinedIcon fontSize="medium" color="disabled" />
                  </IconButton>
                  <Typography variant="h4">
                    {translate('model.capitalizeOne.order')} {order?.displayId} - {order?.partner.name}
                  </Typography>

                  <Label
                    color={
                      order?.systemStatus === SystemStatus.IN_STORE
                        ? Color.PRIMARY
                        : order?.systemStatus === SystemStatus.COMPLETED
                        ? Color.SUCCESS
                        : order?.systemStatus === SystemStatus.READY_DELIVERY
                        ? Color.WARNING
                        : order?.systemStatus === SystemStatus.CANCELLED
                        ? Color.ERROR
                        : Color.DEFAULT
                    }
                  >
                    {order?.systemStatus === SystemStatus.IN_STORE
                      ? translate('status.inStore')
                      : order?.systemStatus === SystemStatus.READY_DELIVERY
                      ? translate('status.readyDelivery')
                      : order?.systemStatus === SystemStatus.COMPLETED
                      ? translate('status.completed')
                      : order?.systemStatus === SystemStatus.CANCELLED
                      ? translate('status.cancelled')
                      : ''}
                  </Label>
                </Stack>

                {userAuth?.roleName === Role.CASHIER &&
                  order?.systemStatus === SystemStatus.IN_STORE &&
                  order?.partnerOrderStatus === PartnerOrderStatus.READY && (
                    <Button
                      color="warning"
                      variant="contained"
                      startIcon={<DeliveryDiningIcon />}
                      disabled={shiftReport?.isShiftEnded}
                      onClick={() => {
                        handleOpenModalReadyDelivery(OrderStatusActions.READY_DELIVERY);
                      }}
                    >
                      {translate('status.readyDelivery')}
                    </Button>
                  )}
              </Stack>

              {userAuth?.roleName === Role.CASHIER && shiftReport?.isShiftEnded && (
                <Box pb={0}>
                  <Alert variant="standard" severity="info">
                    {translate('page.alert.transferMoneyNotChangeOrderStatus')}
                  </Alert>
                </Box>
              )}
            </Stack>

            <Grid container columnSpacing={5} rowSpacing={5}>
              <Grid item xs={12} sm={12} md={7.5}>
                <Card>
                  <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%' }}>
                      <Stack
                        gap={1}
                        direction="row"
                        alignItems="center"
                        px={3}
                        py={2}
                        sx={{
                          borderBottom: 1,
                          borderColor: (theme) => theme.palette.grey[400],
                        }}
                      >
                        <ListAltIcon />
                        <Typography variant="subtitle1">
                          {translate('page.title.detail', { model: translate('model.lowercase.order') })}
                        </Typography>
                      </Stack>

                      <Stack px={3} py={2} gap={2}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="subtitle1">
                            {translate('table.partnerOrderId')}:{' '}
                            <Typography variant="body1" component="span">
                              {order?.orderPartnerId}
                            </Typography>
                          </Typography>

                          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
                            <Typography variant="subtitle1">{translate('table.partnerOrderStatus')}:</Typography>
                            <Label
                              color={
                                order?.partnerOrderStatus === PartnerOrderStatus.UPCOMING
                                  ? Color.DEFAULT
                                  : order?.partnerOrderStatus === PartnerOrderStatus.PREPARING
                                  ? Color.INFO
                                  : order?.partnerOrderStatus === PartnerOrderStatus.READY
                                  ? Color.WARNING
                                  : order?.partnerOrderStatus === PartnerOrderStatus.COMPLETED
                                  ? Color.SUCCESS
                                  : order?.partnerOrderStatus === PartnerOrderStatus.CANCELLED
                                  ? Color.ERROR
                                  : Color.DEFAULT
                              }
                            >
                              {order?.partnerOrderStatus === PartnerOrderStatus.UPCOMING
                                ? translate('status.upcoming')
                                : order?.partnerOrderStatus === PartnerOrderStatus.PREPARING
                                ? translate('status.preparing')
                                : order?.partnerOrderStatus === PartnerOrderStatus.READY
                                ? translate('status.ready')
                                : order?.partnerOrderStatus === PartnerOrderStatus.COMPLETED
                                ? translate('status.completed')
                                : order?.partnerOrderStatus === PartnerOrderStatus.CANCELLED
                                ? translate('status.cancelled')
                                : ''}
                            </Label>
                          </Stack>
                        </Stack>

                        <Typography variant="subtitle1">
                          {translate('table.store')}:{' '}
                          <Typography variant="body1" component="span">
                            {order?.store.name}
                          </Typography>
                        </Typography>

                        <Typography variant="subtitle1">
                          {translate('page.content.orderNote')}:{' '}
                          <Typography variant="body1" component="span">
                            {order?.note}
                          </Typography>
                        </Typography>

                        <Typography variant="subtitle1">
                          {translate('page.content.eatingUtensils')}:{' '}
                          <Typography variant="body1" component="span">
                            {order?.cutlery === 1 ? translate('button.yes') : translate('button.no')}
                          </Typography>
                        </Typography>

                        {order?.rejectedReason !== null && (
                          <Typography variant="subtitle1">
                            {translate('page.content.cancelReason')}:{' '}
                            <Typography variant="body1" component="span" color="error">
                              {order?.rejectedReason}
                            </Typography>
                          </Typography>
                        )}

                        <Stack>
                          <Typography variant="subtitle1">
                            {currentLang.value === Language.VIETNAMESE
                              ? translate('page.title.details', { model: translate('model.lowercase.products') })
                              : translate('page.title.details', { model: translate('model.capitalizeOne.products') })}
                            :
                          </Typography>
                          {order?.orderDetails.map((orderDetail, index) => {
                            const isLast = index === order?.orderDetails.length - 1;

                            const orderDetailProps: OrderDetails = orderDetail;

                            return (
                              <Stack
                                sx={{
                                  pb: 1,
                                  border: 0,
                                  borderBottom: isLast ? 0 : 1,
                                  borderStyle: 'dashed',
                                  borderColor: (theme) => theme.palette.grey[400],
                                }}
                              >
                                <OrderDetailItem
                                  key={orderDetail.product.productId}
                                  paddingTop={2}
                                  productDetail={orderDetail.product}
                                  orderDetail={orderDetailProps}
                                  quantity={orderDetail.quantity}
                                  noteContent={orderDetail.note}
                                />
                              </Stack>
                            );
                          })}
                        </Stack>

                        <Divider sx={{ mt: -1 }} />

                        <Stack gap={1} textAlign="right">
                          <Stack direction="row" justifyContent="flex-end" alignItems="center">
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('page.content.subTotalPrice')}
                            </Typography>
                            <Typography width={150} variant="body2">
                              {formatCurrency(order?.subTotalPrice as number)}
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="flex-end" alignItems="center">
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('page.content.tax')} (%)
                            </Typography>
                            <Typography width={150} variant="body2">
                              {order?.tax}
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="flex-end" alignItems="center">
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('page.content.discount')}
                            </Typography>
                            <Typography width={150} variant="body2" color="red">
                              {formatCurrency(order?.totalStoreDiscount as number)}
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="flex-end" alignItems="center">
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('page.content.promotionPrice')}
                            </Typography>
                            <Typography width={150} variant="body2" color="red">
                              {formatCurrency(order?.promotionPrice as number)}
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="flex-end" alignItems="center">
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('page.content.deliveryFee')}
                            </Typography>
                            <Typography width={150} variant="body2">
                              {formatCurrency(order?.deliveryFee as number)}
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="flex-end" alignItems="center">
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('page.content.finalTotalPrice')}
                            </Typography>
                            <Typography width={150} variant="body2">
                              {formatCurrency(order?.finalTotalPrice as number)}
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="flex-end" alignItems="center">
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('page.content.storePartnerCommission')} (%)
                            </Typography>
                            <Typography width={150} variant="body2">
                              {order?.storePartnerCommission}
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="flex-end" alignItems="center">
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('page.content.partnerTaxCommission')} (%)
                            </Typography>
                            <Typography width={150} variant="body2">
                              {order?.taxPartnerCommission}
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="flex-end" alignItems="center">
                            <Typography variant="subtitle1">{translate('page.content.collectedPrice')}</Typography>
                            <Typography width={150} variant="subtitle1">
                              {formatCurrency(order?.collectedPrice as number)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Paper>
                  </Box>
                </Card>

                <Box mt={5}>
                  <OrderTimeline />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={4.5}>
                <Card>
                  <Box width="100%">
                    <Paper sx={{ width: '100%' }}>
                      <Stack
                        gap={1}
                        direction="row"
                        alignItems="center"
                        px={3}
                        py={2}
                        sx={{
                          borderBottom: 1,
                          borderColor: (theme) => theme.palette.grey[400],
                        }}
                      >
                        <InfoIcon />
                        <Typography variant="subtitle1">{translate('page.content.orderInformation')}</Typography>
                      </Stack>
                      <Stack gap={2} p={2}>
                        <Stack gap={1}>
                          <Typography variant="subtitle1">{translate('page.content.shipping')}</Typography>
                          <Typography variant="body2" color={(theme) => theme.palette.grey[500]}>
                            {translate('page.content.customer')}:{' '}
                            <Typography variant="body2" component="span" color="black">
                              {order?.customerName}
                            </Typography>
                          </Typography>

                          <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                            {translate('model.capitalize.phone')}:{' '}
                            <Typography variant="body2" component="span" color="black">
                              {order?.customerPhone}
                            </Typography>
                          </Typography>

                          <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                            {translate('table.address')}:{' '}
                            <Typography variant="body2" component="span" color="black">
                              {order?.address}
                            </Typography>
                          </Typography>
                        </Stack>

                        <Divider />

                        <Stack gap={1}>
                          <Typography variant="subtitle1">{translate('page.content.delivery')}</Typography>
                          <Typography variant="body2" color={(theme) => theme.palette.grey[500]}>
                            {translate('page.content.shipperName')}:{' '}
                            <Typography variant="body2" component="span" color="black">
                              {order?.shipperName}
                            </Typography>
                          </Typography>

                          <Typography variant="body2" color={(theme) => theme.palette.grey[500]}>
                            {translate('page.content.shipperPhone')}:{' '}
                            <Typography variant="body2" component="span" color="black">
                              {order?.shipperPhone}
                            </Typography>
                          </Typography>
                        </Stack>

                        <Divider />

                        <Stack gap={1}>
                          <Typography variant="subtitle1">{translate('page.content.payment')}</Typography>
                          <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('page.content.paymentMethodPartner')}:
                            </Typography>
                            <Label color={Color.PRIMARY}>
                              {order?.paymentMethod.toLowerCase() === PaymentMethod.CASH.toLowerCase()
                                ? translate('status.cash')
                                : translate('status.cashLess')}
                            </Label>
                          </Stack>
                          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('table.status')}:
                            </Typography>
                            <Label color={order?.isPaid ? Color.SUCCESS : Color.ERROR}>
                              {order?.isPaid ? translate('status.paid') : translate('status.notPaid')}
                            </Label>
                          </Stack>
                        </Stack>

                        {userAuth?.roleName === Role.CASHIER &&
                          order?.systemStatus === SystemStatus.READY_DELIVERY &&
                          order.partnerOrderStatus === PartnerOrderStatus.READY && (
                            <>
                              <Divider />

                              <Stack direction="row" justifyContent="flex-end">
                                <Button
                                  variant="outlined"
                                  startIcon={<PaymentsIcon />}
                                  disabled={shiftReport?.isShiftEnded}
                                  onClick={() => {
                                    handleOpenCreateShipperPaymentModal(OrderStatusActions.COMPLETED);
                                  }}
                                >
                                  {order.isPaid
                                    ? translate('button.confirmDelivery')
                                    : translate('button.creation', {
                                        model: translate('model.lowercase.shipperPayment'),
                                      })}
                                </Button>
                              </Stack>
                            </>
                          )}
                      </Stack>
                    </Paper>
                  </Box>
                </Card>

                {imageConfirm &&
                  (imageConfirm[0] ||
                    imageConfirm[1] ||
                    imageConfirm[2] ||
                    imageConfirm[3] ||
                    imageConfirm[4] ||
                    imageConfirm[5]) && (
                    <Box mt={5}>
                      <Card>
                        <Box width="100%">
                          <Paper sx={{ width: '100%' }}>
                            <Stack
                              gap={1}
                              direction="row"
                              alignItems="center"
                              px={3}
                              py={2}
                              sx={{
                                borderBottom: 1,
                                borderColor: (theme) => theme.palette.grey[400],
                              }}
                            >
                              <BurstModeIcon />
                              <Typography variant="subtitle1">
                                {translate('page.title.imageConfirmDelivery')}
                              </Typography>
                            </Stack>
                            <Stack gap={2} p={2}>
                              <img
                                src={
                                  imageConfirm
                                    ? imageConfirm[0] ||
                                      imageConfirm[1] ||
                                      imageConfirm[2] ||
                                      imageConfirm[3] ||
                                      imageConfirm[4] ||
                                      imageConfirm[5]
                                    : ''
                                }
                                alt="order confirm"
                              />
                            </Stack>
                          </Paper>
                        </Box>
                      </Card>
                    </Box>
                  )}
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>

      {isOpenModalConfirmReadyDelivery && (
        <ConfirmDialog
          open={isOpenModalConfirmReadyDelivery}
          onClose={handleOpenModalReadyDelivery}
          onAction={handleOrderReadyDelivery}
          isOrder
          model={order?.orderPartnerId}
          subModel={translate('model.lowercase.readyToDelivery') + '?'}
          color={Color.SUCCESS}
          title={translate('dialog.confirmOrderReadyDeliveryTitle', { model: translate('model.lowercase.order') })}
          description={translate('dialog.confirmOrderReadyDeliveryContent')}
        />
      )}

      {isOpenCreateShipperPaymentModal && (
        <CreateShipperPaymentModal
          isOpen={isOpenCreateShipperPaymentModal}
          handleOpen={handleOpenCreateShipperPaymentModal}
          orderPartnerId={order?.orderPartnerId as string}
          orderId={order?.id as number}
          order={order}
        />
      )}
    </>
  );
}

export default OrderDetailPage;
