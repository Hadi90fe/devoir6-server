import axios from 'axios';
const BASE_URL = 'http://localhost:4200/api/v1/';
const token = localStorage.getItem('token')

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

    // to get tortue by id
    static async getTortueById(id){
        const res = await axios.get(`${BASE_URL}/${id}`);
        return res.data;
    }

    // to add tortue to DB
    static async addTortue(tortue){
        const res = await axios.post(BASE_URL, tortue, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return res.data;
    }
    // to update tortue
    static async updateTortue(id, tortue){
        const res = await axios.patch(`${BASE_URL}/${id}`, tortue, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return res.data;
    }
    // to delete tortue
    static async deleteTortue(id){
        const res = await axios.delete(`${BASE_URL}/${id}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return res.data;
    }
    // login
    static async login (userF){
      const user = await axios.post(`${BASE_URL}/login`,userF, {
          headers: {
            'Content-Type': 'application/json'
   } })
      return user.data;
  };

}