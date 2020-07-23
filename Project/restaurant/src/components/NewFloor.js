// import React from 'react';
// import GridLayout from 'react-grid-layout';
// import Table from './FloorManager/Table.v1';

// class MyFirstGrid extends React.Component {
//   render() {
//     // layout is an array of objects, see the demo for more complete usage
//     const layout = [
//       { i: 'a', x: 0, y: 0, w: 1, h: 2, /* static: true */ color: 'red', isResizable: true },
//       { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4, color: 'green', isResizable: true },
//       { i: 'c', x: 4, y: 0, w: 1, h: 2, color: 'blue', isResizable: true }
//     ];
//     return (
//       // <GridLayout
//       //   className="layout"
//       //   layout={layout}
//       //   cols={12}
//       //   rowHeight={30}
//       //   width={1200}
//       //   draggableHandle=".drag"
//       //   compactType={null}>
//       //   {/* {layout.map(el => <Table key={el.i}>{el.i}</Table>)} */}
//       //   <div key="a" >
//       //     <Table key="a" className="drag">a</Table>
//       //   </div>
//       //   <div key="b">
//       //     <Table key="b">b</Table>
//       //   </div>
//       //   <div key="c">
//       //     <Table key="c">c</Table>
//       //   </div>
//       // </GridLayout>
//       <GridLayout className="layout" cols={12} rowHeight={30} width={1200} compactType={null}>
//         <div key={1} _grid={{ x: 0, y: 0, w: 1, h: 2 }}><Table>a</Table></div>
//         <div key={2} _grid={{ x: 1, y: 0, w: 1, h: 2 }}><Table>a</Table></div>
//         <div key={3} _grid={{ x: 2, y: 0, w: 1, h: 2 }}><Table>a</Table></div>
//       </GridLayout>
//     )
//   }
// }

// const T = ({ key, ...rest }) => {

//   return (
//     <div key={key}>{rest.children}</div>
//   )
// }

// export default MyFirstGrid;