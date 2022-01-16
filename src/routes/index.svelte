<script context="module">
    import requests from '../data/requests.js'
    export async function preload() {
        // let caStats
        // let historicCanadaStats
        try {
            const caStats = await requests.caStats();
            const historicCanadaStats = await requests.historicCanadaStats();
            const provincesTable = await requests.provincesData();
            return { caStats, historicCanadaStats, provincesTable }
        } catch(e) {
            console.log("There was an error in calling the API.")
            console.error(e)
            // this.error(500, e)
            return;
        }
    }
</script>

<script>
	import CovidStat from '../components/CovidStat.svelte'
    import CovidChart from '../components/CovidChart.svelte'
    import TableContainer from '../components/TableContainer.svelte'

    export let caStats;
    export let historicCanadaStats;
    export let provincesTable;
    console.log(provincesTable)
    // console.log(caStats, 'caStats')
    // console.log(historicCanadaStats, 'Calling historic stats in index.svelte')
    
</script>

<style>

</style>

<svelte:head>
    <title>Covid 19 US Tracker</title>
</svelte:head>

<div class="section header">
    <div class="container">
        <h1>Covid 19 - US</h1>
    </div>
</div>

<CovidStat caStats={caStats}/>
<CovidChart historicData={historicCanadaStats} title="Canada Covid-19"/>
<TableContainer data={provincesTable}/>