$(document).ready(function () {
	build_calendar();
	change_month();
	$('#color_scheme').on('change', function() {
		change_color($('#color_scheme').val());
	});
});

var date = new Date();

var build_calendar = function() {
	$('#title').html('<span id="month">' + get_Month(date) + '</span> <span id="year">' + date.getFullYear() + '</span>');
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
	color_today();
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
			var today = new Date();
			if (j == date.getDate() && $('#month').text() == get_Month(today) && $('#year').text() == today.getFullYear()) {
				selected_td.addClass("today");
				color_today();
			}
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
			if (j == date.getDate() && $('#month').text() == get_Month(date) && $('#year').text() == date.getFullYear()) {
				selected_td.addClass("today");
				color_today();
			}
			selected_td = selected_td.next();
		}
	}
	else
		$('#new-row').remove();
};

var days_in_month = function(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

var change_month = function() {
	$('#next').on('click', function() {
		date.setMonth(date.getMonth() + 1);
		$('#title').html('<span id="month">' + get_Month(date) + '</span> <span id="year">' + date.getFullYear() + '</span>');
		populate_dates(date);
	});

	$('#previous').on('click', function() {
		date.setMonth(date.getMonth() - 1);
		$('#title').html('<span id="month">' + get_Month(date) + '</span> <span id="year">' + date.getFullYear() + '</span>');
		populate_dates(date);
	});
};

var change_color = function(value) {
	if (value == "light") {
		$('table').css('background-color', '#FFF');
		$('td').css('color', '#000');
		$('td').css('border-color', '#000');
		$('.today').css('background-color', '#BDD6A7');
	}
	if (value == "dark") {
		$('table').css('background-color', '#000');
		$('td').css('color', '#FFF');
		$('td').css('border-color', '#FFF');
		$('.today').css('background-color', '#987BAA');
	}
	if (value == "colorful") {
		$('table').css('background-color', '#81AFD4');
		$('td').css('color', '#474747');
		$('td').css('border-color', '#FFF');
		$('.today').css('background-color', '#F6905D');
	}
};

var color_today = function() {
	var today = new Date();
	if ($('#month').text() == get_Month(today)) {
		var value = $('#color_scheme').val();
		change_color(value);
	}
	else {
		$('.today').css('background-color', $('td').css('background-color'));
		$('.today').removeClass('today');
	}
};
