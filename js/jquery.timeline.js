/* jquery timeline
	 using
		jquery 1.3.2
		jquery ui 1.7.1 (core, ui.slider)
*/

var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
var monthDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

(function($) {
	$.fn.timeline = function(options) {
	var opts = $.extend({}, $.fn.timeline.defaults, options);
		return this.each(function() {
			$this = $(this);

			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

			$this.addClass('timeline');
			$this.css('width', o.monthSize * 12);


			$this.children('.slider').slider({
				range: true,
				min: 1,
				max: 365,
				slide: function(event, ui) {
					if(o.slide)
						o.slide(event, ui, getDateFromNum(ui.values[0]), getDateFromNum(ui.values[1]));
					},
				change: function(event, ui) {
					if(o.change)
						o.change(event, ui, getDateFromNum(ui.values[0]), getDateFromNum(ui.values[1]));
				}
			});

			var i = 0;

			$(months).each(function() {
				var m = document.createElement('span');
				$(m).text(months[i].substring(0,3));
				$(m).addClass('month');
				$(m).attr('month', i)
				$(m).css('width', o.monthSize);

				$(m).click(function(){
					var selectedMonth = $(this).attr('month');
					$this.children('.slider').slider('values' , 0 , 1);
					$this.children('.slider').slider('values' , 1 , 365);
					$this.children('.slider').slider('values' , 0 , getDayFromDate(selectedMonth, 1));
					$this.children('.slider').slider('values' , 1 , getDayFromDate(selectedMonth, monthDays[selectedMonth]));
				});

				$this.append(m);
				i++;
			});

		});
	};

	function getDayFromDate(month, day) {

		var d = 0;
		for(var i=0; i<12; i++) {

			if(month == i)
			{
				break;
			}

			d += monthDays[i];
		}

		return d + day;
}

		function getDateFromNum(dayNum) {
			if(dayNum>366 || dayNum<1)
			{
				return "";
			}

		if(dayNum==366 && monthDays[1]==28)
			{
				dayNum = 365;
			}

		var len = monthDays.length;
		var sum = 0;
		var prevSum = 0;

		for (var i=0;i<len; i++)
		{
		sum += parseInt(monthDays[i]);

	        if(dayNum<sum)
	        {
	            return (i+1) + "/" + (dayNum - prevSum);
	        }
	        else if(dayNum==sum)
		{
			return (i+1) + "/" + monthDays[i];
		}

		prevSum += parseInt(monthDays[i]);
		}
		return dayNum + "-" + sum;
	};

	$.fn.timeline.defaults = {
		monthSize : 50
	};
})(jQuery);