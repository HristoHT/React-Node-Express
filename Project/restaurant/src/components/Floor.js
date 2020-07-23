import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddTableDialog from './AddTableDialog';
import Table from './Table';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const Floor = ({ data, ...rest }) => {
    const classes = useStyles();
    const [bool, setBool] = useState(false);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} style={{ backgroundColor: 'red' }}>
                <div style={{ width: '100%', height: '80vh', backgroundColor: '#e1e1e1', position: 'relative' }}>
                    {data.tables.map(e => <Table table={e} />)}
                </div>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container justify="space-around" spacing={4}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Наименование на помещение" variant="outlined" defaultValue={data.name} />
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="outlined" onClick={() => setBool(!bool)}>Добави маса</Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="outlined" endIcon={<SaveIcon />}>Запази</Button>
                    </Grid>
                </Grid>
            </Grid>
            <AddTableDialog open={bool} setOpen={setBool} />
        </Grid>
    )
}

export default Floor;