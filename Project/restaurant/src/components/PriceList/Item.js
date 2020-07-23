import React, { useState, useEffect } from "react";
import Rating from '@material-ui/lab/Rating';
import "../utils/css/Table.css";
import { formatNumber } from '../../globals/NumberFormat';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AddItemDialog from './AddItemDialog';

const useStyles = makeStyles((theme) => ({
    row: {
        borderBottom: '1px solid #d9d9d9'
    },
    image_container: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        display: 'flex'
    },
    img: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));
function Item({ row }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpenOptions = (element) => (e) => {
        setOpen(true);
    }

    return (
        <Grid item xs={12} container key={row.index} className={classes.row} spacing={1} alignItems="center">
            <Grid item>
                <div className={classes.image_container}>
                    <img className={classes.img} alt="Няма интернет" src={row.image ? row.image : 'https://placehold.it/60x60'} />
                </div>
            </Grid>
            <Grid item xs container>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        {row.name}
                    </Typography>
                </Grid>
                <Grid item xs={12} container spacing={3}>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {row.price}лв.
                            </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {row.products.map(product => product.name).join(',')}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container alignContent="center" direction="column" justify="space-around">
                    <Grid item>
                        <IconButton onClick={handleOpenOptions(row)} >
                            <SettingsIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <EqualizerIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <AddItemDialog open={open} setOpen={setOpen} action='update' element={row} />
        </Grid>
    );
}

export default Item;