Template.charts.rendered = function () {
  var closedSalesChart = null;
  drawChartClosedSales();
  
  var dbSizeChart = null;
  drawDbSizeChart();
  
  var barChartClosedSales = null;
  drawBarChartClosedSales();
  
  var chartSalesProductType = null;
drawChartSalesProductType();
  
  
};

/*
 * morris.js Donut chart
 * Clear the target DOM element and draw the sample charts
 * Samples come from the morris.js site at http://www.oesmith.co.uk/morris.js/
 */

var drawChartClosedSales = function() {

    $("#chartClosedSales").empty();

    //create custom Donut function with click event on the segments
    var myDonut = Morris.Donut;

    myDonut.prototype.redraw = function() {

        var C, cx, cy, i, idx, last, max_value, min, next, seg, total, value, w, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
      this.raphael.clear();
      cx = this.el.width() / 2;
      cy = this.el.height() / 2;
      w = (Math.min(cx, cy) - 10) / 3;
      total = 0;
      _ref = this.values;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        value = _ref[_i];
        total += value;
      }
      min = 5 / (2 * w);
      C = 1.9999 * Math.PI - min * this.data.length;
      last = 0;
      idx = 0;
      this.segments = [];
      _ref1 = this.values;
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        value = _ref1[i];
        next = last + min + C * (value / total);
        seg = new Morris.DonutSegment(cx, cy, w * 2, w, last, next, this.data[i].color || this.options.colors[idx % this.options.colors.length], this.options.backgroundColor, idx, this.raphael);
        seg.render();
        this.segments.push(seg);
        seg.on('hover', this.select);
        seg.on('click', this.select);
        last = next;
        idx += 1;
      }
      this.text1 = this.drawEmptyDonutLabel(cx, cy - 10, this.options.labelColor, 15, 800);
      this.text2 = this.drawEmptyDonutLabel(cx, cy + 10, this.options.labelColor, 14);
      max_value = Math.max.apply(Math, this.values);
      idx = 0;
      _ref2 = this.values;
      _results = [];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        value = _ref2[_k];
        if (value === max_value) {
          this.select(idx);
          break;
        }
        _results.push(idx += 1);
      }
      return _results;
    };

    closedSalesChart = myDonut({
        element: 'chartClosedSales',
        data: [
          {label: 'Guy Bardsley', value: 550 },
          {label: 'Adam Callahan', value: 1500 },
          {label: 'Arlo Geist', value: 3750 },
          {label: 'Sheila Hutchins', value: 3500 },
          {label: 'Jeanette Quijano', value: 1250 },
          {label: 'Simon Sweet', value: 5250 }
        ],
        formatter: function (y, data) { 
            //prefixes the values by an $ sign, adds thousands seperators

            nStr = y + '';
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return '$ ' + x1 + x2;
        }
      });

};

//draw the charts when the DOM is ready
$(document).ready( function() {
    drawChartClosedSales();
});

//on resize of the page: redraw the charts
$(window)
    .on('resize', function() {
        window.setTimeout( function() {
            if (closedSalesChart !== null) { closedSalesChart.redraw(); }
        }, 250);
    });



			
/*
 * morris.js Area chart
 * Clear the target DOM element and draw the sample charts
 * Samples come from the morris.js site at http://www.oesmith.co.uk/morris.js/
 */


var drawDbSizeChart = function() {

    $("#chartDbSize").empty();

    dbSizeChart = Morris.Area({
        element: 'chartDbSize',
        data: [
          {period: '2014 Q1', companies: 1256, contacts : 3788},
          {period: '2014 Q2', companies: 1422, contacts : 4350},
          {period: '2014 Q3', companies: 1475, contacts : 4495},
          {period: '2014 Q4', companies: 1528, contacts : 4601}
        ],
        xkey: 'period',
        ykeys: ['companies', 'contacts'],
        labels: ['Companies', 'Contacts'],
        pointSize: 2,
        hideHover: 'auto'
      });

};

//draw the charts when the DOM is ready
$(document).ready( function() {
    drawDbSizeChart();
});

//on resize of the page: redraw the charts
$(window)
    .on('resize', function() {
        window.setTimeout( function() {
            if (dbSizeChart !== null) { dbSizeChart.redraw(); }
        }, 250);
    });


/* Morris.Bar
 * Clear the target DOM element and draw the sample charts
 * Samples come from the morris.js site at http://www.oesmith.co.uk/morris.js/
 */

var drawBarChartClosedSales = function() {

    $("#chartForecastVsQuota").empty();

    barChartClosedSales = Morris.Bar({
        element: 'chartForecastVsQuota',
        data: [
            {name: 'Guy Bardsley', forecast: 2750, quota: 4000},
            {name: 'Adam Callahan', forecast: 3300, quota: 4000},
            {name: 'Arlo Geist', forecast: 4500, quota: 4000},
            {name: 'Sheila Hutchins', forecast: 4100, quota: 4000},
            {name: 'Jeanette Quijano', forecast: 1800, quota: 2000},
            {name: 'Simon Sweet', forecast: 6200, quota: 4000}
        ],
        xkey: 'name',
        ykeys: ['forecast', 'quota'],
        labels: ['Forecast', 'Quota'],
        xLabelAngle: 20,
        hideHover: 'auto'
    });

};

//draw the charts when the DOM is ready
$(document).ready( function() {
    drawBarChartClosedSales();
});

//on resize of the page: redraw the charts
$(window)
    .on('resize', function() {
        window.setTimeout( function() {
            if (barChartClosedSales !== null) { barChartClosedSales.redraw(); }
        }, 250);
    });


/*
 * Clear the target DOM element and draw the sample charts
 * Samples come from the morris.js site at http://www.oesmith.co.uk/morris.js/
 */

var drawChartSalesProductType = function() {

    $("#chartSalesProductType").empty();

    var sales = [
       {"period": "2014 Q1", "stingray": 4.3, "barracuda": 15.1, "mako" : 5.9, "sailfish": 2.1 },
       {"period": "2014 Q2", "stingray": 6.5, "barracuda": 25.5, "mako" : 13.7, "sailfish": 5 },
       {"period": "2014 Q3", "stingray": 10.2, "barracuda": 35.7, "mako" : 20.6, "sailfish": 9.6 },
       {"period": "2014 Q4", "stingray": 5.9, "barracuda": 20.3, "mako" : 10.5, "sailfish": 14.4 }
  ];
  chartSalesProductType = Morris.Line({
    element: 'chartSalesProductType',
    data: sales,
    xkey: 'period',
    ykeys: ['stingray', 'barracuda', 'mako', 'sailfish'],
    labels: ['Stingray', 'Barracuda', 'Mako', 'Sailfish']
  });

};

//draw the charts when the DOM is ready
$(document).ready( function() {
    drawChartSalesProductType();
});

//on resize of the page: redraw the charts
$(window)
    .on('resize', function() {
        window.setTimeout( function() {
            if (chartSalesProductType !== null) { chartSalesProductType.redraw(); }
        }, 250);
    });
