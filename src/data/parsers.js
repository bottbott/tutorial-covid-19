import format from './format'
import moment from 'moment'
import provinceHelper from '../data/provinces.js'

// should really be in a different file as a utility function and imported in.
function mergeById(a1, a2, a1key, a2key) {
    return a1.map(itm => ({
        ...a2.find((item) => (item[a2key] === itm[a1key]) && item),
        ...itm
    }))
}

function canadaStats(data) {
    const [canadaStatsRaw] = data.summary;
    return parseStats(canadaStatsRaw)
}

function provinceStats(province, data) {
    console.log('get the specific province: ', province)
    const provinceKeyForAPI = provinceHelper.getProvinceKeys(province).apiPreference
    const provinceRawData = data.summary.find(d => d.province.toLowerCase() === provinceKeyForAPI.toLowerCase());
    console.log(provinceRawData, 'province raw data')
    return parseStats(provinceRawData);
}

function provinceTable(data) {
    const provinceDataList = data.summary.map(data => {
        const fullProvinceName = provinceHelper.getProvinceKeys(data.province).name
        return {
            cases: format.number(data.active_cases),
            deaths: format.number(data.deaths),
            tested: format.number(data.testing),
            province: data.province,
            fullProvinceName: fullProvinceName
        }
    })
    return provinceDataList
}

function historicCanadaStats(historicData) {
    return parseHistoric(historicData);
}

function historicProvince(province, historicData) {
    return parseHistoric(historicData)
}

function parseHistoric(historicData) {
    console.log('attemptng to parse historic data')
    let processedHistoricData = []
    let activeData = historicData.active.map(({cumulative_deaths, cumulative_recovered, province, ...keepAttrs}) => keepAttrs)
    let avaccineData = historicData.avaccine.map(({province, ...keepAttrs}) => keepAttrs)
    let casesData = historicData.cases.map(({cumulative_cases, province, ...keepAttrs}) => keepAttrs)
    let cvaccineData = historicData.cvaccine.map(({province, ...keepAttrs}) => keepAttrs)
    let dvaccineData = historicData.dvaccine.map(({province, ...keepAttrs}) => keepAttrs)
    let mortalityData = historicData.mortality.map(({province, ...keepAttrs}) => keepAttrs)
    let recoveredData = historicData.recovered.map(({province, ...keepAttrs}) => keepAttrs)
    let testingData = historicData.testing.map(({province, ...keepAttrs}) => keepAttrs)

    processedHistoricData = mergeById(activeData, avaccineData, "date_active", "date_vaccine_administered")
    processedHistoricData = mergeById(processedHistoricData, casesData, "date_active", "date_report")
    processedHistoricData = mergeById(processedHistoricData, cvaccineData, "date_active", "date_vaccine_completed")
    processedHistoricData = mergeById(processedHistoricData, dvaccineData, "date_active", "date_vaccine_distributed")
    processedHistoricData = mergeById(processedHistoricData, mortalityData, "date_active", "date_death_report")
    processedHistoricData = mergeById(processedHistoricData, recoveredData, "date_active", "date_recovered")
    processedHistoricData = mergeById(processedHistoricData, testingData, "date_active", "date_testing")
    // console.log(processedHistoricData, "historic data")
    let combinedChartData =[
        {
            label: 'Cases',
            key: 'cumulative_cases',
            color: 'rgb(100, 0, 200)'
        },
        {
            label: 'Recovered',
            key: 'cumulative_recovered',
            color: 'rgb(100, 100, 200)'
        },
        {
            label: 'Total Tested',
            key: 'cumulative_testing',
            color: 'rgb(10, 30, 100)'
        },
        {
            label: 'Hospitalized',
            key: 'hospitalizedCurrently',
            color: 'rgb(20, 100, 230)'
        },
        {
            label: 'Deaths',
            key: 'cumulative_deaths',
            color: 'rgb(255, 99, 132)'
        }
    ].reduce((prev, next) => {
        if (processedHistoricData.filter(d => d[next.key]).length > 4) {
            prev.push(parseChart(processedHistoricData, next.key, next.label, next.color))
        }

        return prev;
    }, [])
    // console.log(combinedChartData, 'combined chart data')
    return combinedChartData;
}

// spent a long time trying to figure out what was wrong in this function.
// tried to set the valuse of x/y to strings and that worked, then tried to 
// set one of them to a string at a time and that showed that was an issue with
// the x: moment(data.date, 'YYYYMMDD') that was used. Now troubleshooting to see
// if there is a better way to call moment.
// More playing shows that moment is return an object which is probably why Svelte
// complaining about a non-pojo object since the object has a bunch of functions attached to it
// Looks like calling .toString() on the instance has cleared up the error. And data.date isn't a
// a key in the object I was passing in. Whoops. Should have referenced one of the existing time key fields
// like data.date_active
function parseChart(historicData, key, label, color) {
    const chartData = historicData.map(data => {
        return {
            x: moment(data.date_active, 'DD-MM-YYYY').toString(),
            y: data[key] || 0
        }
    });

    return {
        label, 
        data: chartData,
        fill: false,
        borderColor: color
    }
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
    canadaStats, 
    provinceStats, 
    historicCanadaStats, 
    historicProvince, 
    provinceTable
}