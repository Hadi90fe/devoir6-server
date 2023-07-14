import axios from 'axios';
const BASE_URL = 'http://localhost:4200/api/v1/';

export default class API {
    // to get all tortues from the server
    static async getAllTortuesPages(page) {
        try {
          const response = await axios.get(`${BASE_URL}/?page=${page}`);
          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    static async getAllTortues() {
        try {
          const response = await axios.get(`${BASE_URL}`);
          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

    // // to get tortue by id
    // static async getTortueById(id){
    //     const res = await axios.get(`${url}/${id}`);
    //     return res.data;
    // }

    // // to add tortue to DB
    // static async addTortue(tortue){
    //     const res = await axios.post(url, tortue);
    //     return res.data;
    // }
    // // to update tortue
    // static async updateTortue(id, tortue){
    //     const res = await axios.patch(`${url}/${id}`, tortue);
    //     return res.data;
    // }
    // // to delete tortue
    // static async deleteTortue(id){
    //     const res = await axios.delete(`${url}/${id}`);
    //     return res.data;
    // }

}