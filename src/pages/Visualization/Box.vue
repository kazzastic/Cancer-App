<template>
  <div class="col-md-6">
    <div v-if="series.length > 0" style="margin: 15px; padding: 10px">
      <apexchart
        v-if="series.length > 0"
        type="boxPlot"
        height="300"
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
        type: "boxPlot",
        height: 300
      },
      title: {
        text: "Predictor's Plot",
        align: "center",
        floating: true
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: "#00e395",
            lower: "#008FFB"
          }
        }
      }
    }
  }),
  created() {
    if (!this.$props.data || !this.$props.dimension) return;
    this.generateBoxes(this.$props.dimension);
  },
  watch: {
    dimension: function(newDimensions, oldDimensions) {
      if (newDimensions === oldDimensions) return;
      this.generateBoxes(newDimensions);
    }
  },
  methods: {
    generateBoxes(targets) {
      const data = targets.map(target => ({
        x: target,
        y: normalizeSeries(
          this.$props.data.map(row => Number(Number(row[target]).toFixed(2)))
        )
      }));
      this.series = [{ type: "boxPlot", data }];
    }
  }
};
</script>
