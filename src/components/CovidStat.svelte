<script>
    export let caStats;
</script>

<style>
    .columns {
        border: 1px solid black;
    }
</style>

<div class="section">
    <div class="container">
        <div class="columns">
            <h2 class="is-3 column">Cases: {caStats.cases}</h2>
            <h2 class="is-3 column">Deaths: {caStats.deaths}</h2>
            <h2 class="is-3 column">Recovered: {caStats.recovered}</h2>
            <h2 class="is-3 column">Updated: {caStats.updated}</h2>
        </div>
    </div>
</div>

<div class="section">
    <div class="container">
        <div class="columns">
            <h2 class="is-3 column">Tested: {caStats.tested}</h2>
            <h2 class="is-3 column">Hospitalized: {caStats.hospitalized}</h2>
            <h2 class="is-3 column">Total ICU: {caStats.icu}</h2>
            <h2 class="is-3 column">Total Ventilator: {caStats.ventilator}</h2>
        </div>
    </div>
</div>