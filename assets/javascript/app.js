$(function() { 

    var titles = ['dog', 'cat', 'kangaroo', 'cheetah', 'flamingo', 'penguin', 'shark'];

    function renderTitles(Title) {
        var title=Title;
        var a = $('<button>')
        a.addClass('titletext btn btn-md');
        a.attr('data-name', title);
        a.text(title);
        $('#subjectTitles').append(a);
        
    }

    function callGiphyApi(Title) {
        var title=Title;
        // console.log(title);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + title +
        "&api_key=dc6zaTOxFJmzC&limit=10&fmt=JSON";
        
        $.ajax({
                url: queryURL,
                method: 'GET'
        })
          .done(function(response) {
             processImgSrc(response.data);
          });

    }


    function processImgSrc(resp) {
        // console.log(resp);
        $('.col-md-8').empty();
    
        for (var i = 0; i < resp.length; i++) {
            var divImg = $('<div class="giphyimg">');
            var rating = $('<p>').text('Rating: ' + resp[i].rating); 
            divImg.append(rating);
       
            var titleImg= $('<img>'); 
            titleImg.attr('src', resp[i].images.fixed_height_still.url);
            titleImg.attr('data-still',resp[i].images.fixed_height_still.url);
            titleImg.attr('data-animate',resp[i].images.fixed_height_downsampled.url);
            titleImg.attr('data-state','still');
            titleImg.addClass('giphyimg');
            divImg.append(titleImg);
            $('#titleImg').append(divImg);
       
        }
    }

  
    $(document).on('click', '.titletext', function() {
        var title = $(this).attr('data-name');
        callGiphyApi(title);
        $(this).css('color', 'white');         
    });

  
    $(document).on('click', '.giphyimg', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
          $(this).attr('src', $(this).data('animate'));
          $(this).attr('data-state', 'animate');
        }else {
          $(this).attr('src', $(this).data('still'));
          $(this).attr('data-state', 'still');
        }
                 
    });


    $('#addTitle').on('click', function() {
        var title = $('#title-input').val().trim();
        if  (!title == "") {
            titles.push(title);
            renderTitles(title);
            $('#title-input').val("");
            
        }
        $('#addTitle').css('color', 'white');
        return false;
    });


    // start 

    for (var i = 0; i < titles.length; i++){
        renderTitles(titles[i]);

    }

    // end


}); // end of ready
