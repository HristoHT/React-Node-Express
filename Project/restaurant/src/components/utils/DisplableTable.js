import React, { useState, useEffect } from "react";
import { SortIndicator, AutoSizer, Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';
import "./css/Table.css";

function TableGrid({ data, columns, rowClicked, ...rest }) {
  let firstVisiblecol = '';
  for (let i = 0; i < columns.length && firstVisiblecol === ''; i++)
    !columns[i].hidden && (firstVisiblecol = columns[i].field);

  const [sortState, setSortState] = useState({ sortBy: firstVisiblecol, sortDirection: 'ASC' });

  _sort(sortState);

  function _sort({ sortBy, sortDirection }) {
    data.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortDirection === 'ASC' ? -1 : 1;
      else if (a[sortBy] > b[sortBy]) return sortDirection === 'ASC' ? 1 : -1;
      return 0;
    })
  }

  function sort({ sortBy, sortDirection }) {
    setSortState({ sortBy, sortDirection });
  }


  function headerRenderer({ label, dataKey }) {
    return (
      <>
        <span title={label}>{label}</span>
        {dataKey === sortState.sortBy && (
          <SortIndicator sortDirection={sortState.sortDirection} />
        )}
      </>
    );
  }

  function _rowClicked({ ...props }) {
    typeof rowClicked === 'function' && rowClicked({ ...props });
  }

  function cellRenderer(obj) {

  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          //style={{height:'90%'}}
          width={width}
          height={500}
          cellRenderer={cellRenderer}

          headerHeight={50}
          rowHeight={45}

          rowCount={data.length}
          rowGetter={({ index }) => data[index]}

          rowClassName="Table-row"
          onRowClick={_rowClicked}

          overscanRowCount={100}

          sort={sort}
          sortBy={sortState.sortBy}
          sortDirection={sortState.sortDirection}
        >
          {columns.map(col => (
            <Column label={col.title} sortable={col.sortable ? true : false} dataKey={col.field} width={col.width ? width * col.width : 0} headerRenderer={headerRenderer} />
          ))}
        </Table>)}
    </AutoSizer>
  )
};

export default TableGrid;