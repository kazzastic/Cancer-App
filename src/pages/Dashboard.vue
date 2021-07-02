<template>
  <div class="content">
    <div>
      <div style="text-align:center;">
        <h2 id="h2">
          Cancer Detection Panel
        </h2>
        <b>Please enter a CSV file of CBC test</b><br />
        <b
          >Click for Sample
          <a
            href="https://drive.google.com/uc?export=download&id=1iNUMFqYD578YeXUcdpZ4HgHRev4VNTaH"
            >CSV<md-icon>download</md-icon></a
          ></b
        >
      </div>
      <br /><br />
      <div class="md-layout" style="margin: 10px">
        <div class="md-layout-item">
          <label for="csv_file" class="control-label col-sm-3 text-right"
            >Dataset File to import:
          </label>
          <div>
            <input
              style="padding: 3px; margin: 3px"
              type="file"
              id="csv_file"
              name="csv_file"
              class="form-control"
              @change="fetchCsv($event)"
            />
          </div>
        </div>
        <div class="md-layout-item">
          <md-button
            :disabled="!csv || (csv && loading)"
            class="md-success md-lg"
            @click="generatePredictions"
          >
            Upload
          </md-button>
        </div>
        <div class="md-layout-item" v-if="loading">
          <a-spin v-if="loading">
            <a-icon
              slot="indicator"
              type="loading"
              style="font-size: 60px; margin-right: 50px"
              spin
            />
          </a-spin>
        </div>
      </div>
      <br />
      <div class="md-layout" style="margin: 10px">
        <div class="md-layout-item" @click="recallFlagChange(true)">
          <stats-card data-background-color="orange">
            <template slot="header">
              <md-icon
                class="md-size-2x"
                :md-src="require('../../assets/recall.svg')"
              />
              <!-- <md-icon class="category">store</md-icon> -->
            </template>

            <template slot="content">
              <p class="category"><b>Recall</b></p>
              <h3 class="title">{{ (recall * 100).toFixed(2) }}%</h3>
            </template>

            <template slot="footer">
              <div class="stats">
                <md-icon>show_chart</md-icon>
                <b>Click for extended <a>RECALL</a> report</b>
              </div>
            </template>
          </stats-card>
        </div>
        <div class="md-layout-item" @click="precisionFlagChange(true)">
          <stats-card data-background-color="orange">
            <template slot="header">
              <!-- <md-icon>content_copy</md-icon> -->
              <md-icon
                class="md-size-2x"
                :md-src="require('../../assets/precision.svg')"
              />
            </template>

            <template slot="content">
              <p class="category"><b>Precision</b></p>
              <h3 class="title">{{ (precision * 100).toFixed(2) }}%</h3>
            </template>

            <template slot="footer">
              <div class="stats">
                <md-icon>show_chart</md-icon>
                <b>Click for extended <a>PRECISION</a> report</b>
              </div>
            </template>
          </stats-card>
        </div>
      </div>
      <modal name="my-first" :width="1000" :height="330">
        <div class="md-layout">
          <div class="md-layout-item">
            <h4 id="textAlign"><b>Recall</b></h4>
            <chart-card
              :chart-data="recallData.data"
              :chart-options="recallData.options"
              chart-type="Bar"
              data-background-color="purple"
            >
              <template slot="content">
                <h4 class="title">Extended Recall For All Classes</h4>
                <!-- <p class="category">
                <button @click="recallFlagChange">Close</button>
              </p> -->
              </template>

              <template slot="footer">
                <div class="stats">
                  <md-icon>access_time</md-icon>
                  updated as per predictions
                </div>
              </template>
            </chart-card>
          </div>
        </div>
      </modal>
      <modal name="my-second" :width="1000" :height="330">
        <div class="md-layout">
          <div class="md-layout-item">
            <h4 id="textAlign"><b>Precision</b></h4>

            <chart-card
              :chart-data="precisionData.data"
              :chart-options="precisionData.options"
              chart-type="Bar"
              data-background-color="green"
            >
              <template slot="content">
                <h4 class="title">Extended Precision For All Classes</h4>
                <!-- <p class="category">
                <button @click="precisionFlagChange">Close</button>
              </p> -->
              </template>

              <template slot="footer">
                <div class="stats">
                  <md-icon>access_time</md-icon>
                  updated as per predictions
                </div>
              </template>
            </chart-card>
          </div>
        </div>
      </modal>
      <div class="md-layout">
        <div class="md-layout-item" @click="f1FlagChange(true)">
          <stats-card data-background-color="orange">
            <template slot="header">
              <!-- <md-icon>info_outline</md-icon> -->
              <md-icon
                class="md-size-2x"
                :md-src="require('../../assets/f1.svg')"
              />
            </template>

            <template slot="content">
              <p class="category"><b>F1 Score</b></p>
              <h3 class="title">{{ (f1 * 100).toFixed(2) }}%</h3>
            </template>

            <template slot="footer">
              <div class="stats">
                <md-icon>show_chart</md-icon>
                <b>Click for extended <a>F1</a> SCORE</b>
              </div>
            </template>
          </stats-card>
        </div>
        <div class="md-layout-item">
          <stats-card data-background-color="orange">
            <template slot="header">
              <!-- <i class="fab fa-twitter"></i> -->
              <md-icon
                class="md-size-2x"
                :md-src="require('../../assets/acc.svg')"
              />
            </template>

            <template slot="content">
              <p class="category"><b>Accuracy</b></p>
              <h3 class="title">{{ (accuracy * 100).toFixed(2) }}%</h3>
            </template>

            <template slot="footer">
              <div class="stats">
                <md-icon>show_chart</md-icon>
                <b>Nothing happens if you click this</b>
              </div>
            </template>
          </stats-card>
        </div>
      </div>
      <modal name="my-third" :width="1000" :height="330">
        <div class="md-layout">
          <div class="md-layout-item">
            <h4 id="textAlign"><b>F1 Scores</b></h4>
            <chart-card
              :chart-data="f1Data.data"
              :chart-options="f1Data.options"
              chart-type="Bar"
              data-background-color="blue"
            >
              <template slot="content">
                <h4 class="title">Extended F1 Scores For All Classes</h4>
                <!-- <p class="category">
                <button @click="f1FlagChange(false)">Close</button>
              </p> -->
              </template>

              <template slot="footer">
                <div class="stats">
                  <md-icon>access_time</md-icon>
                  updated as per predictions
                </div>
              </template>
            </chart-card>
          </div>
        </div>
      </modal>
      <br />
      <div class="md-layout">
        <div class="md-layout-item" style="margin: 15px; padding: 5px">
          <a-collapse v-model="activeKey">
            <template #expandIcon="props">
              <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
            </template>
            <a-collapse-panel
              key="1"
              header="Prediction's Panel"
              :disabled="!predictionsLoaded"
              :style="collapseStyle"
            >
              <a-table
                v-if="predictions"
                :columns="predictionColumns"
                :data-source="predictions"
                :pagination="{ pageSize: 10 }"
                :scroll="{ y: 240, x: 800 }"
              />
            </a-collapse-panel>
          </a-collapse>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from "@/components";
