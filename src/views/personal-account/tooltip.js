/* eslint-disable */
import React from 'react'
import { countriesGDP } from './data'

import PieChart from './PieChartComponent'

const format = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
}).format

function getPieData(name) {
  return countriesGDP[name]
    ? [
        { name: 'industry', value: countriesGDP[name].industry },
        { name: 'services', value: countriesGDP[name].services },
        { name: 'agriculture', value: countriesGDP[name].agriculture },
      ]
    : null
}

export default function TooltipTemplate(info) {
  const name = info.attribute('name')
  const countryGDPData = countriesGDP[name]
  const total = countryGDPData && countryGDPData.total
  const pieData = getPieData(name)

  const gdpInfo = total ? (
    <div id="nominal">{`Nominal GDP: $${format(total)}M`}</div>
  ) : null

  const graphic = pieData ? (
    <PieChart data={pieData}></PieChart>
  ) : (
    <div>No economic development data</div>
  )

  return (
    <div>
      <h2 style={{ fontSize: '20px', marginBottom: '5px', color: 'black' }}>
        {info.attribute('name')}
      </h2>
    </div>
  )
}
