import React, { useEffect, useRef } from 'react'

import { polygonShapeSize } from '../../config'

const Shape = ({ polygon }) => {
  const shapeRef = useRef(null)

  useEffect(() => {
    const canvas = shapeRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let coordinates = polygon.pixels
    if (typeof coordinates === 'string') {
      coordinates = JSON.parse(coordinates)
    }
    const region = new Path2D()
    region.strokeWidth = 1
    region.moveTo(coordinates[0].x, coordinates[0].y)
    for (let i = 1; i < coordinates.length; i += 1) {
      const coordinate = coordinates[i]
      region.lineTo(coordinate.x, coordinate.y)
    }
    region.closePath()

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.lineWidth = 2
    ctx.stroke(region, 'evenodd')
  }, [polygon])

  return polygon ? (
    <div
      style={{
        width: `${polygonShapeSize + 2}px`,
        height: `${polygonShapeSize + 2}px`,
        overflow: 'hidden',
      }}
    >
      <canvas id={polygon.id} ref={shapeRef}></canvas>
    </div>
  ) : null
}

export default Shape
