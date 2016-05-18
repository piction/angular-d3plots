(function () {
	'use strict';
	var declaration = ['d3', implementation];
	angular.module('app').factory('d3BilevelPartionService', declaration);

	function implementation(d3) {

		function render(svg, dataIn, height, width, strokeRatio) {
			if (!dataIn || $.isEmptyObject(dataIn)) return;

			height = height || 500;
			width = width || height;
			strokeRatio = strokeRatio || 100;
			var rootData = angular.copy(dataIn);     // make a copy to allow extending this data
			var uniqueGraphIdprefix = "Bilevel-Id-" + Math.floor((Math.random() * 1000000) + 1) + "-";

			function filter_min_arc_size_text(d, i) {
				return (d.dx * d.depth * radius / 3) > 14
			}

			var radius = Math.min(width, height) / 2 - 10;
			var strokeWidth = Math.max(3, (1 / strokeRatio) / (0.0034));
			var hue = d3.scale.category10();
			var luminance = d3.scale.sqrt()
				.domain([0, 1e6])
				.clamp(true)
				.range([90, 20]);

			var partition = d3.layout.partition()
				.sort(function (a, b) {
					return d3.ascending(a.name, b.name);
				})
				.size([2 * Math.PI, radius]);

			var arc = d3.svg.arc()
				.startAngle(function (d) {
					return d.x;
				})
				.endAngle(function (d) {
					return d.x + d.dx - .01 / (d.depth + .5);
				})
				.innerRadius(function (d) {
					return ((strokeWidth - 3) * radius / strokeWidth) + radius / strokeWidth * d.depth;
				})
				.outerRadius(function (d) {
					return ((strokeWidth - 3) * radius / strokeWidth) + radius / strokeWidth * (d.depth + 1) - 1;
				});
			//Tooltip description
			var tooltip = d3.select("body")
				.append("div")
				.attr("class", "tooltip")
				.style("position", "absolute")
				.style("z-index", "10")
				.style("opacity", 0);

			function format_number(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}

			function format_description(d) {
				return '<h3>' + d.name + '</h3><p>' + d.description + '<br> (' + format_number(d.value) + ')</p>';
			}
			function mouseOverArc(d) {
				d3.select(this).style("opacity", .5);
				tooltip.html(format_description(d));
				return tooltip.transition()
					.duration(50)
					.style("opacity", 1);
			}

			function mouseOutArc() {
				d3.select(this).style("opacity", 1);
				return tooltip.style("opacity", 0);
			}

			function mouseMoveArc(d) {
				return tooltip
					.style("top", (d3.event.pageY - 10) + "px")
					.style("left", (d3.event.pageX + 10) + "px");
			}

		

			// Compute the initial layout on the entire tree to sum sizes.
			// Also compute the full name and fill color for each node,
			// and stash the children so they can be restored as we descend.
			partition
				.value(function (d) {
					return d.size;
				})
				.nodes(rootData)
				.forEach(function (d) {
					d._children = d.children;
					d.sum = d.value;
					d.key = key(d);
					d.fill = fill(d);
				});
			// Now redefine the value function to use the previously-computed sum.
			partition
				.children(function (d, depth) {
					return depth < 2 ? d._children : null;
				})
				.value(function (d) {
					return d.sum;
				});

			// remove all previous items before render and create svg element
			svg.selectAll('*').remove();
			svg.attr('width', width).attr('height', height);

			var biLevelSvg = svg.append('g')
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			var center = biLevelSvg.append("circle")
				.attr("r", ((strokeWidth - 3) * radius / strokeWidth) + radius / strokeWidth)
				.attr('class', 'bilevel-partion-center')
				.on("click", zoomOut);

			center.append("title")
				.text("zoom out");

			var partitioned_data = partition.nodes(rootData).slice(1);

			function createTextPathId (d,depth) {
				return uniqueGraphIdprefix + d.name + depth;
			}
			function addLablesOnHiddenArc(d, el , depth) {
				// CREATE HIDDEN ARC FOR THE TEXTPATH CURVE (http://www.visualcinnamon.com/2015/09/placing-text-on-arcs.html)
					var firstArcSection = /(^.+?)L/; // captures all in between the start of a string and the first capital letter L
					
					var newArc = firstArcSection.exec(el)[1];
	
					//Replace all the comma's so that IE can handle it -_-
					//The g after the / is a modifier that "find all matches rather than stopping after the first match"
					newArc = newArc.replace(/,/g , " ");
					
					//flip the end and start position for quadrant 3 or 4				
					var rotation =getRotationDeg(d);										
					if (rotation > 0 && rotation < 180) {
				 	
						var isSmallArc = newArc.indexOf("0 1 1 ") > -1; // check on large-arc-flag ( The elliptical arc curve => https://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands)
						
						var startLoc 	= /M(.*?)A/;		//Everything between the capital M and first capital A
						var	middleLoc 	= isSmallArc ? /A(.*?)0 1 1/ : /A(.*?)0 0 1/ ;	//Everything between the capital A and 0 0 1 or 0 1 1
						var	endLoc 		= isSmallArc ? /0 1 1\s(.*?)$/ : /0 0 1\s(.*?)$/;	//Everything between the 0 0 1 or 0 1 0 and the end of the string (denoted by $)

						//Flip the direction and sweep flag of elliptical arc curve
						var newStart = endLoc.exec( newArc );
						var newEnd = startLoc.exec( newArc );
						var middleSec = middleLoc.exec( newArc );

						if( newStart && newEnd && middleSec){
							newArc = "M" + newStart[1] + "A" + middleSec[1] + (isSmallArc ? "0 1 0 " : "0 0 0 ") + newEnd[1];}
					}					
					var d_outer = d;								
					//Create a new invisible arc that the text can flow along
					biLevelSvg.append("path")
						.attr("id", function(d,i) { return createTextPathId(d_outer,depth); })
						.attr("d", newArc)
						.style("stroke-width",3)
						.style("fill", "none");			
			}
			
			
			var path = biLevelSvg.selectAll(".bilevelSlices")
				.data(partitioned_data)
				.enter().append("path")
				.attr("class", "bilevelSlices")

				.attr("d", arc)
      			.style("fill", function(d) { return d.fill; })
				.each(function (d) {
					this._current = updateArc(d);
					var el = d3.select(this).attr("d");
					addLablesOnHiddenArc(d,	el,0);
				})
				.on("click", zoomIn)
				.on("mouseover", mouseOverArc)
				.on("mousemove", mouseMoveArc)
				.on("mouseout", mouseOutArc); 

			function drawTextsOnArc(textsElements,depth) {
				textsElements
					.filter(filter_min_arc_size_text)
					.attr("dy", function(d) {
						var offset = (radius / strokeWidth)/2;
						var rotation = getRotationDeg(d)
						//return rotation > 0 && rotation < 180 ?  -offset : offset;
						return 0;
						
					})
					.append("textPath")
					.attr("startOffset", "50%")
					.style("text-anchor", "middle")
					.attr("xlink:href", function (d) { return '#' + createTextPathId(d,depth); })
					.text(function (d) { return d.name; });
			}
			
			var texts = biLevelSvg.selectAll(".bileveltext")
				.data(partitioned_data)
				.enter().append("text");
			drawTextsOnArc(texts,0);

		

			function zoomIn(p) {
				if (p.depth > 1) p = p.parent;
				if (!p.children) return;
				zoom(p, p);
			}

			function zoomOut(p) {
				if (!p || !p.parent || $.isEmptyObject(p.parent)) return;
				zoom(p.parent, p);
			}

			// Zoom to the specified new root.
			function zoom(root, p) {
				console.log("Depth:",p);
				if (document.documentElement.__transition__) return;

				// Rescale outside angles to match the new layout.
				var enterArc, exitArc, outsideAngle = d3.scale.linear().domain([0, 2 * Math.PI]);

				function insideArc(d) {
					return p.key > d.key
						? {depth: d.depth - 1, x: 0, dx: 0} : p.key < d.key
						? {depth: d.depth - 1, x: 2 * Math.PI, dx: 0}
						: {depth: 0, x: 0, dx: 2 * Math.PI};
				}

				function outsideArc(d) {
					return {depth: d.depth + 1, x: outsideAngle(d.x), dx: outsideAngle(d.x + d.dx) - outsideAngle(d.x)};
				}

				center.datum(root);

				// When zooming in, arcs enter from the outside and exit to the inside.
				// Entering outside arcs start from the old layout.
				if (root === p) enterArc = outsideArc, exitArc = insideArc, outsideAngle.range([p.x, p.x + p.dx]);

				var new_data = partition.nodes(root).slice(1);

				path = path.data(new_data, function (d) {return d.key;});

				// When zooming out, arcs enter from the inside and exit to the outside.
				// Exiting outside arcs transition to the new layout.
				if (root !== p) enterArc = insideArc, exitArc = outsideArc, outsideAngle.range([p.x, p.x + p.dx]);

				d3.transition().duration(d3.event.altKey ? 5000 : 750).each(function () {
					path.exit().transition()
						.style("fill-opacity", function (d) {return d.depth === 1 + (root === p) ? 1 : 0;})
						.attrTween("d", function (d) {return arcTween.call(this, exitArc(d));	})
						.remove();

					path.enter().append("path")
						.style("fill-opacity", function (d) {return d.depth === 2 - (root === p) ? 1 : 0;})
						.style("fill", function (d) {return d.fill;	})
						.attr("d", arc)
						.each(function (d) {
							console.log("in zoom : ",d);
							this._current = enterArc(d);
							var el = d3.select(this).attr("d");
							console.log("actual depth:::",p.depth);
							addLablesOnHiddenArc(d,	 el, p.depth+1);
						})
						.on("click", zoomIn)
						.on("mouseover", mouseOverArc)
						.on("mousemove", mouseMoveArc)
						.on("mouseout", mouseOutArc);

				path.transition()
					.style("fill-opacity", 1)
					.attrTween("d", function(d) { return arcTween.call(this, updateArc(d)); });
		  
					// path.transition()
					// 	.style("fill-opacity", 1)
					// 	.attrTween("d", function (d) {return arcTween.call(this, function (d) {
					// 			var el = d3.select(this).attr("d");
					// 			 addLablesOnHiddenArc(d,	 el, p.depth);
					// 			return updateArc(d);								
								
					// 			});
					// 	});
				});
				texts = texts.data(new_data, function (d) {	return d.key;});

				texts.exit()
					.remove();
				texts.enter()
					.append("text");
					
				texts.style("opacity", 0);
				console.log("Show actuale depth:", p);
				drawTextsOnArc(texts,p.depth+1);
				texts.transition().delay(750).style("opacity", 1)	
			
			}

			function key(d) {
				var k = [], p = d;
				while (p.depth) k.push(p.name), p = p.parent;
				return k.reverse().join(".");
			}

			function fill(d) {
				if(d.color != undefined ) {
					return d.color;
				}
				var p = d;
				while (p.depth > 1) p = p.parent;
				var c = d3.lab(hue(p.name));
				c.l = luminance(d.sum);
				return c;
			}

			function arcTween(b) {
				var i = d3.interpolate(this._current, b);
				this._current = i(0);
			return function (t) {
					return arc(i(t));
				};
			}

			function updateArc(d) {	return {depth: d.depth, x: d.x, dx: d.dx};	}
			function getRotationDeg(d) {return (d.x + d.dx / 2) * 180 / Math.PI - 90}
		}

		return {
			render: render
		}
	}

}());