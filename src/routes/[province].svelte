<script context="module">
    import provinceNames from '../data/provinces.js'
    export async function preload(page, session) {
    const province = page.params['province']
        if (provinceNames.find(s => s.abbreviation === province) === undefined) {
            console.log("before the error")
            this.error(404, 'Province Not Found')
            return
        }
        try {
            return { province: page.params['province'] }
        }
         catch(e) {
            this.error(500, "There was an error in calling the API. Please try again later.")
         }   
    }
</script>
<script>
	import CovidStat from '../components/CovidStat.svelte'
    import CovidChart from '../components/CovidChart.svelte'
    import TableContainer from '../components/TableContainer.svelte'

    export let province;
</script>

<svelte:head>
    <title>Covid 19 - {province}</title>
</svelte:head>

<div class="section header">
    <div class="container">
        <h1>Covid 19 - {province}</h1>
    </div>
</div>

<CovidStat />
<CovidChart />