import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { useEffect, useState } from "react";

export const RepoDetails = (props) => {
  const { owner, project } = props;
  const [description, setDescription] = useState("");

  useEffect(() => {
    const data = async () => {
      const response = await fetch(`https://api.github.com/repos/${owner}/${project}`);
      const data = await response.json();
      return data
    };

    data().then((result) => {
      setDescription(result.description)
    });
  }, [project]);

  return (

    <Typography>
      {description}
    </Typography>
  )
};



RepoDetails.propTypes = {
  owner: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
};
