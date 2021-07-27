import React from 'react';
import PropTypes from 'prop-types';

import Icon01d from './01d';
import Icon01n from './01n';
import Icon02d from './02d';
import Icon02n from './02n';
import Icon03d from './03d';
import Icon04d from './04d';
import Icon09d from './09d';
import Icon10d from './10d';
import Icon10n from './10n';
import Icon11d from './11d';
import Icon13d from './13d';
import Icon50d from './50d';

const icons = {
  '01d': Icon01d,
  '01n': Icon01n,
  '02d': Icon02d,
  '02n': Icon02n,
  '03d': Icon03d,
  '03n': Icon03d,
  '04d': Icon04d,
  '04n': Icon04d,
  '09d': Icon09d,
  '09n': Icon09d,
  '10d': Icon10d,
  '10n': Icon10n,
  '11d': Icon11d,
  '11n': Icon11d,
  '13d': Icon13d,
  '13n': Icon13d,
  '50d': Icon50d,
  '50n': Icon50d,
};

const OWMWeatherIcon = props => {
  const SpecificIcon = icons[props.src];
  return <SpecificIcon {...props.compStyle} style={props.compStyle} />;
};

OWMWeatherIcon.propTypes = {
  src: PropTypes.string,
  compStyle: PropTypes.object,
};

export default OWMWeatherIcon;
