import React from 'react';
import ContentLoader, { Facebook } from 'react-content-loader';

const SatelliteImagePlaceholder = () => (
  <div style={{backgroundColor: "#27293d", borderRadius: "4px", padding: "10px", margin: "5px"}}>
    <ContentLoader
      speed={2}
      width={108}
      height={80}
      viewBox="0 0 108 80"
      backgroundColor="#f3f3f3"
      foregroundColor="rgba(255, 255, 255, 0.8)"
    >
      <rect x="48" y="8" rx="3" ry="3" width="52" height="4" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="4" />
      <rect x="0" y="52" rx="3" ry="3" width="100" height="4" />
      <rect x="0" y="68" rx="3" ry="3" width="88" height="4" />
      <circle cx="20" cy="20" r="20" />
    </ContentLoader>
  </div>
)

export default SatelliteImagePlaceholder;


