/* eslint-disable react-hooks/exhaustive-deps */
// @mui
import { Grid, Stack, Typography } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { Language } from 'common/enums';
import { AutoCompleteField, InputField, UploadImageField } from 'components';
import { useLocales } from 'hooks';

function StoreForm() {
  const { translate, currentLang } = useLocales();

  const { isEditing } = useAppSelector((state) => state.store);
  const { kitchenCenters } = useAppSelector((state) => state.kitchenCenter);

  const kitchenCenterOptions = kitchenCenters.map((kitchenCenter) => ({
    label: kitchenCenter.name,
    value: kitchenCenter.kitchenCenterId,
    address: kitchenCenter.address
      .split(', ')
      .slice(0, kitchenCenter?.address.split(', ').length - 3)
      .join(', '),
    image: kitchenCenter.logo,
  }));

  const getOpObjKitchenCenter = (option: any) => {
    if (!option) return option;
    if (!option.value) return kitchenCenterOptions.find((opt) => opt.value === option);
    return option;
  };

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.logo')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.contentLogo', { model: translate('model.lowercase.store') })}
            </Typography>
          </Stack>
          <UploadImageField
            label={translate('page.content.dragDrop')}
            subLabel={translate('page.content.imageAllowed')}
            margin="auto"
            name="logo"
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
              {translate('table.name')}, {translate('model.lowercase.kitchenCenter')},{' '}
              {translate('model.lowercase.brand')},...
            </Typography>
          </Stack>

          <Stack spacing={2}>
            {/* store name */}
            <InputField
              fullWidth
              name="name"
              label={translate(
                'page.form.nameExchange',
                currentLang.value === Language.ENGLISH
                  ? {
                      model: translate('model.capitalizeOne.store'),
                      name: translate('page.form.nameLower'),
                    }
                  : {
                      model: translate('page.form.name'),
                      name: translate('model.lowercase.store'),
                    }
              )}
            />
            <InputField fullWidth name="storeManagerEmail" label={translate('page.form.managerEmail')} />
            {!isEditing && (
              <Stack direction="row" alignItems="start" gap={2} width="100%">
                <AutoCompleteField
                  options={kitchenCenterOptions}
                  getOptionLabel={(value: any) => {
                    return getOpObjKitchenCenter(value)?.label;
                  }}
                  isOptionEqualToValue={(option: any, value: any) => {
                    if (!option) return option;
                    return option.value === getOpObjKitchenCenter(value)?.value;
                  }}
                  transformValue={(opt: any) => opt.value}
                  name="kitchenCenterId"
                  type="text"
                  label={translate('model.capitalizeOne.kitchenCenter')}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default StoreForm;
