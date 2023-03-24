const mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const db = mysql.createConnection({
  host: 'gh-archive-poc.cpupsevu0yrz.sa-east-1.rds.amazonaws.com',
  user: 'idasilva',
  password: 'Gharchivepoc',
  database: 'gh_archive'
});

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get('/list/org/data/:id', function (req, res) {

  var id = req.params.id;

  const q = `
          WITH stars AS (
            SELECT
                ${id} AS org_id, IFNULL(COUNT(DISTINCT actor_login), 0) AS total
            FROM github_events
            WHERE
                type = 'WatchEvent'
                AND org_id = ${id}
                AND action = 'started'
        ), commits AS (
            SELECT
            ${id} AS org_id, IFNULL(SUM(push_distinct_size), 0) AS total
            FROM github_events
            WHERE
                type = 'PushEvent'
                AND org_id = ${id}
        ), forks AS (
            SELECT
            ${id} AS org_id, IFNULL(COUNT(DISTINCT number), 0) AS total
            FROM github_events
            WHERE
                type = 'ForkEvent'
                AND org_id = ${id}
        ),
        bots AS (
            SELECT
            ${id} AS org_id, IFNULL(COUNT(DISTINCT actor_login), 0) AS total
            FROM github_events
            WHERE
              actor_login REGEXP '^(bot-.+|.+bot|.+\\\\[bot\\\\]|.+-bot-.+|robot-.+|.+-ci-.+|.+-ci|.+-testing|.+clabot.+|.+-gerrit|k8s-.+|.+-machine|.+-automation|github-.+|.+-github|.+-service|.+-builds|codecov-.+|.+teamcity.+|jenkins-.+|.+-jira-.+)$'
              AND  org_id = ${id}
        ),
        pull_requests AS (
            SELECT
            ${id} AS org_id, IFNULL(COUNT(DISTINCT number), 0) AS total
            FROM github_events
            WHERE
                type = 'PullRequestEvent'
                AND org_id = ${id}
        ),
        issues AS (
            SELECT
            ${id} AS org_id, IFNULL(COUNT(DISTINCT number), 0) AS total
            FROM github_events
            WHERE
                type = 'IssuesEvent'
                AND org_id = ${id}
        ),
        projects AS (
            SELECT
            ${id} AS org_id, IFNULL(COUNT(DISTINCT repo_id), 0) AS total
            FROM github_events
            WHERE org_id = ${id}
        )
        SELECT
        ${id} AS org_id,
            s.total AS stars,
            c.total AS commits,
            f.total AS forks,
            b.total AS bots,
            p.total AS  pull_requests,
            i.total AS issues,
            pj.total AS projects
        FROM (
            SELECT ${id} AS org_id
        ) sub
        LEFT JOIN stars s ON sub.org_id = s.org_id
        LEFT JOIN commits c ON sub.org_id = c.org_id
        LEFT JOIN forks  f ON sub.org_id = f.org_id
        LEFT JOIN bots  b ON sub.org_id = b.org_id
        LEFT JOIN pull_requests  p ON sub.org_id = p.org_id
        LEFT JOIN issues  i ON sub.org_id = i.org_id
        LEFT JOIN projects  pj ON sub.org_id = pj.org_id
        ;`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    var projects = 0;
    var stars = 0
    var issues = 0
    var forks = 0
    var commits = 0
    var prs = 0
    var bots = 0

    data.forEach(element => {
      // projects.push({
      //   "name": element.repo_name.split('/')[1],
      //   "id": element.repo_id
      // })
      projects = projects + element.projects
      stars = stars + element.stars
      issues = issues + element.issues
      forks = forks + element.forks
      commits = commits + element.commits
      prs = prs + element.pull_requests
      bots = bots + element.bots
    });

    return res.json({
      // "projects": projects,
      "stars": stars,
      "issues": issues,
      "forks": forks,
      "commits": commits,
      "prs": prs,
      "bots": bots,
      "projects": projects
    });
  });
});

app.get('/list/org/projects/:id', function (req, res) {

  var id = req.params.id;

  const q = ` SELECT
                  DISTINCT(repo_name), repo_id
                FROM github_events
                WHERE  org_id = ${id};
                `;
  console.log("query", q)
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }


    var projects = [];

    data.forEach(element => {
      projects.push({
        "name": element.repo_name.split('/')[1],
        "id": element.repo_id
      })
    });

    return res.json({
      "projects": projects,
    });
  });
});


