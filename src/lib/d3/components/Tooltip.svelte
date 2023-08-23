<script>
	//@ts-nocheck
	export let data;
	export let yScale;
	export let xScale;
</script>

<div style="position: absolute; top: {yScale(data.y)}px; left: {xScale(data.x)}px;">
	<p class='font-bold'>{data.name}</p>
    <!-- <p>{data.x}</p> -->
    <p>Total Pedidos:{data.y}</p>

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
