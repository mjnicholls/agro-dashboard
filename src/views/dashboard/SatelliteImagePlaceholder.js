import React from 'react'

import ContentLoader from 'react-content-loader'

const SatelliteImagePlaceholder = () => (
  <div style={{ backgroundColor: '#27293d', borderRadius: '4px' }}>
    <ContentLoader
      speed={2}
      width={74}
      height={40}
      viewBox="0 0 84 40"
      backgroundColor="#f3f3f3"
      foregroundColor="rgba(255, 255, 255, 0.7)"
    >
      <rect x="0" y="8" rx="3" ry="3" width="52" height="2" />
      <rect x="0" y="20" rx="3" ry="3" width="70" height="2" />
      <rect x="0" y="32" rx="3" ry="3" width="70" height="2" />
    </ContentLoader>
  </div>
)

export default SatelliteImagePlaceholder
