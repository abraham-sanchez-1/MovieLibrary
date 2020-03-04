
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
    $.each(data, function(i, movie){
        $('#movieList').append(
            "<tr>" +
              "<td>" + movie.title + "</td>" +
              "<td>" + movie.genre + "</td>" +
              "<td>" + movie.director + "</td>" +
              "<td>" + createButtonWithId(movie.movieId) + "</td>" + 
            "</tr>"
        );
    });
}

function createButtonWithId(id){
    let button = '<a href="#ex1" rel="modal:open"><button class="btn btn-success btn-sm" value="' + id + '" onclick=changeModalForm(this.value)>Edit</button></a>';
    console.log(button);
    return button;
}
function createModal(){
    let modal = '<p><a href="#ex1" rel="modal:open">Open Modal</a></p>';
    return modal;
}
function changeModalForm(id){
    $.get(("https://localhost:44325/api/movie/"+id), function(data){
        document.getElementById("editForm").innerHTML =   '<input class="form-control" type="text" name="title" placeholder="'+data.title +'"/><input class="form-control" type="text" name="genre" placeholder="'+data.genre +'" /><input class="form-control" type="text" name="director" placeholder="'+data.director +'" />';
    });
}

function alertScream(id){
    alert("Relevant id here is : " + id);
}

function displayModal(){
  var modal = document.getElementById("pageopen");
  modal.style.display = "block";
}

($(document).ready(function(){
    getMovies();
}));
$('#my-form').submit( processForm );
$('#editForm')