import ApiService from "../services/api-service";
// import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";

export default {
  name: "MyComponent",
  components: {
    StatsCard,
    ChartCard
    // NavTabsCard,
    // NavTabsTable,
    // OrderedTable,
    // PacmanLoader
  },
  data() {
    return {
      color: "orange",
      size: "25px",
      loading: false,
      csv: null,
      csvFile: null,
      predictionLoading: false,
      predictions: null,
      predictionColumns: [],
      predictionsLoaded: false,
      activeKey: [],
      collapseStyle:
        "background: #f7f7f7;margin: 5px; border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden; text-align: center; font-size: 20px",
      recall: "",
      precision: "",
      f1: "",
      accuracy: "",
      f1Flag: false,
      recallData: {
        data: {
          labels: [
            "ALL",
            "AML",
            "APML",
            "CML",
            "Control",
            "HL",
            "MDS",
            "MDS/MPN",
            "MPN",
            "NHL"
          ],
          series: [[]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 30,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      precisionData: {
        data: {
          labels: [
            "ALL",
            "AML",
            "APML",
            "CML",
            "Control",
            "HL",
            "MDS",
            "MDS/MPN",
            "MPN",
            "NHL"
          ],
          series: [[]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 30,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      f1Data: {
        data: {
          labels: [
            "ALL",
            "AML",
            "APML",
            "CML",
            "Control",
            "HL",
            "MDS",
            "MDS/MPN",
            "MPN",
            "NHL"
          ],
          series: [[]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 30,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      }
    };
  },
  methods: {
    reset() {
      this.loaded = false;
      this.csv = null;
      this.csvFile = null;
      this.activeKey = [];
      this.predictions = null;
      this.predictionColumns = [];
      this.predictionsLoaded = false;
      this.predictionLoading = false;
      this.accuracy = "";
      this.precision = "";
      this.recall = "";
      this.f1 = "";
      this.recallData.data.series[0] = [];
      this.precisionData.data.series[0] = [];
      this.f1Data.data.series[0] = [];
    },
    fetchCsv(e) {
      this.reset();
      if (window.FileReader) {
        const reader = new FileReader();
        this.csvFile = e.target.files[0];
        reader.readAsText(e.target.files[0]);
        reader.onload = event => (this.csv = event.target.result);
        reader.onerror = event => {
          if (event.target.error.name === "NotReadableError") {
            alert("Cannot read file !");
          }
          this.csvFile = null;
        };
      } else {
        alert("FileReader are not supported in this browser.");
      }
      // console.info(this.csvFile);
    },
    async generatePredictions() {
      try {
        this.loading = true;
        let {
          predictions,
          report
        } = await ApiService.generateDatasetPrediction(this.csvFile);
        this.accuracy = report.accuracy;
        this.precision = report["weighted avg"].precision;
        this.recall = report["weighted avg"].recall;
        this.f1 = report["macro avg"]["f1-score"];

        for (let i = 0; i < 10; i++) {
          // console.info(report[this.dailySalesChart.data.labels[i]].recall);
          this.recallData.data.series[0][i] =
            report[this.recallData.data.labels[i]].recall * 100;
          // console.info("Recall: "+this.recallData.data.series[0][i]);
        }
        for (let i = 0; i < 10; i++) {
          // console.info(report[this.dailySalesChart.data.labels[i]].recall);
          this.precisionData.data.series[0][i] =
            report[this.precisionData.data.labels[i]].precision * 100;
          // console.info("Precision: "+this.precisionData.data.series[0][i]);
        }
        for (let i = 0; i < 10; i++) {
          this.f1Data.data.series[0][i] =
            report[this.f1Data.data.labels[i]]["f1-score"] * 100;
          // console.info("f1: " + this.f1Data.data.series[0][i]);
        }

        let headers = Object.keys(predictions[0]).map(key => ({
          title: key.toUpperCase(),
          dataIndex: key,
          width: 100
        }));
        headers = [headers[1]].concat([headers[0], headers[2]]);
        predictions = predictions.map((prediction, i) => ({
          ...prediction,
          key: i + 1
        }));
        let correctCount = 0;
        predictions.forEach(prediction => {
          if (prediction.predicted === prediction.established)
            correctCount = correctCount + 1;
        });
        const accuracy = Number(
          Number((correctCount / predictions.length) * 100).toFixed(2)
        );
        this.predictionColumns = headers;
        this.predictions = predictions;
        this.predictionLoading = false;
        this.predictionsLoaded = true;
        this.loading = false;
        this.$notification["success"]({
          message: "Prediction's Ready",
          duration: 10,
          description: `Our Model has evaluted your data with accruacy: ${accuracy}%`
        });
        this.activeKey = this.activeKey.concat("1");
      } catch (error) {
        alert(error);
        this.loading = false;
      }
    },
    recallFlagChange() {
      this.$modal.show("my-first");
    },
    precisionFlagChange() {
      this.$modal.show("my-second");
    },
    f1FlagChange(flag) {
      this.$modal.show("my-third");
    }
  }
};
</script>
<style scoped>
.md-card-stats .md-card-header i {
  font-size: 36px !important;
  line-height: 56px;
  width: 90px;
  height: 90px;
  color: #ffffff !important;
}

#textAlign {
  text-align: center;
}
#h2 {
  font-family: "Times New Roman", Times, serif;
}
</style>
