<script>
	//@ts-nocheck
	// import data from './data/data.js';
	import AxisX from './components/AxisX.svelte';
	import AxisY from './components/AxisY.svelte';
	import Tooltip from './components/Tooltip.svelte';

	import { max } from 'd3-array';
	import { scaleBand, scaleLinear } from 'd3-scale';

	export let data;

	let map = new Map();
	//remove duplicate data and add up the quantities(y)
	for (let index = 0; index < data.length; index++) {
		const element = data[index];
		if (map.has(element.name)) {
			let value = map.get(element.name);
			value.y += element.y;
			map.set(element.name, value);
		} else {
			map.set(element.name, element);
		}
	}
	data = Array.from(map.values());

	console.log(data);

	let width = 400;
	let height = 400;

	const margin = { top: 20, right: 40, left: 10, bottom: 20 };

	//xScale for %
	// $: xScale = scaleLinear()
	// 	.domain([0, 100])
	// 	.range([0, width - margin.right]);

	//xScale for dates
	$: xScale = scaleBand()
		.range([0, width - margin.right])
		.domain(data.map((d) => d.x));

	const yScale = scaleLinear()
		.domain([0, max(data, (d) => d.y)])
		.range([height - margin.top - margin.bottom, 0]);

	let hoverData;
</script>

{#if data}
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
			<AxisY
				{width}
				{height}
				{yScale}
				{margin}
				yTicks={data.map((p) => {
					return p.y;
				})}
			/>
			<g transform="translate({margin.left} {margin.top})">
				{#each data as produto}
					<!-- svelte-ignore a11y-mouse-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->

					<circle
						cx={xScale(produto.x)}
						r={hoverData && hoverData == produto ? '20' : '10'}
						cy={yScale(produto.y)}
						opacity={hoverData ? (hoverData == produto ? '1' : '0.5') : '1'}
						fill="blue"
						on:mouseover={() => {
							hoverData = produto;
						}}
					/>
				{/each}
			</g>
		</svg>

		{#if hoverData}
			<Tooltip data={hoverData} {yScale} {xScale} />
		{/if}
	</div>
{/if}

<style>
	circle {
		transition: all 300ms ease;
		cursor: pointer;
	}
</style>
