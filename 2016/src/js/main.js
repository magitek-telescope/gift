$(function (){
	$.ajax({
		url: 'list.json',
		dataType: 'json'
	})
	.done(function(data) {
		$("#gift-person-count").text(data.info.person + "人");
		$("#gift-items-count").text(data.info.items + "個");

		$.each(data.presents, function(index, val) {
			var card = template(this);
			 $("#list").append(card);
		});
	});
})