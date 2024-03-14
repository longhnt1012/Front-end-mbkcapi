// @mui
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
import { Box, Card, Container, Divider, Grid, IconButton, Paper, Skeleton, Stack } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { Role } from 'common/enums';

function OrderDetailPageSkeleton() {
  const { userAuth } = useAppSelector((state) => state.auth);

  return (
    <Container maxWidth="lg">
      <Stack mb={4} direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={1}>
          <IconButton color="inherit">
            <Skeleton variant="circular" width={28} height={28} />
          </IconButton>
          <Skeleton variant="rounded" width={290} height={24} />
          <Skeleton variant="rounded" width={130} height={24} />
        </Stack>

        {userAuth?.roleName === Role.CASHIER && (
          <Stack>
            <Skeleton variant="rounded" width={180} height={40} />
          </Stack>
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
                  <Skeleton width={160} />
                </Stack>

                <Stack px={3} py={2} gap={2}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Skeleton width={200} />

                    <Stack direction="row" justifyContent="space-between" gap={1}>
                      <Skeleton width={140} />
                      <Skeleton variant="rounded" width={100} height={24} />
                    </Stack>
                  </Stack>

                  <Skeleton width={270} />
                  <Skeleton />

                  <Stack gap={1}>
                    <Skeleton width={200} />
                    <Skeleton variant="rounded" height={70} />
                  </Stack>

                  <Divider />

                  <Stack gap={1} alignItems="end">
                    <Skeleton width={250} />
                    <Skeleton width={250} />
                    <Skeleton width={250} />
                    <Skeleton width={250} />
                    <Skeleton width={250} />
                    <Skeleton width={250} />
                    <Skeleton width={250} />
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4.5}>
          <Stack gap={3}>
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
                    <Skeleton width={180} />
                  </Stack>

                  <Stack gap={2} p={2}>
                    <Stack gap={1}>
                      <Skeleton width={160} />
                      <Skeleton width={180} />
                      <Skeleton width={180} />
                      <Skeleton />
                    </Stack>
                    <Divider />
                    <Stack gap={1}>
                      <Skeleton width={180} />
                      <Skeleton width={240} />
                      <Skeleton width={300} />
                    </Stack>
                    <Divider />
                    <Stack gap={1}>
                      <Skeleton width={100} />
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Skeleton width={200} />
                        <Skeleton variant="rounded" width={80} height={24} />
                      </Stack>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                        <Skeleton width={120} />
                        <Skeleton variant="rounded" width={140} height={24} />
                      </Stack>
                    </Stack>
                  </Stack>
                </Paper>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <Grid container columnSpacing={5} rowSpacing={5} mt={0.1}>
        <Grid item xs={12} sm={12} md={7.5}>
          <Card>
            <Box width="100%" pb={2}>
              <Paper sx={{ width: '100%' }}>
                <Stack px={3} py={2}>
                  <Skeleton width={160} />
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
                  <Skeleton width={180} />
                </Stack>

                <Timeline
                  sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                      flex: 0.6,
                    },
                  }}
                >
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      <Stack alignItems="end">
                        <Skeleton width={120} />
                      </Stack>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Stack direction="column" gap={2} pb={3}>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Skeleton width={116} />
                          <Skeleton variant="rounded" width={140} height={24} />
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Skeleton width={130} />
                          <Skeleton variant="rounded" width={140} height={24} />
                        </Stack>
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      <Stack alignItems="end">
                        <Skeleton width={120} />
                      </Stack>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Stack direction="column" gap={2} pb={3}>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Skeleton width={116} />
                          <Skeleton variant="rounded" width={140} height={24} />
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Skeleton width={130} />
                          <Skeleton variant="rounded" width={140} height={24} />
                        </Stack>
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      <Stack alignItems="end">
                        <Skeleton width={120} />
                      </Stack>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Stack direction="column" gap={2} pb={3}>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Skeleton width={116} />
                          <Skeleton variant="rounded" width={140} height={24} />
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Skeleton width={130} />
                          <Skeleton variant="rounded" width={140} height={24} />
                        </Stack>
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      <Stack alignItems="end">
                        <Skeleton width={120} />
                      </Stack>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Stack direction="column" gap={2} pb={3}>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Skeleton width={116} />
                          <Skeleton variant="rounded" width={140} height={24} />
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Skeleton width={130} />
                          <Skeleton variant="rounded" width={140} height={24} />
                        </Stack>
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </Paper>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4.5}></Grid>
      </Grid>
    </Container>
  );
}

export default OrderDetailPageSkeleton;
