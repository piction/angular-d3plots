
(function () {
    'use strict';

    function implementation(d3) {

        function getMaxWidthOfTexts(txtArray, fontSize) {
            var longestLabel = "";
            var maxLabelLength = 0;
            for (var i = 0; i < txtArray.length; i++) {
                if (maxLabelLength < txtArray[i].length) {
                    longestLabel = txtArray[i];
                    maxLabelLength = txtArray[i].length;
                }
            }
            return getWidthOfText(longestLabel, fontSize);
        }
    
        function getWidthOfText(txt, fontsize) {
            // Create dummy span
            var hidden = $('<span class="testtextlength" style="display:none;">test</span>');
            $(hidden).css('font-size', fontsize + 'px');
            $('body').append(hidden);
            hidden.text(txt);
            var len = hidden.width();
            $('.testtextlength').remove();
            return len;
        }

        function wrapMultiLine(msgList, fontSizeAxis) {
                        msgList.each(function() {

                            var text = d3.select(this),
                                words = text.text().split(/\s+/).reverse(),
                                y = text.attr('y'),
                                dy = parseFloat(text.attr('dy')),
                                tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'px');
                            text.append('tspan').attr('x', 0).attr('y', y).attr('dy', 1 * fontSizeAxis + dy + 'px').text(words[0]);
                            text.append('tspan').attr('x', 0).attr('y', y).attr('dy', 2 * fontSizeAxis + dy + 'px').text(words[1]);

                        });
                    }

        return {
            wrapMultiLine: wrapMultiLine,
            getWidthOfText: getWidthOfText,
            getMaxWidthOfTexts: getMaxWidthOfTexts
        };
    }

    var declaration = ['d3', implementation];
    angular.module('d3').factory('d3UtilitiesService', declaration);
}());