<script>
        //@ts-nocheck

    let yTicks = [0, 20, 40, 60];
    export let width;
    // export let height;
    export let margin;
    export let yScale;
</script>

<g transform="translate({margin.left} {margin.top})">
    {#each yTicks as tick}
        <text x={0} y={yScale(tick)} dy="-5">
            {tick}
            {tick == 60 ? " hours studied" : ""}
        </text>
        <line
            x1="0"
            y1={yScale(tick)}
            x2={width}
            y2={yScale(tick)}
            stroke={tick == 0 ? "black" : "#cecece"}
        />
    {/each}
</g>
