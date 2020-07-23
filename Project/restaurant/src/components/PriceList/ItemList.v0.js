import React from "react";
import Rating from '@material-ui/lab/Rating';
import "../utils/css/Table.css";
import { formatNumber } from '../utils/functions/NumberFormat'

function ItemList({ data, columns, removeItemEv, combineInPackageEv, editItemEv, actions, ...rest }) {
    function _rowRenderer(row) {
        return (
            <div className="Table-row" key={row._id} style={{ marginBottom: '0.3em', display: 'flex', border: '1px solid #dadada' }}>
                <div style={{ width: '60px', height: '60px', textAlign: 'center', display: 'block' }}>
                    <img style={{ maxWidth: '60px', maxHeight: '60px', objectFit: 'fill' }} alt="cant open" src={row.image ? row.image : 'https://placehold.it/60x60'} className="responsive-img" />
                </div>
                <div style={{ width: 'calc(100% - 60px)', height: 'calc(100% - 60px)', padding: '0 0.5em' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '90%',  fontSize: '1.4rem' }}>{row.name}</div>
                        <div style={{ width: '10%', textAlign: 'right' }}>{row.price}лв.</div>
                    </div>
                    <div style={{ display: 'flex' }}>

                        <div style={{ width: '25%', textAlign: 'right' }}>Цена лв.</div>
                        <div style={{ width: '25%', textAlign: 'right' }}>
                            <Rating name="read-only" value={Math.random() * 4} readOnly />
                        </div>
                    </div>
                </div>
                <div className="Table-row-edit-label">
                    {actions.map(data => <span onClick={() => data.function}>{data.text}</span>)}
                </div>
            </div>
        );
    }

    return (
        <div style={{ height: '100%', maxHeight: '100%', overflowY: 'auto', width: '100%' }}>
            {
                (data || []).map(row => _rowRenderer(row))
            }
        </div>
    )
};

export default ItemList;