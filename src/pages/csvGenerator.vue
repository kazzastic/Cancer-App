<template>
  <div class="content">
    <div class="md-layout">
      <!-- <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="orange"> </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
      </div> -->
      <div class="main-panel" style="text-align:center;width:100%;">
        <h2 id="h2">
          CSV conversion Panel
        </h2>
        <b
          >Please enter the CSV which was obtained from analyzer,<br />
          the convertor below would convert the RAW csv to a csv which could be
          used to training!</b
        ><br /><br />
      </div>
      <div class="md-layout md-gutter md-alignment-center">
        <div
          class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        >
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
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <md-button class="md-success md-lg" @click="generateCSV">
          Upload
        </md-button>
      </div>
      <div class="md-layout-item" v-if="loading">
        <pacman-loader
          :loading="loading"
          :color="color"
          :size="size"
        ></pacman-loader>
      </div>
    </div>
    <br/><br/>
    <div v-if="response" style="text-align:center;">
      <b>Click for output </b><b> <a href="#">CSV<md-icon>download</md-icon></a></b>
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
      csv: null,
      csvFile: null,
      response: false,
    };
  },
  methods: {
    fetchCsv(e) {
      if (window.FileReader) {
        const reader = new FileReader();
        this.csvFile = e.target.files[0];
        reader.readAsText(e.target.files[0]);
        reader.onload = (event) => (this.csv = event.target.result);
        reader.onerror = (event) => {
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
    async generateCSV() {
      try {
        let the_payload = ApiService.csvGenerator(this.csvFile);
        if (the_payload){
          this.response = true;
        }
        // console.info(the_payload);
      } catch (error) {
        // console.error(error);
      }
    },
  },
};
</script>
<style scoped>
#h2 {
  font-family: "Times New Roman", Times, serif;
}
</style>
