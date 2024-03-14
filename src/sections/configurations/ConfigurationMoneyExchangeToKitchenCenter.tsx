/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import moment from 'moment';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
// @mui
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Button, FormControlLabel, InputAdornment, Stack, Switch, TextField, Typography } from '@mui/material';
import { TimeView } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
//
import { TimePickerField } from 'components';
import { useLocales } from 'hooks';

interface ConfigurationMoneyExchangeToKitchenCenterProps {
  checkedKCTime: boolean;
  setCheckedKCTime: Dispatch<SetStateAction<boolean>>;
}

function ConfigurationMoneyExchangeToKitchenCenter({
  checkedKCTime,
  setCheckedKCTime,
}: ConfigurationMoneyExchangeToKitchenCenterProps) {
  const { translate } = useLocales();

  const [valueInput, setValueInput] = useState<string>('');
  const [view, setView] = useState<TimeView>('hours');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedKCTime(event.target.checked);
  };

  const { watch } = useFormContext();

  const scrawlingMoneyExchangeToKitchenCenter = watch('scrawlingMoneyExchangeToKitchenCenter');

  useEffect(() => {
    setValueInput(moment(dayjs(scrawlingMoneyExchangeToKitchenCenter).toDate()).format('HH:mm:ss'));
  }, [scrawlingMoneyExchangeToKitchenCenter]);

  return (
    <Box>
      <Stack mb={2}>
        <FormControlLabel
          control={
            <Switch checked={checkedKCTime} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
          }
          label={translate('page.content.switchToConfiguration')}
          labelPlacement="start"
        />
      </Stack>
      <Stack direction="column" alignItems="center" width="100%">
        <Stack direction="row" gap={2} width="100%">
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
            label={translate('table.time')}
            value={valueInput}
            defaultValue={moment(dayjs(scrawlingMoneyExchangeToKitchenCenter).toDate()).format('HH:mm:ss')}
            sx={{
              '.css-1j5h0bl-MuiInputBase-root-MuiOutlinedInput-root': {
                pr: '5px',
              },
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" mt={4}>
          <DemoItem
            label={
              <Stack direction="column" alignItems="left" justifyContent="left">
                <Typography variant="body2">{translate('page.content.selectTimeStart')}</Typography>
                <Box>
                  <Button variant="outlined" size="small" onClick={() => setView('hours')} disabled={!checkedKCTime}>
                    {translate('button.editHours')}
                  </Button>
                </Box>
              </Stack>
            }
          >
            <TimePickerField
              name="scrawlingMoneyExchangeToKitchenCenter"
              ampm={false}
              disabled={!checkedKCTime}
              setView={setView}
              view={view}
            />
          </DemoItem>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ConfigurationMoneyExchangeToKitchenCenter;
