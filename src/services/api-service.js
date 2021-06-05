import { flaskBackendService } from "../environment";

class ApiService {
  async generateDatasetPrediction(csvFile) {
    try {
      const formData = new FormData();
      formData.append("file", csvFile);
      const { data } = await flaskBackendService.request({
        headers: { "Content-Type": "multipart/form-data" },
        method: "post",
        url: "/predict",
        data: formData
      });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new ApiService();
