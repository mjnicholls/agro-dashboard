import React from 'react';
// import ScaleLoader from 'react-spinners/ScaleLoader';
import PropagateLoader from 'react-spinners/PropagateLoader';


const ChartContainer = (props) => {
  /** Container that supports
   * - loading
   * - displaying errors */

  const Chart = () => <div className="chart-area">{props.children}</div>;

  return props.isLoading ?
    <div className="chart-placeholder chart-area">
      {/*<ScaleLoader color="#f2f2f2" height={36} width={4} radius={4} margin={4}/>*/}
      <PropagateLoader color="#f2f2f2" size={15} />
    </div> :
    props.error ? <div className="chart-placeholder chart-area">{props.error}</div> :
    <Chart />
}

export default ChartContainer;