app.get('/list/org/:orgid/project/:repoid/prs', function (req, res) {

  var orgid = req.params.orgid;
  var repoid = req.params.repoid;

  const q = `SELECT event_month,all_size
              FROM (
                  SELECT
                      event_month,
                      COUNT(*) OVER (PARTITION BY event_month) AS all_size,
                      ROW_NUMBER() OVER (PARTITION BY event_month) AS row_num
                  FROM (
                      SELECT
                          DATE_FORMAT(created_at, '%Y-%m-01') as event_month
                      FROM
                          github_events
                      WHERE
                          type = 'PullRequestEvent'
                          AND repo_id = ${repoid}
                          and org_id = ${orgid}
                  ) sub
              ) sub
              WHERE row_num = 1
              ORDER BY event_month
              ;
           `;

  console.log("query", q)
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    console.log("data", data)
    return res.json({
      "prs": data,
    });
  });
});


app.get('/list/project/:id/prs/data', function (req, res) {

  var id = req.params.id;

  const q = `WITH pull_requests AS (
              SELECT
                  ${id} AS repo_id,
                  IFNULL(COUNT(DISTINCT number), 0) AS total
              FROM github_events
              WHERE
                  type = 'PullRequestEvent'
                  AND repo_id = ${id}
          ), pull_request_creators AS (
              SELECT
              ${id} AS repo_id, 
                  IFNULL(COUNT(DISTINCT actor_login), 0) AS total
              FROM github_events
              WHERE
                  type = 'PullRequestEvent'
                  AND repo_id = ${id}
                  AND action = 'opened'
          ), pull_request_reviews AS (
              SELECT
              ${id} AS repo_id,
                  IFNULL(COUNT(1), 0) AS total
              FROM github_events
              WHERE
                  type = 'PullRequestReviewEvent'
                  AND repo_id = ${id}
                  AND action = 'created'
          ), pull_request_reviewers AS (
              SELECT
              ${id} AS repo_id,
                  IFNULL(COUNT(DISTINCT actor_login), 0) AS total
              FROM github_events
              WHERE
                  type = 'PullRequestReviewEvent'
                  AND repo_id = ${id}
                  AND action = 'created'
          )
          SELECT
          ${id} AS repo_id,
              pr.total AS pull_requests,
              prc.total AS pull_request_creators,
              prr.total AS pull_request_reviews,
              prrc.total AS pull_request_reviewers
          FROM (
              SELECT ${id} AS repo_id
          ) sub
          LEFT JOIN pull_requests pr ON sub.repo_id = pr.repo_id
          LEFT JOIN pull_request_creators prc ON sub.repo_id = prc.repo_id
          LEFT JOIN pull_request_reviews prr ON sub.repo_id = prr.repo_id
          LEFT JOIN pull_request_reviewers prrc ON sub.repo_id = prrc.repo_id
          ;
           `;

  console.log("query", q)
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }


    var pull_requests = 0
    var pull_request_creators = 0
    var pull_request_reviews = 0
    var pull_request_reviewers = 0


    data.forEach(element => {
      pull_requests = pull_requests + element.pull_requests
      pull_request_creators = pull_request_creators + element.pull_request_creators
      pull_request_reviews = pull_request_reviews + element.pull_request_reviews
      pull_request_reviewers = pull_request_reviewers + element.pull_request_reviewers
    });

    return res.json({
      "pullRequests": pull_requests,
      "pullRequestCreators": pull_request_creators,
      "pullRequestReviews": pull_request_reviews,
      "pullRequestReviewers": pull_request_reviewers
    });
  });
});




