<script context="module">
    import provinceNames from '../data/provinces.js'
    import requests from '../data/requests.js'

    export async function preload(page) {
        let stats
        console.log('Loading province page...')
        let province = page.params['province'] // switch back to const later on. just needed to make it a var to do some troubleshooting. 
        if (provinceNames.find(s => s.name.toLowerCase() === province.toLowerCase() || s.abbreviation.toLowerCase() === province.toLowerCase()) === undefined) {
            console.log("before the error")
            this.error(404, 'Province Not Found')
            return
        }
        try {
            const stats = await requests.provinceStats(province);
            console.log('got the stats...')
            return { province, stats }
        }
         catch(e) {
            console.error(e)
            this.error(500, "There was an error in calling the API. Please try again later. Error: ", e)
         }   
    }
</script>
<script>
	import CovidStat from '../components/CovidStat.svelte'
    import CovidChart from '../components/CovidChart.svelte'
    import TableContainer from '../components/TableContainer.svelte'

    export let province;
    export let stats;

    console.log(stats, 'stats')

</script>

<svelte:head>
    <title>Covid 19 - {province}</title>
</svelte:head>

<div class="section header">
    <div class="container">
        <h1>Covid 19 - {province}</h1>
    </div>
</div>

<CovidStat caStats={stats}/>
<CovidChart />