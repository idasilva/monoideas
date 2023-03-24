import PropTypes from 'prop-types';
import {

  Card,
  CardHeader,

  CardContent,
} from '@mui/material';

import { useEffect, useState } from "react";
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';

import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};


export const ChartsGhaphs = () => {
  const chartOptions = useChartOptions();
  const data = {
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
    datasets: [
      {
        label: '# of Votes',
        data: [2, 9, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ]
  }
  return (
    <Card>

      <Card sx={{ height: '100%' }}>
        <CardHeader
          // action={(
          //   <Button
          //     color="inherit"
          //     size="small"
          //     startIcon={(
          //       <SvgIcon fontSize="small">
          //         <ArrowPathIcon />
          //       </SvgIcon>
          //     )}
          //   >
          //     Sync
          //   </Button>
          // )}
          title=""
        />
        <CardContent>
          <Chart
          options={chartOptions}
          height={350}
          type="radar"
          width="100%"
          series={[
            {
              name: 'This month',
              data: [10, 40, 5, 70, 60,30, 3, 50 ,60]
            },

          ]}
          //  type="radar"
          //  data={data}
          />;
        </CardContent>
      </Card>
    </Card>

  );
};

// CompanyCharts.propTypes = {
// };
