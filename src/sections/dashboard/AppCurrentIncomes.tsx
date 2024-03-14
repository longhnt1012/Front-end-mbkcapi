/* eslint-disable react-hooks/exhaustive-deps */
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader, Stack } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { Status } from 'common/enums';
import { AutoCompleteField } from 'components';
import { useChart } from 'components/chart';
import { useLocales } from 'hooks';
import { fCurrencyVN } from 'utils';
import moment from 'moment';

interface AppCurrentIncomesProps {
  title: string;
  subheader: string;
  chartLabels: string[];
  chartData: any[];
}

function AppCurrentIncomes({ title, subheader, chartLabels, chartData }: AppCurrentIncomesProps) {
  const { translate } = useLocales();

  const { stores } = useAppSelector((state) => state.store);

  console.log('chartLabels', chartLabels);

  const storeOptions = stores
    .filter((store) => store.status !== Status.BE_CONFIRMING && store.status !== Status.REJECTED)
    .map((store) => ({
      label: store.name,
      value: store.storeId,
    }));

  const getOpObjStore = (option: any) => {
    if (!option) return option;
    if (!option.value) return storeOptions.find((opt) => opt.value === option);
    return option;
  };

  const chartOptions = useChart({
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    stacked: false,
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
      min: chartLabels[6],
      max: chartLabels[0],
      labels: {
        rotate: -45,
        rotateAlways: true,
        formatter: function (val: any, timestamp: any) {
          return moment(new Date(timestamp)).format('DD MMM YY');
        },
      },
    },
    legend: {
      position: 'bottom',
      show: true,
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        format: 'dd/MM/yy',
      },
      y: {
        formatter: (y: any) => {
          if (typeof y !== 'undefined') {
            return `${fCurrencyVN(y)} đ`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CardHeader title={title} subheader={subheader} />

        <Stack direction="row" alignItems="center" gap={2} pt={3} pr={3}>
          <Stack width={300}>
            <AutoCompleteField
              type="text"
              name="storeId"
              label={translate('model.capitalizeOne.stores')}
              options={storeOptions}
              getOptionLabel={(value: any) => {
                return getOpObjStore(value)?.label;
              }}
              isOptionEqualToValue={(option: any, value: any) => {
                if (!option) return option;
                return option.value === getOpObjStore(value)?.value;
              }}
              transformValue={(opt: any) => opt.value}
            />
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ mx: 3, mt: 3 }} dir="ltr">
        <ReactApexChart type="area" series={chartData} options={chartOptions} height={400} />
      </Box>
    </Card>
  );
}

export default AppCurrentIncomes;
