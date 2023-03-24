import PropTypes from 'prop-types';
import {
  Card,
  Box,
  Divider,
  Grid,
  Typography,
  Stack,
  CardContent,
  SvgIcon,
} from '@mui/material';

import { useEffect, useState } from "react";

import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ConstructionIcon from '@mui/icons-material/Construction';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';


export const PullRequets = (props) => {
  const {title } = props;

  const [prs, setPrs] = useState([]);

  useEffect(() => {
      const datas = async () => {
        const response = await fetch(`https://o7w9xzmw51.execute-api.us-east-1.amazonaws.com/staging/list/org/21003710/project/65600975/prs`);
        const data = await response.json();
        return data
      };

      datas().then((result) => {

        const newArray = [];
        result.prs.forEach(element => {
          newArray.push(element.all_size)
        });

        setPrs(newArray)
      });
  }, []);

  console.log("POPUP PRS", prs)
  return (
    <Card>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >

        <CardContent>
          <Typography
            align="center"
            gutterBottom
            variant="h6"
          >
            {title}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />

        <Stack
          alignItems="center"
          direction="row"
          display="block"
          justifyContent="left"
          // spacing={2}
          sx={{ p: 2 }}
        >

          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >

            <Grid container >
              <Grid item md={12} xs={12}>

                <Grid container spacing={2} >
                  <Grid item md={0.9} xs={12}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                      display="flex"
                    >
                      <InfoIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1} xs={12}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"

                    >
                      Total PRs
                    </Typography>
                  </Grid>

                  <Grid item md={1} xs={12}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      1
                    </Typography>

                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >

            <Grid container >
              <Grid item md={12} xs={12}>

                <Grid container spacing={2} >
                  <Grid item md={0.9} xs={12}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                    >
                      <ForkRightIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1} xs={12}>
                    <Typography
                      color="text.secondary"
                      display="inline"
                      variant="body2"
                    >
                      Creators
                   </Typography>
                  </Grid>

                  <Grid item md={1} xs={12}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      1
                        </Typography>

                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >

            <Grid container >
              <Grid item md={12} xs={12}>

                <Grid container spacing={2} >
                  <Grid item md={0.9} xs={12}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                    >
                      <ConstructionIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1} xs={12}>
                    <Typography
                      color="text.secondary"
                      display="inline"
                      variant="body2"
                    >
                      Reviews
                   </Typography>
                  </Grid>

                  <Grid item md={1} xs={12}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      1
                        </Typography>

                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >

            <Grid container >
              <Grid item md={12} xs={12}>

                <Grid container spacing={2} >
                  <Grid item md={0.9} xs={12}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                    >
                      <StarIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1} xs={12}>
                    <Typography
                      color="text.secondary"
                      display="inline"
                      variant="body2"
                    >
                      Reviewers
                  </Typography>
                  </Grid>

                  <Grid item md={1} xs={12}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      1
                        </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Card>
    </Card>

  );
};

PullRequets.propTypes = {
  title: PropTypes.string.isRequired,
};
