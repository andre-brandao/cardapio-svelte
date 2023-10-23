<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- 
    Quarto 1: https://cafedavillla.com/cliente/mesa/QGRo1
Quarto 2: https://cafedavillla.com/cliente/mesa/QVRc2
Quarto 3: https://cafedavillla.com/cliente/mesa/Q81s3
Chale 1: https://cafedavillla.com/cliente/mesa/C9Zt1
Chale 2: https://cafedavillla.com/cliente/mesa/C1Zt2
Chale 3: https://cafedavillla.com/cliente/mesa/C2Zt3
Chale 4: https://cafedavillla.com/cliente/mesa/C3Zt4 
-->
<main>
	<!-- generate a link car to each unit -->
	<h1 class="text-white text-center font-bold">Quartos</h1>
	<div class="quartos">
		<a href="/cliente/mesa/QGRo1" target="_blank">Quarto 1</a>
		<a href="/cliente/mesa/QVRc2" target="_blank">Quarto 2</a>
		<a href="/cliente/mesa/Q81s3" target="_blank">Quarto 3</a>
	</div>
	<h1 class="text-white text-center font-bold">Chales</h1>
	<div class="quartos">
		<a href="/cliente/mesa/C9Zt1" target="_blank">Chale 1</a>
		<a href="/cliente/mesa/C1Zt2" target="_blank">Chale 2</a>
		<a href="/cliente/mesa/C2Zt3" target="_blank">Chale 3</a>
		<a href="/cliente/mesa/C3Zt4" target="_blank">Chale 4</a>
	</div>
	<h1 class="text-white text-center font-bold">Visitantes</h1>
	<div class="visi">

		<a href="/cliente/mesa/Vd736" target="_blank">Visitantes</a>
	</div>

</main>

<style>
    main{
        max-inline-size: 1000px;
        margin: 0 auto;
    }

	.quartos {
		display: grid;
		place-items: center;
		grid-template-columns: repeat(3, 1fr);
	}
	
	.visi{
		display: grid;
		place-items: center;
		grid-template-columns: repeat(1, 1fr);
	}
	a {
		margin: 10px;
		padding: 10px;
		border: 1px solid black;
		border-radius: 5px;
		text-decoration: none;
		color: black;
		background: white;
        width: 100px;
        text-align: center;
	}
</style>
