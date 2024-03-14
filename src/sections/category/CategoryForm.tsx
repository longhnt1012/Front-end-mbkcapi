// @mui
import { Grid, Stack, Typography } from '@mui/material';
//redux
import { useAppSelector } from 'redux/configStore';
//
import { CATEGORY_TYPE_OPTIONS, CategoryType } from 'common/models';
import { Language } from 'common/enums';
import { InputField, SelectField, UploadImageField } from 'components';
import { useLocales } from 'hooks';

function CategoryForm() {
  const { translate, currentLang } = useLocales();

  const { isEditing } = useAppSelector((state) => state.category);

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.logo')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.contentLogo', { model: translate('model.lowercase.category') })}
            </Typography>
          </Stack>
          <UploadImageField
            label={translate('page.content.dragDrop')}
            subLabel={translate('page.content.imageAllowed')}
            margin="auto"
            name="imageUrl"
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
              {translate('table.name')}, {translate('table.lowercase.code')}, {translate('table.lowercase.type')},{' '}
              {translate('table.lowercase.description')},...
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <InputField
              fullWidth
              name="name"
              label={translate(
                'page.form.nameExchange',
                currentLang.value === Language.ENGLISH
                  ? {
                      model: translate('model.capitalizeOne.category'),
                      name: translate('page.form.nameLower'),
                    }
                  : {
                      model: translate('page.form.name'),
                      name: translate('model.lowercase.category'),
                    }
              )}
            />
            <InputField
              fullWidth
              name="code"
              disabled={isEditing}
              label={translate(
                'page.form.nameExchange',
                currentLang.value === Language.ENGLISH
                  ? {
                      model: translate('model.capitalizeOne.category'),
                      name: translate('page.form.codeLower'),
                    }
                  : {
                      model: translate('page.form.code'),
                      name: translate('model.lowercase.category'),
                    }
              )}
            />
            <Stack direction="row" alignItems="start" gap={2}>
              <SelectField<CategoryType>
                disabled
                fullWidth
                options={CATEGORY_TYPE_OPTIONS}
                name="type"
                label={translate(
                  'page.form.nameExchange',
                  currentLang.value === Language.ENGLISH
                    ? {
                        model: translate('model.capitalizeOne.category'),
                        name: translate('table.lowercase.type'),
                      }
                    : {
                        model: translate('table.type'),
                        name: translate('model.lowercase.category'),
                      }
                )}
              />
              <InputField type="number" fullWidth name="displayOrder" label={translate('table.displayOrder')} />
            </Stack>
            <InputField fullWidth name="description" label={translate('table.description')} multiline minRows={3} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default CategoryForm;
