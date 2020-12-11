import axios from './axios'

export default function ajax(url, data, type="GET") {

    if(type === "GET"){
        let dataString = ''
        Object.keys(data).forEach(key => {
            dataString =+ key + '=' + data[key] + '&'
        })
        if(dataString) {
            dataString = dataString.substring(0, dataString.length-1)
        }
        return axios.get(url + '?' + dataString)
    } else {
        return axios.post(url, data)
    }

}