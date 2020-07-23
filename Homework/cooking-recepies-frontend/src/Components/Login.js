import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

import '../css/Login.css';

const Login = () => {

  return (
    <div className="row Login">
      <div className="col s12 l6 offset-l3 card center Login-components">
        <h5 className="col s12">Вход</h5>
        <TextField
          required
          id="name"
          label="Име"
          variant="outlined"
          className="col s12 m4 offset-m4"
        />
        <TextField
          required
          id="nickname"
          label="Прякор"
          variant="outlined"
          className="col s12 m4 offset-m4"
        />
        <TextField
          id="password"
          required
          label="Парола"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          className="col s12 m4 offset-m4"
        />
        <br/>
        <div className="col s12">
          <Button variant="contained" style={{ fontSize: 16, fontWeight: 'bold' }}>Вход</Button>
        </div>
      </div>
    </div>
  );

}

export default Login;