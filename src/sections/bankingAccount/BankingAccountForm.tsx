// @mui
import { Grid, Stack, Typography } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { Language } from 'common/enums';
import { InputField, InputNumber, UploadImageField } from 'components';
import { useLocales } from 'hooks';

function BankingAccountForm() {
  const { translate, currentLang } = useLocales();

  const { isEditing } = useAppSelector((state) => state.bankingAccount);

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="start" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.logo')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.contentLogo', { model: translate('model.lowercase.bankingAccount') })}
            </Typography>
          </Stack>
          <UploadImageField
            label={translate('page.content.dragDrop')}
            subLabel={translate('page.content.imageAllowed')}
            captionWidth={200}
            name="BankLogo"
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
              {translate('table.name')}, {translate('table.lowercase.numberAccount')},...
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <InputField
              fullWidth
              name="BankName"
              label={translate(
                'page.form.nameExchange',
                currentLang.value === Language.ENGLISH
                  ? {
                      model: translate('model.capitalizeOne.bankingAccount'),
                      name: translate('page.form.nameLower'),
                    }
                  : {
                      model: translate('page.form.name'),
                      name: translate('model.lowercase.bankingAccount'),
                    }
              )}
            />
            <InputNumber fullWidth name="NumberAccount" label={translate('page.form.numberAccount')} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default BankingAccountForm;
