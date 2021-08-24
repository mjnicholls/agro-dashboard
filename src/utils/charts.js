import Chart from "chart.js";

const chartInstance = Chart;
chartInstance.defaults.LineWithLine = Chart.defaults.line;
chartInstance.controllers.LineWithLine = Chart.controllers.line.extend({
     draw: function(ease) {
       Chart.controllers.line.prototype.draw.call(this, ease);

       if (this.chart.tooltip._active && this.chart.tooltip._active.length) {

         var activePoint = this.chart.tooltip._active[0],
           ctx = this.chart.ctx,
           x = activePoint.tooltipPosition().x,
           topY = this.chart.legend.bottom,
           // bottomY = this.chart.chartArea.bottom;
           bottomY = 450;
         let barWidth = this.chart.getDatasetMeta(0).data[0]._view.width + 10;
         // draw line
         ctx.globalCompositeOperation = 'destination-over';
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(x, topY);
         ctx.lineTo(x, bottomY);
         ctx.lineWidth = barWidth;
         ctx.strokeStyle = '#32325d';
         ctx.stroke();
         ctx.restore();
         ctx.globalCompositeOperation = "source-over";
       }
     }
  });


