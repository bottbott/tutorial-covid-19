// The API stores province values in a mix of abbreviations and full length. Need a way to be able to work with either, so return an object with both options
function getProvinceKeys(province) {
    console.log(province, 'getProvinceKeys province value')
    const provinceKeys = provinceNames.filter(x => x.name.toLowerCase() === province.toLowerCase() || x.abbreviation.toLowerCase() === province.toLowerCase())
    console.log(provinceKeys, 'provinceKeysOutput')
    return provinceKeys[0]
}

const provinceNames = [{
    name: 'Alberta',
    abbreviation: 'AB',
    apiPreference: 'Alberta'
}, {
    name: 'British Columbia',
    abbreviation: 'BC',
    apiPreference: 'BC'
}, {
    name: 'Manitoba',
    abbreviation: 'MB',
    apiPreference: 'Manitoba'
}, {
    name: 'New Brunswick',
    abbreviation: 'NB',
    apiPreference: 'New Brunswick'
}, {
    name: 'Newfoundland and Labrador',
    abbreviation: 'NL',
    apiPreference: 'NL'
}, {
    name: 'Northwest Territories',
    abbreviation: 'NT',
    apiPreference: 'NWT'
}, {
    name: 'Nova Scotia',
    abbreviation: 'NS',
    apiPreference: 'Nova Scotia'
}, {
    name: 'Nunavut',
    abbreviation: 'NU',
    apiPreference: 'Nunavut'
}, {
    name: 'Ontario',
    abbreviation: 'ON',
    apiPreference: 'Ontario'
}, {
    name: 'Prince Edward Island',
    abbreviation: 'PE',
    apiPreference: 'PEI'
}, {
    name: 'Quebec',
    abbreviation: 'QC',
    apiPreference: 'Quebec'
}, {
    name: 'Saskatchewan',
    abbreviation: 'SK',
    apiPreference: 'Saskatchewan'
}, {
    name: 'Yukon Territory',
    abbreviation: 'YT',
    apiPreference: 'Yukon'
}]


export default {
    provinceNames, getProvinceKeys
}