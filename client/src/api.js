import axios from 'axios';
const url = 'http://localhost:4200/api/v1/tortues';

export default class API {
    // to get all tortues from the server
    static async getAllTortues(){
        const res = await axios.get(url);
        return res.data;
    }
    
    // to get tortue by id
    static async getTortueById(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    // to add tortue to DB
    static async addTortue(tortue){
        const res = await axios.post(url, tortue);
        return res.data;
    }
    // to update tortue 
    static async updateTortue(id, tortue){
        const res = await axios.patch(`${url}/${id}`, tortue);
        return res.data;
    }
    // to delete tortue 
    static async deleteTortue(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
    
}