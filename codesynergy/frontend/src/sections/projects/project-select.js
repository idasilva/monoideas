import PropTypes from 'prop-types';

import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, TextField, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useCallback, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { OpenSource } from 'src/contexts/context';


const states = [
  {
    value: 'Landscape',
    label: 'Landscape'
  }
];

export const Select = (props) => {
  const { selected, id, projects } = props;
  const router = useRouter();
  const { data, setData } = useContext(OpenSource);


  // const [values, setValues] = useState({
  //   selected: selected,
  //   id: id
  // });

  // const router = useRouter();


  // console.log("AAAAAAAAAAAAQUIII1", values)

  // const handleChange = useCallback(
  //   (event) => {
  //     console.log("event.target.name",event.target.name)
  //     console.log("event.target.value",event.target.value)
  //     setValues((prevState) => ({
  //       ...prevState,
  //       [event.target.name]: event.target.value
  //     }));


  //     router.push({
  //       pathname: '/analytics/[project]',
  //       query: { project: event.target.value }
  //     });
  //   },
  //   []
  // );


  // const setCallback = () => {
  //   // const { newData } = useContext(OpenSource);
  //   // console.log("CALLBACKLLLLLLLL",newData)
  //   // // window.localStorage.setItem('data', JSON.stringify(data));
  // }


  const handleChange = useCallback(
    (event) => {
      console.log("ENTROUUUUUUUUUUUUUUUUUUUUUUUUUUUUUY AQWUI", event.target.value)
      console.log("event.target.value", event.target.value)

      const found = projects.find(element => element.id == event.target.value);
      console.log("found", found)
      setData((prevState) =>  (
        {
          ...prevState,
          ["project"]: {
            "name": found.name,
            "id": found.id
          }
        }));

      router.push({
        pathname: '/analytics/[project]',
        query: { project: found.name }
      });
    },
    []
  );




  return (

    <TextField
      sx={{ maxWidth: 500 }}
      fullWidth
      label="Project"
      // name="selected"
      // onChange={(option) => {handleChange(option)}}
      defaultValue={id}
      // value={selected}
      required
      onChange={handleChange}
      // onChange={(event) => {
      //   console.log("event.target.name",event.currentTarget.selected)
      //   console.log("event.target.value",event.target.value)
      // }}
      select
      // value={selected}
      SelectProps={{
        native: true,


      }}

    >
      {/* 
      { selected &&
        <option
          key={id}
          value={id}
        >
          {values.selected}
        </option>
      } */}

      {projects?.map((option) => (
        <option
          key={option.id}
          value={option.id}
          name={option.name}
        >
          {option.name}
        </option>
      ))}
    </TextField>


    // <TextField
    // sx={{ maxWidth: 500 }}
    //   fullWidth
    //   label="Project"
    //   name="state"
    //   required
    //   select
    //   SelectProps={{ native: true }}
    // >
    //     {
    //   states.map((option) => (
    //     <option
    //       key={option.value}
    //       value={option.value}
    //     >
    //       {option.label}
    //     </option>
    //   ))
    // }
    // </TextField>
  )
};



Select.propTypes = {
  selected: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  projects: PropTypes.array.isRequired,
};
