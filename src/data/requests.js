import axios from 'axios'
import parsers from './parsers'
import provinceHelper from '../data/provinces.js'

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

async function historicCanadaStats() {
    const response = await axios.get('https://api.opencovid.ca/timeseries?loc=canada&after=2021-12-12')
    return parsers.historicCanadaStats(response.data)
}

async function provincesData() {
    const response = await axios.get('https://api.opencovid.ca/summary');
    return parsers.provinceTable(response.data);
}

async function historicProvince(province) {
    console.log('hello')
    const provinceKey = provinceHelper.getProvinceKeys(province).abbreviation
    console.log(provinceKey, 'the province key')
    const response = await axios.get(`https://api.opencovid.ca/timeseries?loc=${provinceKey}&after=2021-12-12`)
    return parsers.historicProvince(province, response.data)
}

// The API stores province values in a mix of abbreviations and full length. Need a way to be able to work with either, so return an object with both options
// function getProvinceKeys(province) {
//     const provinceKeys = provinceNames.filter(x => x.name.toLowerCase() === province.toLowerCase() || x.abbreviation === province)
//     return provinceKeys[0]
// }

export default {
    caStats, 
    provinceStats, 
    historicCanadaStats, 
    historicProvince, 
    provincesData
}