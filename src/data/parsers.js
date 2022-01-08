import format from './format'
import moment from 'moment'

function canadaStats(data) {
    const [canadaStatsRaw] = data.summary;
    return parseStats(canadaStatsRaw)
}

function provinceStats(province, data) {
    console.log('get the specific province: ', province)
    const provinceRawData = data.summary.find(d => d.province.toLowerCase() === province.toLowerCase());
    console.log(provinceRawData, 'province raw data')
    return parseStats(provinceRawData);
}

function parseStats(rawStats) {
    console.log('attempting data parsing...')
    return {
        cases: format.number(rawStats.cases),
        deaths: format.number(rawStats.deaths),
        recovered: format.number(rawStats.recovered),
        ventilator: 0,
        hospitalized: 0,
        icu: 0,
        tested: format.number(rawStats.testing),
        updated: rawStats.date//moment(rawStats.date).format('LLLL')
    }
}

export default {
    canadaStats, provinceStats
}