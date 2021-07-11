<template>
  <div class="content">
    <div>
      <!-- <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="orange"> </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
      </div> -->
      <div style="text-align:center;width:100%;">
        <h2 id="h2">
          CSV conversion Panel
        </h2>
        <b
          >Please enter the CSV which was obtained from analyzer,<br />
          the convertor below would convert the RAW csv to a csv which could be
          used to training!</b
        ><br /><br />
      </div>
      <br />
      <div class="md-layout">
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
          <md-button class="md-success md-lg" @click="generateCSV">
            Upload
          </md-button>
        </div>
        <div class="md-layout-item" v-if="loading">
          <a-spin v-if="loading">
            <a-icon
              slot="indicator"
              type="loading"
              style="font-size: 40px; margin-right: 50px"
              spin
            />
          </a-spin>
        </div>
      </div>
    </div>
    <br /><br />
    <div v-if="response" style="text-align:center;">
      <b>Click for output </b
      ><b>
        <span @click="downloadBlob" class="fake-link" id="fake-link-1">
          CSV
          <md-icon>download</md-icon>
        </span>
      </b>
    </div>
  </div>
</template>

<script>
// import { EditProfileForm, UserCard } from "@/pages";
import ApiService from "../services/api-service";

export default {
  // components: {
  //   EditProfileForm,
  //   UserCard
  // }
  data() {
    return {
      loading: false,
      csv: null,
      csvFile: null,
      response: null
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
    },
    async generateCSV() {
      try {
        this.loading = true;
        const blob = await ApiService.csvGenerator(this.csvFile);
        if (blob) {
          this.response = blob;
          this.loading = false;
        }
      } catch (error) {
        alert(error);
        this.loading = false;
      }
    },
    downloadBlob() {
      const blob = new Blob([this.response], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.style = "display: none";
      link.href = url;
      link.download = "out.zip";
      link.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
      }, 100);
    }
  }
};
</script>
<style scoped>
#h2 {
  font-family: "Times New Roman", Times, serif;
}
.fake-link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
