import React from 'react'

import LoaderDots from '../../components/LoaderDots'

const ChartContainer = (props) => {
  /** Container that supports
   * - loading
   * - displaying errors */
  const Content = () => <div className="chart-area">{props.children}</div>

  return props.isLoading || props.error ? (
    <div className="agro-placeholder" style={{ ...props.style }}>
      <div className="agro-placeholder-content">
        {props.isLoading ? <LoaderDots /> : <div>{props.error}</div>}
      </div>
    </div>
  ) : (
    <Content />
  )
}

export default ChartContainer
