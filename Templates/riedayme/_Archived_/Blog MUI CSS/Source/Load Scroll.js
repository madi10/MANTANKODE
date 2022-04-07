				var state = false;
				if (state == false) {
				$("#linkloadmore").hide();			
				$(window).scroll(function () {		
				var bodyHeight = document.body.offsetHeight;
				var footerheight = $("#footer").height();
				var offsetload = bodyHeight - footerheight;
				if ((window.innerHeight + window.scrollY) >= offsetload) {
				if (state==false){ 
				loadscroll();
				};
				}
				});			
				}

				function loadscroll(){
				if (state == false) {
				state = true;
				$("#linkloadmore").show();
				$('#linkloadmore a').html('<img src="data:image/gif;base64,R0lGODlhKwALAPAAAKrD2AAAACH5BAEKAAEAIf4VTWFkZSBieSBBamF4TG9hZC5pbmZvACH/C05FVFNDQVBFMi4wAwEAAAAsAAAAACsACwAAAjIMjhjLltnYg/PFChveVvPLheA2hlhZoWYnfd6avqcMZy1J14fKLvrEs/k+uCAgMkwVAAAh+QQBCgACACwAAAAAKwALAIFPg6+qw9gAAAAAAAACPRSOKMsSD2FjsZqEwax885hh3veMZJiYn8qhSkNKcBy4B2vNsa3pJA6yAWUUGm9Y8n2Oyk7T4posYlLHrwAAIfkEAQoAAgAsAAAAACsACwCBT4OvqsPYAAAAAAAAAj1UjijLAg9hY6maalvcb+IPBhO3eeF5jKTUoKi6AqYLwutMYzaJ58nO6flSmpisNcwwjEfK6fKZLGJSqK4AACH5BAEKAAIALAAAAAArAAsAgU+Dr6rD2AAAAAAAAAJAVI4oy5bZGJiUugcbfrH6uWVMqDSfRx5RGnQnxa6p+wKxNpu1nY/9suORZENd7eYrSnbIRVMQvGAizhAV+hIUAAA7"/>');
				var link = $("#Blog1_pagination-old").attr('href');
				if (link !== undefined) {
				$.ajax({
				url : link,
				dataType: 'html',
				success: function(data){
				var source = $(data).find('.blog-posts').length ? $(data) : $('<div></div>');
				$(".blog-posts").append(source.find('.blog-posts').html());
				$("#linkloadmore").html(source.find('#Blog1_pagination-old').clone());
				$("#linkloadmore").hide();
				state = false;
				}
				})							
				}else {
				$("#linkloadmore").remove();
				}			
				}
				}