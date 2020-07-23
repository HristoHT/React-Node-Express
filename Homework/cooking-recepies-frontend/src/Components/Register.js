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
      <div className="col s12 m6 offset-m3 card center Login-components">
        <h5 className="col s12">Регистрация</h5>
        <TextField
          required
          id="name"
          label="Име"
          variant="outlined"
          className="col s12 m4"
        />
        <TextField
          required
          id="nickname"
          label="Прякор"
          variant="outlined"
          className="col s12 m4"
        />
        <TextField
          id="password"
          required
          label="Парола"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          className="col s12 m4"
        />
        <br />
        <FormControl variant="outlined" className="col m4 s12">
          <InputLabel style={{ backgroundColor: 'white' }}>Роля</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={0}
          // onChange={handleChange}
          >
            <MenuItem value={0}>Потребител</MenuItem>
            <MenuItem value={1}>Админ</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="col l8 s12">
          <div style={{ border: "1px solid #d0d0d0", borderRadius: '4px', height: '8.5vh', padding: '1rem' }} className="Image-upload valign-wrapper">
            <label htmlFor="img">Select image:</label>
            <input type="file" id="img" name="img" accept="image/*" />
          </div>
        </FormControl>
        <br />
        <TextareaAutosize
          rowsMax={4}
          aria-label="maximum height"
          placeholder="Кратко описание"
          className="col l12 Text-area"
        />
        <br />
        <div className="col s12">
          <Button variant="contained" style={{ fontSize: 16, fontWeight: 'bold' }}>Регистрация</Button>
        </div>
      </div>
    </div>
  );

}

export default Login;