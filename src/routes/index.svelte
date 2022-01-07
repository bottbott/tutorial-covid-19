<script context="module">
    import requests from '../data/requests.js'
    export async function preload() {
        let caStats = "burger";
        try {
            caStats = await requests.caStats();
            return { caStats }
        } catch(e) {
            console.log("There was an error in calling the API.")
            return;
        }
    }
</script>

<script>
	import CovidStat from '../components/CovidStat.svelte'
    import CovidChart from '../components/CovidChart.svelte'
    import TableContainer from '../components/TableContainer.svelte'

    export let caStats;
    console.log(caStats, 'caStats')

</script>

<style>

</style>

<svelte:head>
    <title>Covid 19 US Tracker</title>
</svelte:head>

<p>{caStats}</p>
<div class="section header">
    <div class="container">
        <h1>Covid 19 - US</h1>
    </div>
</div>

<CovidStat />
<CovidChart />
<TableContainer />