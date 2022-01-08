import axios from 'axios'
import parsers from './parsers'

async function caStats() {
    const response = await axios.get('https://api.opencovid.ca')
    return parsers.canadaStats(response.data)
}

async function provinceStats(province) {
    console.log('calling for province stats')
    const response = await axios.get('https://api.opencovid.ca/summary')
    console.log('called province stats')
    
    return parsers.provinceStats(province, response.data)
}

export default {
    caStats, provinceStats
}