app.get('/list/project/:id/issues/data', function (req, res) {

  var id = req.params.id;

  const q = `WITH issues AS (
                SELECT
                    ${id} AS repo_id, IFNULL(COUNT(DISTINCT number), 0) AS total
                FROM github_events
                WHERE
                    type = 'IssuesEvent'
                    AND repo_id = ${id}
            ), issue_creators AS (
                SELECT
                ${id} AS repo_id, IFNULL(COUNT(DISTINCT actor_login), 0) AS total
                FROM github_events
                WHERE
                    type = 'IssuesEvent'
                    AND repo_id = ${id}
                    AND action = 'opened'
            ), issue_comments AS (
                SELECT
                ${id} AS repo_id, IFNULL(COUNT(1), 0) AS total
                FROM github_events
                WHERE
                    type = 'IssueCommentEvent'
                    AND repo_id = ${id}
                    AND action = 'created'
            ), issue_commenters AS (
                SELECT
                ${id} AS repo_id, IFNULL(COUNT(DISTINCT actor_login), 0) AS total
                FROM github_events
                WHERE
                    type = 'IssueCommentEvent'
                    AND repo_id = ${id}
                    AND action = 'created'
            )
            SELECT
            ${id} AS repo_id,
                i.total AS issues,
                ic.total AS issue_creators,
                ico.total AS issue_comments,
                icc.total AS issue_commenters
            FROM (
                SELECT ${id} AS repo_id
            ) sub
            LEFT JOIN issues i ON sub.repo_id = i.repo_id
            LEFT JOIN issue_creators ic ON sub.repo_id = ic.repo_id
            LEFT JOIN issue_comments ico ON sub.repo_id = ico.repo_id
            LEFT JOIN issue_commenters icc ON sub.repo_id = icc.repo_id
            ;
           `;

  console.log("query", q)
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    var issues_requests = 0
    var issues_request_creators = 0
    var issues_request_comments = 0
    var issues_request_commenters = 0


    console.log("data", data)
    data.forEach(element => {
      issues_requests = issues_requests + element.issues
      issues_request_creators = issues_request_creators + element.issue_creators
      issues_request_comments = issues_request_comments + element.issue_comments
      issues_request_commenters = issues_request_commenters + element.issue_commenters

    });


    return res.json({
      "issuesRequests": issues_requests,
      "issuesRequestCreators": issues_request_creators,
      "issuesRequestComments": issues_request_comments,
      "issuesRequestCommenters": issues_request_commenters
    });
  });
});



app.get('/list/project/:id/additional/data', function (req, res) {

  var id = req.params.id;

  const q = `WITH stars AS (
            SELECT
                  ${id} AS repo_id, IFNULL(COUNT(DISTINCT actor_login), 0) AS total
              FROM github_events
              WHERE
                  type = 'WatchEvent'
                  AND repo_id = ${id}
                  AND action = 'started'
          ), commits AS (
              SELECT
              ${id} AS repo_id, IFNULL(SUM(push_distinct_size), 0) AS total
              FROM github_events
              WHERE
                  type = 'PushEvent'
                  AND repo_id = ${id}
          ), forks AS (
              SELECT
              ${id} AS repo_id, IFNULL(COUNT(DISTINCT number), 0) AS total
              FROM github_events
              WHERE
                  type = 'ForkEvent'
                  AND repo_id = ${id}
          ),
          bots AS (
              SELECT
              ${id} AS repo_id, IFNULL(COUNT(DISTINCT actor_login), 0) AS total
              FROM github_events
              WHERE
                actor_login REGEXP '^(bot-.+|.+bot|.+\\\\[bot\\\\]|.+-bot-.+|robot-.+|.+-ci-.+|.+-ci|.+-testing|.+clabot.+|.+-gerrit|k8s-.+|.+-machine|.+-automation|github-.+|.+-github|.+-service|.+-builds|codecov-.+|.+teamcity.+|jenkins-.+|.+-jira-.+)$'
                AND  repo_id = ${id}
          )
          SELECT
          ${id} AS repo_id,
              s.total AS stars,
              c.total AS commits,
              f.total AS forks,
              b.total AS bots
          FROM (
              SELECT ${id} AS repo_id
          ) sub
          LEFT JOIN stars s ON sub.repo_id = s.repo_id
          LEFT JOIN commits c ON sub.repo_id = c.repo_id
          LEFT JOIN forks  f ON sub.repo_id = f.repo_id
          LEFT JOIN bots  b ON sub.repo_id = b.repo_id
          ;`;

  console.log("query", q)
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    var stars = 0
    var bots = 0
    var forks = 0
    var commits = 0

    data.forEach(element => {
      stars = stars + element.stars
      bots = bots + element.bots
      forks = forks + element.forks
      commits = commits + element.commits
    });

    return res.json({
      "stars": stars,
      "bots": bots,
      "forks": forks,
      "commits": commits,
    });
  });
});

app.listen(3000, function () {
  console.log("App started")
});

module.exports = app
