<script>
	//@ts-nocheck
	import data from './data/data.js';
    import AxisX from './components/AxisX.svelte';
    import AxisY from './components/AxisY.svelte';
    import Tooltip from './components/Tooltip.svelte';



    console.log(data);

	let width = 400;
	let height = 400;

	const margin = { top: 20, right: 40, left: 0, bottom: 20 };

	import { scaleLinear } from 'd3-scale';
	$: xScale = scaleLinear()
		.domain([0, 100])
		.range([0, width - margin.right]);

	import { max } from 'd3-array';
	const yScale = scaleLinear()
		.domain([0, max(data, (d) => d.hours)])
		.range([height - margin.top - margin.bottom, 0]);


	let hoverData;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="chart-container"
	bind:clientWidth={width}
    on:mouseleave={() => {
        hoverData = null;
    }}
    
>
	<svg {width} {height}>
		<AxisX {height} {xScale} {margin} />
		<AxisY {width} {height} {yScale} {margin} />
		<g transform="translate({margin.left} {margin.top})">
			{#each data as student}
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->

						<circle
							cx={xScale(student.grade)}
							cy={yScale(student.hours)}
							r={hoverData && hoverData == student ? "20" : "10"}
							opacity={hoverData ? hoverData == student ? "1" : "0.5" : "1"}

                            fill="blue"
                            on:mouseover={() => {
                                hoverData = student;
                            }}
						/>
					
			{/each}
		</g>
	</svg>

	{#if hoverData}
		<Tooltip data={hoverData} {yScale} {xScale}/>
	{/if}
</div>


<style>

    circle{
        transition: all 300ms ease;
        cursor: pointer;
    }
</style>