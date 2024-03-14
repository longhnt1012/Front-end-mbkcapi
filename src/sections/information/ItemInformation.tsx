import { Avatar, Divider } from '@mui/material';
import { Box, Card, Paper, Stack, Typography } from '@mui/material';
import { Brand, KitchenCenter } from 'common/models';
import { Color, Status } from 'common/enums';
import { Label } from 'components';

interface Props {
  isKitchenCenter: boolean;
  kitchenCenter?: KitchenCenter;
  brand?: Brand;
}

function ItemInformation({ isKitchenCenter, kitchenCenter, brand }: Props) {
  return (
    <>
      {isKitchenCenter ? (
        <Card>
          <Box sx={{ width: '100%' }} padding={2}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <Typography variant="subtitle1">Kitchen Center Information</Typography>
              <Stack direction="row" alignItems="center" spacing={2} mt={2} mb={2}>
                <Avatar sx={{ width: 60, height: 60 }} alt={'Kitchen center image'} src={kitchenCenter?.logo} />
                <Stack direction="column" rowGap={0.5}>
                  <Typography variant="body2" noWrap>
                    {kitchenCenter?.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#919EAB;' }} noWrap>
                    {kitchenCenter?.kitchenCenterManagerEmail}
                  </Typography>
                </Stack>
              </Stack>
              <Divider />

              <Typography variant="subtitle2" mt={2}>
                Details
              </Typography>
              <Stack direction="row" spacing={2} mt={1}>
                <Typography sx={{ color: '#919EAB;' }}>Address:</Typography>
                <Typography variant="body2">{kitchenCenter?.address}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={3.5} mt={1} mb={2}>
                <Typography sx={{ color: '#919EAB;' }}>Status:</Typography>
                <Label color={kitchenCenter?.status === Status.ACTIVE ? Color.SUCCESS : Color.ERROR}>
                  {kitchenCenter?.status}
                </Label>
              </Stack>
            </Paper>
          </Box>
        </Card>
      ) : (
        <Card>
          <Box sx={{ width: '100%' }} padding={2}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <Typography variant="subtitle1">Brand Information</Typography>
              <Stack direction="row" alignItems="center" spacing={2} mt={2} mb={2}>
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  alt={'Product Image'}
                  src="/assets/images/avatars/avatar_2.jpg"
                />
                <Stack direction="column" rowGap={0.5}>
                  <Typography variant="body2" noWrap>
                    {brand?.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#919EAB;' }} noWrap>
                    {brand?.brandManagerEmail}
                  </Typography>
                </Stack>
              </Stack>
              <Divider />

              <Typography variant="subtitle2" mt={2}>
                Details
              </Typography>
              <Stack direction="row" spacing={2} mt={1}>
                <Typography sx={{ color: '#919EAB;' }}>Address:</Typography>
                <Typography variant="body2">{brand?.address}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={3.5} mt={1} mb={2}>
                <Typography sx={{ color: '#919EAB;' }}>Status:</Typography>
                <Label color={brand?.status === Status.ACTIVE ? Color.SUCCESS : Color.ERROR}>{brand?.status}</Label>
              </Stack>
            </Paper>
          </Box>
        </Card>
      )}
    </>
  );
}

export default ItemInformation;
