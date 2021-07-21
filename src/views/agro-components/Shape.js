import React, {useEffect, useRef} from 'react';

const Shape = ({polygon}) => {

  let shapeRef = useRef(null);
  const size = 48;

  const coordinatesToPixels = (coords) => {
    // FInd bbox
    let lats = []; let lngs = [];
    for (let i = 0; i < coords[0].length; i++)  {
        lats.push(coords[0][i][1]);
        lngs.push(coords[0][i][0]);
    }
    // calc the min and max lng and lat
    let minlat = Math.min.apply(null, lats);
    let maxlat = Math.max.apply(null, lats);
    let minlng = Math.min.apply(null, lngs);
    let maxlng = Math.max.apply(null, lngs);
    let bbox = [minlng, minlat, maxlng, maxlat];


    let diffX = (bbox[2] - bbox[0]);
    let diffY = (bbox[3] - bbox[1]);
    let mulX = size / diffX;
    let mulY = size / diffY;
    let mul = Math.min(mulX, mulY);

    let coordinatesCanvasPixels = [];
    coords[0].forEach((point) => {
      coordinatesCanvasPixels.push(
        {
          x: Math.round((point[0] - bbox[0]) * mul) + 1 + (size - diffX * mul) / 2,
          y: size - Math.round((point[1] - bbox[1]) * mul) + 1 - (size - diffY * mul) / 2
        }
      );
    });
		return coordinatesCanvasPixels
  }

  useEffect(() => {
    let canvas = shapeRef.current;
		let ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let coordinates = coordinatesToPixels(polygon.geo_json.geometry.coordinates);
		let region = new Path2D();
		region.strokeWidth = 1;
		region.moveTo(coordinates[0].x, coordinates[0].y);

		for (let i = 1; i < coordinates.length; i++) {
			const coordinate = coordinates[i];
			region.lineTo(coordinate.x, coordinate.y);
		}
		region.closePath();

		ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
		ctx.lineWidth = 2;
		ctx.stroke(region, 'evenodd');
		// ctx.fillStyle = 'rgba(3, 155, 229, 0.1)';
		// ctx.fill(region, 'evenodd');


  }, [polygon])

  return (polygon ?
    <div style={{width: "50px", height: "50px", overflow: "hidden"}}>
      <canvas id={polygon.id} ref={shapeRef}></canvas></div> : null)

}

export default React.memo(Shape);