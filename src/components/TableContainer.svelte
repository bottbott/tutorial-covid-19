<script>
    import Table from './Table.svelte'
    import TableFilter from './TableFilter.svelte'

    // create prop
    export let data;
    let sortBy = 'name'
    let provinceName = ''
    // create reactive variable
    $: provinces = filterAndSort(data, provinceName, sortBy)

    function filterAndSort(provinces, provinceName, sortBy) {
        const filteredProvince = provinces.filter(province => {
            return (
            provinceName === '' || province.fullProvinceName.toLowerCase().indexOf(provinceName.toLowerCase()) > -1)
        })

        if (sortBy !== 'name') {
            return filteredProvince.sort((a ,b) => {
                return (+b[sortBy].replace(',', '')) - (+a[sortBy].replace(',', ''));
            })
        }

        return filteredProvince
    }
</script>
<h1>{provinceName} {sortBy}</h1>
<TableFilter bind:provinceName bind:sortBy />
<Table {provinces} />