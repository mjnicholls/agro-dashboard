import React from 'react'

import { useSelector } from 'react-redux'
import { Table, UncontrolledTooltip } from 'reactstrap'

import { toDate } from '../../utils/dateTime'
import { numberWithCommas } from '../../utils/utils'
import { api } from './utils'

const authSelector = (state) => state.auth

const LimitsDashboard = () => {
  const auth = useSelector(authSelector)
  const { tariff } = auth.user

  const depthInYears = (year) =>
    year >= 0 ? `${year} year${year === 1 ? '' : 's'}` : 'Unlimited'

  return (
    <Table>
      <thead>
        <tr>
          <th>Sections</th>
          <th>Depth</th>
          {tariff === 'corp' && <th>Start date</th>}
        </tr>
      </thead>
      <tbody>
        {Object.keys(auth.limits.calls).map(
          (key) =>
            !api[key].dashboardHidden && (
              <tr key={`dashboard_${key}`}>
                <td>
                  <a href={api[key].link} target="_blank">
                    {api[key].dashboardName || api[key].name}
                  </a>{' '}
                  <i
                    className="tim-icons icon-alert-circle-exc"
                    id={api[key].tool_id}
                  />
                  <UncontrolledTooltip delay={0} target={api[key].tool_id}>
                    {api[key].tooltip}
                  </UncontrolledTooltip>
                </td>
                <td>
                  {auth.limits.history[key]
                    ? depthInYears(auth.limits.history[key].depth)
                    : ''}
                </td>
                {tariff === 'corp' && (
                  <td>
                    {auth.limits.history[key]
                      ? toDate(auth.limits.history[key].start)
                      : ''}
                  </td>
                )}
              </tr>
            ),
        )}
        <tr>
          <td>
            <a href={api.crop_recognition.link}>{api.crop_recognition.name}</a>{' '}
            <i className="tim-icons icon-alert-circle-exc" id="tool15" />
            <UncontrolledTooltip delay={0} target="tool15">
              Available only in the dashboard.
            </UncontrolledTooltip>
          </td>
          {tariff === 'free' ? (
            <td>2017, 2018 - available</td>
          ) : (
            <td>2017, 2018, 2019 - available 2020, 2021 - on request</td>
          )}
          <td></td>
        </tr>
      </tbody>
      <thead>
        <br />
        <tr>
          <th colSpan={tariff === 'corp' ? 4 : 3}>Polygons</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Min polygon area</td>
          <td colSpan={tariff === 'corp' ? 2 : 1}>
            {auth.limits.polygon_area.min_polygon_area} ha
          </td>
          <td></td>
        </tr>
        <tr>
          <td>Max polygon area</td>
          <td colSpan={tariff === 'corp' ? 2 : 1}>
            {numberWithCommas(auth.limits.polygon_area.max_polygon_area)} ha
          </td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  )
}

export default LimitsDashboard
