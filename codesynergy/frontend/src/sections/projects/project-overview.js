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
import { OpenSource } from 'src/contexts/context';
import { useContext } from "react";


export const Overview = (props) => {
  const { title, project } = props;

  const [pullRequests, setPullRequests] = useState(0);
  const [pullRequestCreators, setPullRequestCreators] = useState(0);
  const [pullRequestReviews, setPullRequestReviews] = useState(0);
  const [pullRequestReviewers, setPullRequestReviewers] = useState(0);
  const [issuesRequests, setIssuesRequests] = useState(0);
  const [issuesRequestCreators, setIssuesRequestCreators] = useState(0);
  const [issuesRequestComments, setIssuesRequestComments] = useState(0);
  const [issuesRequestCommenters, setIssuesRequestCommenters] = useState(0);

  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);
  const [bots, setBots] = useState(0);
  const [commits, setCommits] = useState(0);


  useEffect(() => {
    console.log("USE EFFECT")
    const prdatas = async () => {
      const response = await fetch(`https://o7w9xzmw51.execute-api.us-east-1.amazonaws.com/staging/list/project/${project}/prs/data`);
      const data = await response.json();
      return data
    };

    prdatas().then((prs) => {
      console.log("BACKEND PR RESULT", prs)
      setPullRequests(prs.pullRequests)
      setPullRequestCreators(prs.pullRequestCreators)
      setPullRequestReviews(prs.pullRequestReviews)
      setPullRequestReviewers(prs.pullRequestReviewers)
    });

    console.log("USE EFFECT")
    const issuesdatas = async () => {
      const response = await fetch(`https://o7w9xzmw51.execute-api.us-east-1.amazonaws.com/staging/list/project/${project}/issues/data`);
      const data = await response.json();
      return data
    };

    issuesdatas().then((issues) => {
      console.log("BACKEND ISSUES RESULT", issues)
      setIssuesRequests(issues.issuesRequests)
      setIssuesRequestCreators(issues.issuesRequestCreators)
      setIssuesRequestComments(issues.issuesRequestComments)
      setIssuesRequestCommenters(issues.issuesRequestCommenters)
    });


    console.log("USE EFFECT")
    const additionaldatas = async () => {
      const response = await fetch(`https://o7w9xzmw51.execute-api.us-east-1.amazonaws.com/staging/list/project/${project}/additional/data`);
      const data = await response.json();
      return data
    };

    additionaldatas().then((additional) => {
      console.log("BACKEND ADDITIONAL RESULT", additional)
      setStars(additional.stars)
      setForks(additional.forks)
      setBots(additional.bots)
      setCommits(additional.commits)
    });


  }, [project]);

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
          <Box sx={{ flexGrow: 1 }} />
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >

            <Grid container >
              <Grid item md={12} xs={12}>

                <Grid container spacing={2} >
                  <Grid item md={0.9}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                    >
                      <ForkRightIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      Forks
                    </Typography>
                  </Grid>

                  <Grid item md={1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      {forks}
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
                  <Grid item md={0.9} >
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                    >
                      <StarIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      Stars
                    </Typography>
                  </Grid>

                  <Grid item md={1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      {stars}
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
                <Grid container spacing={2} paddingLeft={0.4} >
                  <Grid item md={0.8}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                    >
                      <GroupAddIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.2}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      Commits
                    </Typography>
                  </Grid>

                  <Grid item md={1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      {commits}
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
                <Grid container spacing={2}>
                  <Grid item md={0.9}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                    >
                      <SmartToyOutlinedIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      Bots
                    </Typography>
                  </Grid>

                  <Grid item md={1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      {bots}
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
                  <Grid item md={0.9}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                      display="flex"
                    >
                      <InfoIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"

                    >
                      Total PRs
                    </Typography>
                  </Grid>

                  <Grid item md={1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      {pullRequests}
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
                  <Grid item md={0.9}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                    >
                      <ForkRightIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      Creators
                    </Typography>
                  </Grid>

                  <Grid item md={1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      {pullRequestCreators}
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
                  <Grid item md={0.9}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                    >
                      <ConstructionIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      Reviews
                    </Typography>
                  </Grid>

                  <Grid item md={1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      {pullRequestReviews}
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
                  <Grid item md={0.9}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                      
                    >
                      <StarIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      Reviewers
                    </Typography>
                  </Grid>

                  <Grid item md={1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      {pullRequestReviewers}
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
                  <Grid item md={0.9}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                      display="flex"
                    >
                      <InfoIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"

                    >
                      Total issues
                    </Typography>
                  </Grid>

                  <Grid item md={1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      {issuesRequests}
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
                  <Grid item md={0.9}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                    >
                      <ForkRightIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      Creators
                    </Typography>
                  </Grid>

                  <Grid item md={1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      {issuesRequestCreators}
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
                  <Grid item md={0.9}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                    >
                      <ConstructionIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      Comments
                    </Typography>
                  </Grid>

                  <Grid item md={1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      {issuesRequestComments}
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
                  <Grid item md={0.9}>
                    <SvgIcon
                      color="action"
                      fontSize="medium"
                    >
                      <StarIcon />
                    </SvgIcon>
                  </Grid>

                  <Grid item md={10.1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      Commenters
                    </Typography>
                  </Grid>

                  <Grid item md={1}>
                    <Typography
                      color="text.secondary"
                      display="flex"
                      variant="body2"
                    >
                      {issuesRequestCommenters}
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

Overview.propTypes = {
  title: PropTypes.string.isRequired,
  project: PropTypes.number.isRequired,
};
