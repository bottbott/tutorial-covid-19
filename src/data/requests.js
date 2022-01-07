import axios from 'axios'
import parsers from './parsers'

async function caStats() {
    const response = await axios.get('https://api.opencovid.ca')
    return parsers.canadaStats(response.data)
}

export default {
    caStats
}