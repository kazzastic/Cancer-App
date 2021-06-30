<template>
  <div class="col-md-12">
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
  props: ["data"],
  data: () => ({
    series: [],
    chartOptions: {
      chart: {
        type: "bar",
        height: 350
      },
      colors: ["#33b2df", "#13d8aa"],
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      xaxis: {
        categories: []
      }
    }
  }),
  created() {
    if (!this.$props.data) return;
    this.generateSeries();
  },
  watch: {
    data: function(newData, oldData) {
      if (JSON.stringify(newData) != JSON.stringify(oldData))
        this.generateSeries();
    }
  },
  methods: {
    generateSeries() {
      const categories = [
        ...new Set(
          Object.keys(this.$props.data).filter(
            label => !["accuracy", "macro avg", "weighted avg"].includes(label)
          )
        )
      ];
      const precision_scores = categories.map(label =>
        Number(this.$props.data[label]["precision"].toFixed(2))
      );
      const recall_scores = categories.map(label =>
        Number(this.$props.data[label]["recall"].toFixed(2))
      );
      this.chartOptions = { ...this.chartOptions, xaxis: { categories } };
      this.series = [
        { name: "Precision", data: precision_scores },
        { name: "Recall", data: recall_scores }
      ];
    }
  }
};
</script>
