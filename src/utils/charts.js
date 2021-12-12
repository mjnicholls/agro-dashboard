/* eslint-disable no-underscore-dangle */
import Chart from 'chart.js'

const chartInstance = Chart
chartInstance.defaults.LineWithLine = Chart.defaults.line
chartInstance.controllers.LineWithLine = Chart.controllers.line.extend({
  draw(ease) {
    Chart.controllers.line.prototype.draw.call(this, ease)

    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      const activePoint = this.chart.tooltip._active[0]
      const { ctx } = this.chart
      const { x } = activePoint.tooltipPosition()
      const topY = this.chart.legend.bottom
      // bottomY = this.chart.chartArea.bottom;
      const bottomY = 450
      const barWidth = this.chart.getDatasetMeta(0).data[0]._view.width + 10
      // draw line
      ctx.globalCompositeOperation = 'destination-over'
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x, topY)
      ctx.lineTo(x, bottomY)
      ctx.lineWidth = barWidth
      ctx.strokeStyle = '#32325d'
      ctx.stroke()
      ctx.restore()
      ctx.globalCompositeOperation = 'source-over'
    }
  },
})

export const makeGradientGreen = (canvas, topPoint, middlePoint) => {
  const ctx = canvas.getContext('2d')
  const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)
  gradientStroke.addColorStop(topPoint || 1, 'rgba(66,134,121,0.2)')
  gradientStroke.addColorStop(middlePoint || 0.5, 'rgba(66,134,121,0.05)')
  gradientStroke.addColorStop(0, 'rgba(66,134,121,0)')
  return gradientStroke
}

export const makeGradientBlue = (canvas, topPoint, middlePoint) => {
  const ctx = canvas.getContext('2d')
  const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)
  gradientStroke.addColorStop(topPoint || 1, 'rgba(29,140,248,0.2)')
  gradientStroke.addColorStop(middlePoint || 0.5, 'rgba(29,140,248,0.05)')
  gradientStroke.addColorStop(0, 'rgba(29,140,248,0)')
  return gradientStroke
}

export const makeGradientPurple = (canvas, topPoint, middlePoint) => {
  const ctx = canvas.getContext('2d')
  const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)
  gradientStroke.addColorStop(topPoint || 1, 'rgba(72,72,176,0.4)')
  gradientStroke.addColorStop(middlePoint || 0.5, 'rgba(72,72,176,0.2)')
  gradientStroke.addColorStop(0, 'rgba(72,72,176,0)')
  return gradientStroke
}
