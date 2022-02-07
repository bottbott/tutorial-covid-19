<script>
    export let provinces;
</script>

<style>
    table {
        width: 100%;

    }
    .section {
        padding: 0.5rem 1.5rem;
    }
</style>

<div class="section">
    <div class="container">
        <table class="table is-bordered is-striped">
            <thead>
                <tr>
                    <th>Provinces</th>
                    <th>Cases</th>
                    <th>Deaths</th>
                    <th>Total Tested</th>
                </tr>
            </thead>
            <tbody>
                {#each provinces as province (province.province) }
                <tr>
                    <td>
                        <a href="{province.province}">{province.fullProvinceName}</a>
                    </td>
                    <td>
                        {province.cases}
                    </td>
                    <td>
                        {province.deaths}
                    </td>
                    <td>
                        {province.tested}
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>