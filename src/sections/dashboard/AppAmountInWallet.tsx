import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader, Stack } from '@mui/material';
//
import { useChart } from 'components/chart';
import { fCurrencyVN } from 'utils';
import moment from 'moment';

interface AppAmountInWalletProps {
  title: string;
  subheader: string;
  chartLabels: string[];
  chartData: any[];
}

function AppAmountInWallet({ title, subheader, chartLabels, chartData }: AppAmountInWalletProps) {
  const chartOptions = useChart({
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
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
      </Stack>

      <Box sx={{ mx: 3, mt: 3 }} dir="ltr">
        <ReactApexChart type="area" series={chartData} options={chartOptions} height={400} />
      </Box>
    </Card>
  );
}

export default AppAmountInWallet;
