<script>
	//@ts-nocheck
	export let data;
	export let yScale;
	export let xScale;
</script>

<div style="position: absolute; top: {yScale(data.hours)}px; left: {xScale(data.grade)}px;">
	<p class='font-bold'>{data.name}</p>

	<p>{data.grade}</p>
</div>

<style>
	div {
		padding: 6px;
		background: white;
		border: 1px solid black;
		border-radius: 5px;
		pointer-events: none;
		transition: top 300ms ease, left 300ms ease;
	}
</style>
