import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import DataAnalysis from "@/pages/Analysis.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
// import Icons from "@/pages/Icons.vue";
// import Maps from "@/pages/Maps.vue";
// import Notifications from "@/pages/Notifications.vue";
// import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import csvGenerator from "@/pages/csvGenerator.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "analysis",
        name: "Data analysis",
        component: DataAnalysis
      },
      {
        path: "about",
        name: "About US",
        component: TableList
      },
      {
        path: "docs",
        name: "Docs",
        component: Typography
      },
      // {
      //   path: "icons",
      //   name: "Icons",
      //   component: Icons
      // },
      // {
      //   path: "maps",
      //   name: "Maps",
      //   meta: {
      //     hideFooter: true
      //   },
      //   component: Maps
      // },
      // {
      //   path: "notifications",
      //   name: "Notifications",
      //   component: Notifications
      // },
      // {
      //   path: "upgrade",
      //   name: "Upgrade to PRO",
      //   component: UpgradeToPRO
      // },
      {
        path: "csvGenerator",
        name: "csv Generator",
        component: csvGenerator
      }
    ]
  }
];

export default routes;
