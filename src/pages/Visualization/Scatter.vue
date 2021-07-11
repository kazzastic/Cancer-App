<template>
  <div class="col-md-6">
    <div v-if="series.length > 0" style="margin: 15px; padding: 10px">
      <apexchart
        v-if="series.length > 0"
        type="scatter"
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
        type: "scatter",
        zoom: {
          enabled: true,
          type: "xy"
        }
      },
      title: {
        align: "center",
        floating: true
      },
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter: function(val) {
            return parseFloat(val).toFixed(1);
          }
        }
      },
      yaxis: {
        tickAmount: 7
      }
    }
  }),
  created() {
    if (!this.$props.data || !this.$props.dimension) return;
    this.generateGroups(
      this.$props.dimension.x,
      this.$props.dimension.y,
      this.$props.dimension.groupCount
    );
  },
  watch: {
    dimension: function(newDimension, oldDimension) {
      if (
        newDimension.x === oldDimension.x &&
        newDimension.y === oldDimension.y &&
        newDimension.groupCount === oldDimension.groupCount
      )
        return;
      const { x, y, groupCount } = newDimension;
      this.generateGroups(x, y, groupCount);
    }
  },
  methods: {
    generateGroups(x, y, groupCount) {
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
      else targetCount = 100;
      xSeries = normalizeSeries(xSeries).slice(0, targetCount);
      ySeries = normalizeSeries(ySeries).slice(0, targetCount);
      const xGroups = this.splitToChunks(xSeries, groupCount);
      const yGroups = this.splitToChunks(ySeries, groupCount);
      const series = [];
      xGroups.forEach((group, groupIndex) => {
        const seriesObj = { name: `Sample ${groupIndex + 1}` };
        seriesObj.data = [];
        group.forEach((row, i) =>
          seriesObj.data.push([row, yGroups[groupIndex][i]])
        );
        series.push(seriesObj);
      });
      this.chartOptions = {
        ...this.chartOptions,
        title: {
          ...this.chartOptions.title,
          text: `${x}/${y} Variance`
        }
      };
      this.series = series;
    },
    splitToChunks(array, parts) {
      let result = [];
      for (let i = parts; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
      }
      return result;
    }
  }
};
</script>
