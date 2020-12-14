import axios from 'axios'

export default axios.create({
    baseURL: 'https://data.cityofchicago.org/resource/bbyy-e7gq.json'
})