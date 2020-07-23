import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import EditableTable from '../utils/EditableTable';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { toNumber, getNumber } from '../../globals/NumberFormat';
import api from '../../globals/api';

const useStyles = makeStyles((theme) => ({
    image: {
        width: 32 * 6.5,
        height: 32 * 6.5,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '80%',
        maxHeight: '80%',
    },
    input: {
        display: 'none'
    },
    dialog: {
        height: '80vh'
    }
}));

var defaultState = {
    name: '',
    price: '',
    image: '',
    products: [],
    alergens: [],
    type: 'product',
    parent: 'root',
    path: 'root',
};

export default function AddItemDialog({ element, open, setOpen, parent, action, path }) {
    const classes = useStyles();
    const [showProducts, setShowProducts] = useState(false);
    const [showAllergens, setShowAllergens] = useState(false);
    const [product, setProduct] = useState(defaultState)
    const [error, setError] = useState({ show: false, message: "Въведете собствено име на служителя" });
    const [success, setSuccess] = useState(false);
    const [del, setDel] = useState(false);

    const handleClose = () => {
        setProduct(defaultState);
        setOpen(false);
    };

    const handleDelete = () => {
        setDel(true);
    }

    const handleAdd = () => {
        let body = { ...product };
        if (body.type === 'product') body.price = getNumber(body.price);

        if (product.name === '') {
            setError({ show: true, message: 'Въведете наименование' });
        } else if (product.type === 'product' && toNumber(product.price) === 0) {
            setError({ show: true, message: 'Цената трябва да е число по-голямо от 0' });
        } else {
            const method = action !== 'update' ? 'POST' : 'PUT';
            api.request(method, 'menus', body)()
                .then(res => {
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 3000);
                })
                .catch(e => {
                    setError({ show: true, message: e.message });
                });

            handleClose();
        }

    };

    const loadImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                setProduct({ ...product, image: e.target.result });
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const rowAdd = (newData, id) => {
        if (product[id]) {
            newData.id = product[id].length;
            setProduct({ ...product, [id]: [...product[id], newData] });
        }
    }
    const rowUpdate = (newData, oldData, id) => {
        if (product[id]) {
            let arr = [...product[id]];
            if (newData.id !== undefined) {
                const index = arr.findIndex((data) => data.id === id);
                arr.splice(index, 1);
                arr.push(newData);
                arr.sort((a, b) => a < b);
                setProduct({ ...product, [id]: [...arr] });
            }
        }
    }
    const rowDelete = (oldData, id) => {
        if (product[id]) {
            let index = product[id].indexOf(oldData),
                arr = [...product[id]];
            if (index !== -1) {
                arr.splice(index, 1);
                for (let i = index; i < arr.length; i++)
                    arr[i].id = i;
                setProduct({ ...product, [id]: [...arr] });
            }
        }
    }

    const fieldChange = (field) => (e) => {
        const value = e.target.value;
        setProduct({ ...product, [field]: value });
    }

    useEffect(() => {
        setProduct({ ...product, parent, path });
        if (element) {
            setProduct({ ...element });
        }
    }, [parent, open, path, element])

    useEffect(() => {
        if (error.show) {
            setTimeout(() => {
                setError({ ...error, show: false });
            }, 3000);
        }
    }, [error])

    return (
        <Dialog open={open} onClose={handleClose} >
            <Snackbar open={(error.show || success)} autoHideDuration={3000}>
                <Alert severity={`${error.show ? 'error' : 'success'}`} variant="filled">
                    {error.show ? error.message : 'Записано'}
                </Alert>
            </Snackbar>
            <DialogTitle id="form-dialog-title">
                <Grid container justify="space-between">
                    <Grid item>Описание</Grid>
                    <Grid item>
                        <RadioGroup row name="position" defaultValue={product.type} onChange={fieldChange('type')}>
                            <FormControlLabel
                                value="product"
                                control={<Radio color="primary" />}
                                label="Продукт"
                                labelPlacement="left"
                                disabled={action === 'update' ? true : false}
                            />
                            <FormControlLabel
                                value="group"
                                control={<Radio color="primary" />}
                                label="Група"
                                labelPlacement="left"
                                disabled={action === 'update' ? true : false}
                            />
                        </RadioGroup>
                    </Grid>
                </Grid>

            </DialogTitle>
            <DialogContent className={classes.dialog}>
                <Grid container direction="row" justify="space-between" spacing={2} >
                    <Grid item className={classes.image} container alignItems="center" spacing={1}>
                        <Grid item >
                            <img className={classes.img} src={product.image ? product.image : 'https://placehold.it/200x200'} />
                        </Grid>
                        <Grid item container justify="center">
                            <Grid item>
                                <input accept="image/*" className={classes.input} id="photo" type="file" onChange={loadImage} />
                                <label htmlFor="photo">
                                    <Button component="span" endIcon={<PhotoCamera />} variant="outlined">
                                        Снимка
                                </Button>
                                </label>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs container spacing={1} >
                        <Grid item xs={12}>
                            <TextField required label="Наименование" defaultValue={product.name} onChange={fieldChange('name')} autoFocus fullWidth />
                        </Grid>
                        {product.type === 'product' && <Grid item xs={6} component={FormControl}>
                            <InputLabel htmlFor="price">Цена *  </InputLabel>
                            <Input required onChange={fieldChange('price')} defaultValue={product.price} endAdornment={<InputAdornment position="end">лв.</InputAdornment>} />
                        </Grid>}
                        {product.type === 'product' && <Grid item xs={6} alignContent="start">
                            <FormControlLabel control={<Switch checked={showProducts} color="primary" size="small" onChange={(e) => setShowProducts(e.target.checked)} />} label="Продукти" labelPlacement="start" />
                            <FormControlLabel control={<Switch checked={showAllergens} color="primary" size="small" onChange={(e) => setShowAllergens(e.target.checked)} />} label="Алергени" labelPlacement="start" />
                        </Grid>}
                    </Grid>
                    {product.type === 'product' && showProducts &&
                        <Grid item container>
                            <Grid item xs={12}>
                                <EditableTable
                                    title="Продукти"
                                    columns={[
                                        { title: 'Име', field: 'name' },
                                        { title: 'Количество', field: 'quantity' },
                                    ]}
                                    id="products"
                                    data={product.products}
                                    rowUpdate={rowUpdate}
                                    rowAdd={rowAdd}
                                    rowDelete={rowDelete}
                                />
                            </Grid>
                        </Grid>}
                    {product.type === 'product' && showAllergens && <Grid item container>
                        <Grid item xs={12}>
                            <EditableTable
                                title="Алергени"
                                columns={[
                                    { title: 'Наименование', field: 'name' },
                                    { title: 'Код', field: 'code' },
                                ]}
                                id="allergens"
                                data={product.allergens}
                                rowUpdate={rowUpdate}
                                rowAdd={rowAdd}
                                rowDelete={rowDelete}
                            />
                        </Grid>
                    </Grid>}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Затвори
                </Button>
                <Button onClick={handleAdd} color="primary">
                    Запази
                </Button>
                {action === 'update' && <Button onClick={handleDelete} color="secondary">
                    Изтрий
                </Button>}
            </DialogActions>
            <DeleteConfirmationDialog open={del} setOpen={setDel} externalClose={setOpen} path={product.path} />
        </Dialog>
    );
}