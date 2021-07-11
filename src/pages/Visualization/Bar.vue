<template>
  <div class="col-md-6">
    <div v-if="series.length > 0" style="margin: 15px; padding: 10px">
      <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dimension", "data"],
  data: () => ({
    series: [],
    chartOptions: {
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom"
          }
        }
      },
      colors: [
        "#33b2df",
        "#546E7A",
        "#d4526e",
        "#13d8aa",
        "#A5978B",
        "#2b908f",
        "#f9a3a4",
        "#90ee7e",
        "#f48024",
        "#69d2e7",
        "#720000"
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"]
        },
        formatter: function(val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
        text: "Study Group's Histogram",
        align: "center",
        floating: true
      },
      tooltip: {
        theme: "dark",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function() {
              return "";
            }
          }
        }
      }
    }
  }),
  created() {
    if (!this.$props.data || !this.$props.dimension) return;
    this.generateSeries(this.$props.dimension.x);
  },
  watch: {
    dimension: function(newDimension, oldDimension) {
      const { x } = newDimension;
      if (x === oldDimension.x) return;
      this.generateSeries(x);
    }
  },
  methods: {
    generateSeries(target) {
      const categories = [...new Set(this.$props.data.map(row => row[target]))];
      const counts = categories.map(
        category =>
          this.$props.data.filter(row => row[target] === category).length
      );
      this.chartOptions = { ...this.chartOptions, xaxis: { categories } };
      this.series = [{ data: counts }];
    }
  }
};
</script>
