<template>
  <div class="col-md-6">
    <div v-if="series.length > 0" style="margin: 15px; padding: 10px">
      <apexchart
        v-if="series.length > 0"
        type="area"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>
<script>
import { normalizeSeries } from "../../utils";

export default {
  props: ["dimension", "data"],
  data: () => ({
    series: [],
    chartOptions: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        align: "center",
        floating: true
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      }
    }
  }),
  created() {
    if (!this.$props.data || !this.$props.dimension) return;
    this.generateArea(this.$props.dimension.x, this.$props.dimension.y);
  },
  watch: {
    dimension: function(newDimension, oldDimension) {
      const { x, y } = newDimension;
      if (x === oldDimension.x && y === oldDimension.y) return;
      this.generateArea(x, y);
    }
  },
  methods: {
    generateArea(x, y) {
      let xSeries = [];
      let ySeries = [];
      this.$props.data.forEach(row => {
        const xValue = Number(Number(row[x]).toFixed(2));
        const yValue = Number(Number(row[y]).toFixed(2));
        xSeries.push(xValue);
        ySeries.push(yValue);
      });
      let targetCount;
      if (xSeries.length < 30) targetCount = xSeries.length;
      else targetCount = 30;
      xSeries = normalizeSeries(xSeries).slice(0, targetCount);
      ySeries = normalizeSeries(ySeries).slice(0, targetCount);
      this.chartOptions = {
        ...this.chartOptions,
        title: { ...this.chartOptions.title, text: `${x} vs ${y} Proportion` }
      };
      this.series = [
        { name: x, data: xSeries },
        { name: y, data: ySeries }
      ];
    }
  }
};
</script>
