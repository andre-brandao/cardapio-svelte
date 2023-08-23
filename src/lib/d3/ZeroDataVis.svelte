<script>
	// @ts-nocheck

	import d3 from 'd3';
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

	function chart() {
		// Declare the chart dimensions and margins.
		const width = 928;
		const height = 500;
		const marginTop = 30;
		const marginRight = 0;
		const marginBottom = 30;
		const marginLeft = 40;

		// Declare the x (horizontal position) scale.
		const x = d3
			.scaleBand()
			.domain(
				d3.groupSort(
					data,
					([d]) => - d.y,
					(d) => d.name
				)
			) // descending y
			.range([marginLeft, width - marginRight])
			.padding(0.1);

		// Declare the y (vertical position) scale.
		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.y)])
			.range([height - marginBottom, marginTop]);

		// Create the SVG container.
		const svg = d3
			.create('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [0, 0, width, height])
			.attr('style', 'max-width: 100%; height: auto;');

		// Add a rect for each bar.
		svg
			.append('g')
			.attr('fill', 'steelblue')
			.selectAll()
			.data(data)
			.join('rect')
			.attr('x', (d) => x(d.name))
			.attr('y', (d) => y(d.y))
			.attr('height', (d) => y(0) - y(d.y))
			.attr('width', x.bandwidth());

		// Add the x-axis and label.
		svg
			.append('g')
			.attr('transform', `translate(0,${height - marginBottom})`)
			.call(d3.axisBottom(x).tickSizeOuter(0));

		// Add the y-axis and label, and remove the domain line.
		svg
			.append('g')
			.attr('transform', `translate(${marginLeft},0)`)
			.call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
			.call((g) => g.select('.domain').remove())
			.call((g) =>
				g
					.append('text')
					.attr('x', -marginLeft)
					.attr('y', 10)
					.attr('fill', 'currentColor')
					.attr('text-anchor', 'start')
					.text('↑ y (%)')
			);

		// Return the SVG element.
		return svg.node();
	}
</script>
