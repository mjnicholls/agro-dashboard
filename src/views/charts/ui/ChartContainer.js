import React from 'react';
// import ScaleLoader from 'react-spinners/ScaleLoader';
import PropagateLoader from 'react-spinners/PropagateLoader';


const ChartContainer = (props) => {
  /** Container that supports
   * - loading
   * - displaying errors */
  const Content = () => {
    return <div className="chart-area">{props.children}</div>
  };


  return (props.isLoading || props.error) ?
    <div className="agro-placeholder" style={{...props.style}}>
      <div className="agro-placeholder-content">
      {props.isLoading ?
        <PropagateLoader color="#f2f2f2" size={15} /> :
        <div>{props.error}</div>
      }
      </div>
    </div> : <Content />

  // <PropagateLoader color="#f2f2f2" size={15} />
  // return (props.isLoading || props.error) ?
  //   <div className="agro-placeholder" {...props.style}>
  //     {/*<ScaleLoader color="#f2f2f2" height={36} width={4} radius={4} margin={4}/>*/}
  //     {props.isLoading ?
  //       "Loading.." :
  //       <div className="chart-placeholder chart-area">{props.error}</div>}
  //   </div> : <Content />
}

export default ChartContainer;
