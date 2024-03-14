import moment from 'moment';
// @mui
import HistoryIcon from '@mui/icons-material/History';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Box, Card, Paper, Stack, Typography } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
// interface
import { Color, PartnerOrderStatus, SystemStatus } from 'common/enums';
import { OrderHistory } from 'common/models';
//
import { Label } from 'components';
import { useLocales } from 'hooks';

export default function OrderTimeline() {
  const { translate } = useLocales();

  const { order } = useAppSelector((state) => state.order);

  const createDate = order?.orderHistories?.map((history: OrderHistory) => history.createdDate);

  return (
    <Card>
      <Box width="100%" pb={2}>
        <Paper sx={{ width: '100%' }}>
          <Stack gap={1} direction="row" alignItems="center" px={3} py={2}>
            <HistoryIcon />
            <Typography variant="subtitle1">{translate('model.capitalizeOne.orderHistories')}</Typography>
          </Stack>

          <Stack
            py={1}
            px={7}
            sx={{
              mb: 4.5,
              borderTop: 1,
              borderBottom: 1,
              borderColor: (theme) => theme.palette.grey[400],
              bgcolor: (theme) => theme.palette.grey[200],
            }}
          >
            <Typography>
              {translate('table.createdDate')}:{' '}
              <Typography variant="subtitle1" component="span">
                {moment(createDate ? createDate[0] : '').format('DD/MM/YYYY')}
              </Typography>
            </Typography>
          </Stack>

          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.6,
              },
            }}
          >
            {order?.orderHistories &&
              order?.orderHistories?.map((orderHistory, index) => {
                const isLast = index === order?.orderHistories.length - 1;

                return (
                  <TimelineItem key={orderHistory.orderHistoryId}>
                    <TimelineOppositeContent color="text.secondary">
                      {moment(orderHistory?.createdDate).format('HH:mm:ss')}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      {!isLast && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Stack direction="column" gap={2} pb={3}>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Typography variant="subtitle2" component="span">
                            {translate('table.partnerOrderStatus')}
                          </Typography>
                          <Label
                            color={
                              orderHistory?.partnerOrderStatus === PartnerOrderStatus.UPCOMING
                                ? Color.DEFAULT
                                : orderHistory?.partnerOrderStatus === PartnerOrderStatus.PREPARING
                                ? Color.INFO
                                : orderHistory?.partnerOrderStatus === PartnerOrderStatus.READY
                                ? Color.WARNING
                                : orderHistory?.partnerOrderStatus === PartnerOrderStatus.COMPLETED
                                ? Color.SUCCESS
                                : orderHistory?.partnerOrderStatus === PartnerOrderStatus.CANCELLED
                                ? Color.ERROR
                                : Color.ERROR
                            }
                          >
                            {orderHistory?.partnerOrderStatus === PartnerOrderStatus.UPCOMING
                              ? translate('status.upcoming')
                              : orderHistory?.partnerOrderStatus === PartnerOrderStatus.PREPARING
                              ? translate('status.preparing')
                              : orderHistory?.partnerOrderStatus === PartnerOrderStatus.READY
                              ? translate('status.ready')
                              : orderHistory?.partnerOrderStatus === PartnerOrderStatus.COMPLETED
                              ? translate('status.completed')
                              : orderHistory?.partnerOrderStatus === PartnerOrderStatus.CANCELLED
                              ? translate('status.cancelled')
                              : translate('status.cancelled')}
                          </Label>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Typography variant="subtitle2" component="span">
                            {translate('table.systemStatus')}
                          </Typography>
                          <Label
                            color={
                              orderHistory?.systemStatus === SystemStatus.IN_STORE
                                ? Color.PRIMARY
                                : orderHistory?.systemStatus === SystemStatus.COMPLETED
                                ? Color.SUCCESS
                                : orderHistory?.systemStatus === SystemStatus.READY_DELIVERY
                                ? Color.WARNING
                                : orderHistory?.systemStatus === SystemStatus.CANCELLED
                                ? Color.ERROR
                                : Color.ERROR
                            }
                          >
                            {orderHistory?.systemStatus === SystemStatus.IN_STORE
                              ? translate('status.inStore')
                              : orderHistory?.systemStatus === SystemStatus.READY_DELIVERY
                              ? translate('status.readyDelivery')
                              : orderHistory?.systemStatus === SystemStatus.COMPLETED
                              ? translate('status.completed')
                              : orderHistory?.systemStatus === SystemStatus.CANCELLED
                              ? translate('status.cancelled')
                              : translate('status.cancelled')}
                          </Label>
                        </Stack>
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
          </Timeline>
        </Paper>
      </Box>
    </Card>
  );
}
