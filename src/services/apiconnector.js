
import axios from 'axios'

export const axiosintstance=axios.create({});

export const apiconnector = (method,url,bodyData,headers,params)=>{
    return axiosintstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData:null,
        headers: headers ? headers:null,
        params: params ? params :null,
        })
}