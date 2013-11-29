$(document).ready(function () {
	build_calendar();
	add_link();
	next_month();
});

var date = new Date();

var add_link = function() {
	var clicks = 0;
	$(".today").on("click", function () {
		$(this).toggleClass('done');
		clicks++;
		if (clicks % 2 == 0) {
			$('body').prepend('<div id="congrats"><p>Aww... it&rsquo;s OK. It happens to the best of us.</p></div>');
			$('#congrats').fadeIn();
			$('#congrats').delay(2200).fadeOut();
		} else {
			$('body').prepend('<div id="congrats"><p>Congratulations! You&rsquo;ve added a link to the chain!</p></div>');
			$('#congrats').fadeIn();
			$('#congrats').delay(2200).fadeOut();
		}
	});
}

var build_calendar = function() {
	$('#calendar-title').html('<button id="previous">&larr;</button>' + '<pre>  </pre>' + get_Month(date) + " " + date.getFullYear() + '<pre>  </pre>' + '<button id="next">&rarr;</button>');
	populate_dates(date);
};

var get_Month = function(date) {
	switch (date.getMonth()) {
		case 0:
			return "January";
			break;
		case 1:
			return "February";
			break;
		case 2:
			return "March";
			break;
		case 3:
			return "April";
			break;
		case 4:
			return "May";
			break;
		case 5:
			return "June";
			break;
		case 6:
			return "July";
			break;
		case 7:
			return "August";
			break;
		case 8:
			return "September";
			break;
		case 9:
			return "October";
			break;
		case 10:
			return "November";
			break;
		case 11:
			return "December";
			break;
	}
};

var populate_dates = function(date) {
	$('td').empty();
	var selected_tr = $('#first-row');
	var selected_td = selected_tr.children('td:first');
	var date_number = 0;
	var j = 1, start_day = 1;
	var not_on_start_day = true;
	var start_of_month = new Date(date.getFullYear(), date.getMonth(), 1);
	var days = days_in_month(date);

	while(not_on_start_day) {
		if ((start_day + 6) % 7 == (start_of_month.getDay() + 7) % 7) {
			not_on_start_day = false;
			break;
		}
		start_day++;
		selected_td = selected_td.next();
	}

	for (var i = 1; i < 6; i++) {
		for (j; j <= (7 * i) - start_day + 1; j++) {
			if (j > days)
				break;
			selected_td.text(j);
			if (j == date.getDate())
				selected_td.addClass("today");
			selected_td = selected_td.next();
		}
		selected_tr = selected_tr.next();
		selected_td = selected_tr.children('td:first');
	}

	if (parseInt($('#last').text()) < days) {
		$('tbody').append('<tr id="new-row"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
		selected_tr = $('#new-row');
		selected_td = selected_tr.children('td:first');
		for (j; j <= (7 * i) - start_day + 1; j++) {
			if (j > days)
				break;
			selected_td.text(j);
			if (j == date.getDate())
				selected_td.addClass("today");
			selected_td = selected_td.next();
		}
	}
};

var days_in_month = function(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

var next_month = function() {
	$('#next').on('click', function() {
		date.setMonth(date.getMonth() + 1);
		$('#calendar-title').html('<button id="previous">&larr;</button>' + '<pre>  </pre>' + get_Month(date) + " " + date.getFullYear() + '<pre>  </pre>' + '<button id="next">&rarr;</button>');
		populate_dates(date);
	});
};
