import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,

  CardContent,
} from '@mui/material';

import { useEffect, useState } from "react";
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';


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


export const Charts = (props) => {

  const { project, org } = props;

  const [prs, setPrs] = useState([]);
  const [description, setDescription] = useState("XPTO");

  const chartOptions = useChartOptions();

  useEffect(() => {
    const datas = async () => {
      const response = await fetch(`https://o7w9xzmw51.execute-api.us-east-1.amazonaws.com/staging/list/org/${org}/project/${project}/prs`);
      const data = await response.json();
      return data
    };

    datas().then((result) => {

      console.log("PRS RESULT------> ", result)
      const newArray = [];
      result.prs?.forEach(element => {
        newArray.push(element.all_size)
      });

      setPrs(newArray)
    });

    // const description = async () => {
    //   const response = await fetch(`https://o7w9xzmw51.execute-api.us-east-1.amazonaws.com/staging/list/org/${org}/project/${project}/prs`);
    //   const data = await response.json();
    //   return data
    // };

    // description().then((result) => {
    //   console.log("PRS RESULT------> ", result)
    //   const newArray = [];
    //   result.prs.forEach(element => {
    //     newArray.push(element.all_size)
    //   });

    //   setPrs(newArray)
    // });


  }, [project]);

  console.log("POPUP PRS", prs)
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
          title="PRS - History"
        />
        <CardContent>
          <Chart
            height={350}
            options={chartOptions}

            series={[
              {
                name: 'This month',
                data: prs
              },

            ]}
            type="bar"
            width="100%"
          />
        </CardContent>
      </Card>
    </Card>

  );
};

Charts.propTypes = {
  project: PropTypes.number.isRequired,
  org: PropTypes.string.isRequired,
};
