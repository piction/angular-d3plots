(function() {
    'use strict'
    var declaration = ['d3' , implementation];
    angular.module('app').factory('d3BilevelPartionService',declaration);
    
    function implementation(d3) {
         
         function render(svg,dataIn, height , width) {
             if (!dataIn ||$.isEmptyObject(dataIn)) return;
             
            height = height || 500 ;
            width = width || height;    
            var rootData = angular.copy(dataIn);     // make a copy to allow extending this data      

            var radius = Math.min(width, height) / 2 - 10;
            var hue = d3.scale.category10();
            var luminance = d3.scale.sqrt()
                .domain([0, 1e6])
                .clamp(true)
                .range([90, 20]);

            var partition = d3.layout.partition()
                .sort(function (a, b) { return d3.ascending(a.name, b.name); })
                .size([2 * Math.PI, radius]);
                
            var arc = d3.svg.arc()
                .startAngle(function (d) { return d.x; })
                .endAngle(function (d) { return d.x + d.dx; })
                .padAngle(.01)
                .padRadius(radius / 3)
                .innerRadius(function (d) { return radius / 3 * d.depth; })
                .outerRadius(function (d) { return radius / 3 * (d.depth + 1) - 1; }); 
                        
            // Compute the initial layout on the entire tree to sum sizes.
            // Also compute the full name and fill color for each node,
            // and stash the children so they can be restored as we descend.
                partition
                    .value(function (d) { return d.size; })
                    .nodes(rootData)
                    .forEach(function (d) {
                        d._children = d.children;
                        d.sum = d.value;
                        d.key = key(d);
                        d.fill = fill(d);
                    });
                // Now redefine the value function to use the previously-computed sum.
                partition
                    .children(function (d, depth) { return depth < 2 ? d._children : null; })
                    .value(function (d) { return d.sum; });
                
                
                // remove all previous items before render and create svg element
                svg.selectAll('*').remove();
                svg.attr('width', width).attr('height', height);    
                
                var biLevelSvg = svg.append('g')
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                
                var center = biLevelSvg.append("circle")
                    .attr("r", radius / 3)       
                    .on("click", zoomOut);

                center.append("title")
                    .text("zoom out");
                
                var path = biLevelSvg.selectAll("path")
                    .data(partition.nodes(rootData).slice(1))
                    .enter().append("path")
                    .attr("d", arc)
                    .style("fill", function (d) { return d.fill; })
                    .each(function (d) { this._current = updateArc(d); })
                    .on("click", zoomIn);
                
                function zoomIn(p) {
                    if (p.depth > 1) p = p.parent;
                    if (!p.children) return;
                    zoom(p, p);
                }
            
                function zoomOut(p) {
                    if (!p || !p.parent || $.isEmptyObject(p.parent) ) return;
                    zoom(p.parent, p);
                }
                    // Zoom to the specified new root.
                function zoom(rootData, p) {
                    if (document.documentElement.__transition__) return;

                    // Rescale outside angles to match the new layout.
                    var enterArc,exitArc,outsideAngle = d3.scale.linear().domain([0, 2 * Math.PI]);

                    function insideArc(d) {
                        return p.key > d.key
                            ? { depth: d.depth - 1, x: 0, dx: 0 } : p.key < d.key
                                ? { depth: d.depth - 1, x: 2 * Math.PI, dx: 0 }
                                : { depth: 0, x: 0, dx: 2 * Math.PI };
                    }

                    function outsideArc(d) {
                        return { depth: d.depth + 1, x: outsideAngle(d.x), dx: outsideAngle(d.x + d.dx) - outsideAngle(d.x) };
                    }

                    center.datum(rootData);

                    // When zooming in, arcs enter from the outside and exit to the inside.
                    // Entering outside arcs start from the old layout.
                    if (rootData === p) enterArc = outsideArc, exitArc = insideArc, outsideAngle.range([p.x, p.x + p.dx]);

                    path = path.data(partition.nodes(rootData).slice(1), function (d) { return d.key; });

                    // When zooming out, arcs enter from the inside and exit to the outside.
                    // Exiting outside arcs transition to the new layout.
                    if (rootData !== p) enterArc = insideArc, exitArc = outsideArc, outsideAngle.range([p.x, p.x + p.dx]);

                    d3.transition().duration(d3.event.altKey ? 7500 : 750).each(function () {
                        path.exit().transition()
                            .style("fill-opacity", function (d) { return d.depth === 1 + (rootData === p) ? 1 : 0; })
                            .attrTween("d", function (d) { return arcTween.call(this, exitArc(d)); })
                            .remove();

                        path.enter().append("path")
                            .style("fill-opacity", function (d) { return d.depth === 2 - (rootData === p) ? 1 : 0; })
                            .style("fill", function (d) { return d.fill; })
                            .on("click", zoomIn)
                            .each(function (d) { this._current = enterArc(d); });

                        path.transition()
                            .style("fill-opacity", 1)
                            .attrTween("d", function (d) { return arcTween.call(this, updateArc(d)); });
                    });
                }

                function key(d) {
                    var k = [], p = d;
                    while (p.depth) k.push(p.name), p = p.parent;
                    return k.reverse().join(".");
                }

                function fill(d) {
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

                function updateArc(d) {
                    return { depth: d.depth, x: d.x, dx: d.dx };
                }
         }
                    
        return {
            render:render
        }
    }
    
}());