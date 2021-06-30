<template>
  <div class="content">
    <div>
      <!-- <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          :chart-data="dailySalesChart.data"
          :chart-options="dailySalesChart.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Daily Sales</h4>
            <p class="category">
              <span class="text-success"
                ><i class="fas fa-long-arrow-alt-up"></i> 55%
              </span>
              increase in today sales.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 4 minutes ago
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          :chart-data="emailsSubscriptionChart.data"
          :chart-options="emailsSubscriptionChart.options"
          :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
          :chart-type="'Bar'"
          data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">Email Subscription</h4>
            <p class="category">
              Last Campaign Performance
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 10 days ago
            </div>
          </template>
        </chart-card>
      </div> -->
      <!-- <chart-card
          :chart-data="dataCompletedTasksChart.data"
          :chart-options="dataCompletedTasksChart.options"
          :chart-type="'Line'"
          data-background-color="green"
        >
          <template slot="content">
            <h4 class="title">Completed Tasks</h4>
            <p class="category">
              Last Campaign Performance
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              campaign sent 26 minutes ago
            </div>
          </template>
        </chart-card> -->
      <!-- <button @click="show">Open</button>
      <modal name="my-first">
        <button @click="hide">hide</button>
        <p>Allo</p>
      </modal> -->
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
            :disabled="!csv"
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
              chart-type="Line"
              data-background-color="pink"
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
              chart-type="Line"
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
      <!-- <div
        v-if="f1Flag == true"
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          :chart-data="f1Data.data"
          :chart-options="f1Data.options"
          chart-type="Line"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Extended Recall For All Classes</h4>
            <p class="category">
              <button @click="f1FlagChange(false)">Close</button>
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated as per predictions
            </div>
          </template>
        </chart-card>
      </div> -->
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
              chart-type="Line"
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
      <!-- <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Employees Stats</h4>
            <p class="category">New employees on 15th September, 2016</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="orange"></ordered-table>
          </md-card-content>
        </md-card>
      </div> -->
      <!-- <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <nav-tabs-card>
          <template slot="content">
            <span class="md-nav-tabs-title">Tasks:</span>
            <md-tabs class="md-success" md-alignment="left">
              <md-tab id="tab-home" md-label="Bugs" md-icon="bug_report">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>

              <md-tab id="tab-pages" md-label="Website" md-icon="code">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>

              <md-tab id="tab-posts" md-label="server" md-icon="cloud">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </div> -->
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
      csv: null,
      csvFile: null,
      recall: "",
      precision: "",
      f1: "",
      accuracy: "",
      f1Flag: false,
      loading: false,
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
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De"
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  },
  methods: {
    fetchCsv(e) {
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
        let { prediction, report } = await ApiService.generateDatasetPrediction(
          this.csvFile
        );
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
        this.loading = false;
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
