import format from './format'
import moment from 'moment'

function canadaStats(data) {
    const [canadaStatsRaw] = data.summary;
    return {
        cases: format.number(canadaStatsRaw.cases),
        deaths: format.number(canadaStatsRaw.deaths),
        recovered: format.number(canadaStatsRaw.recovered),
        ventilator: 0,
        hospitalized: 0,
        icu: 0,
        tested: format.number(canadaStatsRaw.testing),
        updated: moment(canadaStatsRaw.date).format('LLLL')
    }
}

export default {
    canadaStats
}