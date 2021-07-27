const drawFixedYAxis = (chart, target) => {
  let scale = window.devicePixelRatio;
  let sourceCanvas = chart.chart.canvas;
  let sourceCtx = sourceCanvas.getContext("2d");

  // chart.controller.scales['yAxisTemp']._labelItems.forEach(function (label, index) {
  //   let textWidth = sourceCtx.measureText(label.label).width;
  //   let line_x_start = label.x - textWidth;
  //   let line_y_start = (label.y - (label.font.size  / 2));
  //   roundRect(sourceCtx, line_x_start-4, line_y_start - 1, textWidth + 8, label.font.size + 2, 4, "#EB6E4B", false);
  //   sourceCtx.font = `normal ${label.font.size}px Arial`;
  //   sourceCtx.fillStyle = '#EB6E4B';
  //   sourceCtx.fillText(label.label , label.x - (textWidth / 2), label.y + (label.font.size  / 2));
  // });

  let copyWidth = chart.scales['temperature'].width + 10; //- 10
  let copyHeight = chart.scales['temperature'].height + chart.scales['temperature'].top; // + 5
  let targetCtx = target.getContext("2d");

  targetCtx.scale(scale, scale);
  targetCtx.canvas.width = copyWidth * scale;
  targetCtx.canvas.height = copyHeight * scale;

  targetCtx.canvas.style.width = `${copyWidth}px`;
  targetCtx.canvas.style.height = `${copyHeight}px`;
  targetCtx.canvas.style.zIndex = 1;

  sourceCtx.fillStyle = "white";
  sourceCtx.fillRect(0, 0, copyWidth, copyHeight);

  targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth * scale, copyHeight * scale, 0, 0, copyWidth * scale, copyHeight * scale);
  sourceCtx.clearRect(0, 0, copyWidth , copyHeight);
}