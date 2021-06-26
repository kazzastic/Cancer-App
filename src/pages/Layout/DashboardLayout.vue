<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/csvGenerator">
        <md-icon>bolt</md-icon>
        <p>CSV converter</p>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Detection Panel</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>content_paste</md-icon>
        <p>Data Analysis</p>
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon>person</md-icon>
        <p>About Us</p>
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Documentation</p>
      </sidebar-link>
      <!-- <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>  -->
      <!-- <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link> -->
    </side-bar>

    <div class="main-panel">
      <div style="text-align: center; margin: 5px; padding: 10px">
        <a href="https://csrd.neduet.edu.pk/"
          ><img id="csrd" alt="CSRD logo" src="../../../assets/CSRD.png"
        /></a>
        <a href="https://www.neduet.edu.pk/"
          ><img id="ned" alt="Ned logo" src="../../../assets/logo.png"
        /></a>
        <a href="https://www.nibd.edu.pk/"
          ><img id="nibd" alt="Nipd logo" src="../../../assets/NIBD.png"
        /></a>
        <!-- <h2 id="h2">
          Cancer Detection Panel
        </h2>
        <b>Please enter a CSV file of CBC test</b><br /><br/>
        <b
          >Click for Sample
          <a
            href="https://drive.google.com/uc?export=download&id=1iNUMFqYD578YeXUcdpZ4HgHRev4VNTaH"
            >CSV<md-icon>download</md-icon></a
          ></b
        > -->
      </div>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
//import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
//import FixedPlugin from "./Extra/FixedPlugin.vue";

export default {
  components: {
    //TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    // FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
    };
  },
};
</script>

<style scoped>
#ned {
  width: 14%;
  height: 120px;
  margin: 10px;
}
#nibd {
  width: 6%;
  height: 30px;
  margin: 10px;
  float: right;
}
#csrd {
  width: 5%;
  height: 50px;
  margin: 10px;
  float: left;
}
#h2 {
  font-family: "Times New Roman", Times, serif;
}
</style>
