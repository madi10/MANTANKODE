				$('#linkloadmore').on('click',function(event){
				event.preventDefault();
				var elload = $("#Blog1_pagination-old");
				var link = elload.attr('href');
				var alreadyClicked = elload.data('clicked');
				if (alreadyClicked) {
				return false;
				}
				elload.data('clicked', true);
				$('#linkloadmore a span').html('Loading...');
				$.ajax({
				url : link,
				dataType: 'html',
				success: function(data){
				var source = $(data).find('.blog-posts').length ? $(data) : $('<div></div>');
				$(".blog-posts").append(source.find('.blog-posts').html());
				$("#linkloadmore").html(source.find('#Blog1_pagination-old').clone());
				elload.data('clicked', false);
				}
				})
				})