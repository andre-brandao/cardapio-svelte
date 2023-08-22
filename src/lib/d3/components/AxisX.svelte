<script>
    //@ts-nocheck
    let xTicks = [0,25,50,75,100,120]

    export let height;
    export let margin;

    export let xScale;
</script>




<g>
    {#each xTicks as tick}
         <text 
         x={xScale(tick)} 
         y={height - margin.bottom}
         dy="5"
         dominant-baseline="hanging"
         >
         {tick}%
        </text>
    {/each}
</g>