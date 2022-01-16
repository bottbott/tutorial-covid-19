<script>
    import { onMount, onDestroy } from 'svelte'
    import { Chart, registerables } from 'chart.js'

    Chart.register(...registerables);
    
    export let historicData;
    export let title;

    let hideChart = false;
    let chartElement;
    let chart;

    onMount(() => {
        if (historicData && document.body.clientWidth > 680) {
            createChart();
            return;
        }

        hideChart = true;
    })

    
    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    })
  
    function createChart() {
        chart = new Chart(chartElement.getContext('2d'), {
            type: 'line',
            data: {
                datasets: historicData
            },
            options: {
                responsive: true,
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            let label = data.datasets[tooltipItem.datasetIndex.label]

                            label += ": "
                            
                            label += tooltipItem.yLabel.toLocaleString()
                            return label
                        }
                    }
                },
                title: {
                    display: true,
                    text: title
                },
                scales: {
                    xAxis: [
                        {
                            type: 'time',
                            time: {
                                parser: 'M/D/YY', 
                                tooltipFormat: 'll'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            scaleLabel: {
                                display: true
                            },
                            ticks: {
                                beginAtZero: true,
                                userCallback: function(value, index, values) {
                                    return value.toLocaleString()
                                }
                            }
                        }
                    ]
                }
            }
        })
    }
</script>

<h1>the dang covid chart should be below here</h1>
{#if !hideChart}
<div class="container">
    <canvas bind:this={chartElement}></canvas>
</div>
{/if}