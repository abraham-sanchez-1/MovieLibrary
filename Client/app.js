(function($){
    function processForm( e ){
        var dict = {
            Title : this["title"].value,
            Genre : this["genre"].value,
        	Director: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
                getMovies();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( processForm );
    //PUT
    function editMovie( id ){
        var dict = {
            Title : this["title"].value,
            Genre : this["genre"].value,
        	Director: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie' + id,
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('title').val('');
                $('genre').val('');
                $('director').val('');

                getMovies();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }
})(jQuery);

function getMovies(){
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: (data, textStatus, jqXHR) => createTable(data),
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }

    })
}
function createTable(data, textStatus, jQxhr){
    $('#movieList').html('');
    $.each(data, function(i, value){
        $('#movieList').append(
            "<tr>"
                + "<td>" + value.title + "</td>" + "<td>" + value.genre + "</td>" + "<td>" + value.director + "</td>" +
            "</tr>"

        );
    });
}
($(document).ready(function(){
    getMovies();
}));
