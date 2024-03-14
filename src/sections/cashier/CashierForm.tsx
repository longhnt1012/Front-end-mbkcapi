// @mui
import { Grid, Stack, Typography } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { GENDER_OPTIONS, Gender } from 'common/enums';
import { DatePickerField, InputField, InputNumber, SelectField, UploadImageField } from 'components';
import { useLocales } from 'hooks';

function CashierForm() {
  const { translate } = useLocales();

  const { isEditing } = useAppSelector((state) => state.cashier);

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('table.image')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.contentLogo', { model: translate('model.lowercase.cashier') })}
            </Typography>
          </Stack>
          <UploadImageField
            label={translate('page.content.dragDrop')}
            subLabel={translate('page.content.imageAllowed')}
            name="avatar"
            captionWidth={200}
            defaultValue=""
            isEditing={isEditing}
          />
        </Stack>
      </Grid>
      <Grid item md={8} sm={12}>
        <Stack gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.detail')}</Typography>
            <Typography variant="body2" color="grey.600">
              Email, {translate('table.fullName')}, {translate('table.gender')},...
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <InputField disabled={isEditing} fullWidth name="email" label="Email" />
            <InputField fullWidth name="fullName" label={translate('table.fullName')} />
            <Stack direction="row" alignItems="start" gap={2}>
              <SelectField<Gender> fullWidth options={GENDER_OPTIONS} name="gender" label={translate('table.gender')} />
              <DatePickerField fullWidth name="dateOfBirth" label={translate('model.capitalizeOne.dateOfBirth')} />
            </Stack>
            <InputNumber fullWidth name="citizenNumber" label={translate('model.capitalizeOne.citizenNumber')} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default CashierForm;
