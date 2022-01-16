<script>
    import Table from './Table.svelte'
    import TableFilter from './TableFilter.svelte'

    export let data;

    $: provinces = data
</script>
<h1>Table Container</h1>
<TableFilter />
<Table {provinces} />