
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it
        $.ajax({
            url: '/tweets',
            contentType: 'application/json',
            success: function(response) {
                    var tbodyA = $('#namebody'); //stupid idiot baby
                    tbodyA.html('');

                    response.tweetinfo.forEach(function (Object) {
                        tbodyA.append('\
                        <tr>\
                            <td class="id">' + Object.user.id + '</td>\
                            <td><input type="text" class="screen name" value="' + Object.user.screen_name + '"></td>\
                            <td><input type="text" class="name" value="' + Object.user.name + '"></td>\
                        </tr>\
                        ');
                });
            }
        });
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
        $.ajax({
            url: '/tweetinfo',
            contentType: 'application/json',
            success: function(response) {

                    var tbodyB = $('#tweetbody');
                    tbodyB.html('');

                    response.tweetinfo.forEach(function (Object) {
                    tbodyB.append('\
                        <tr>\
                            <td class="id";>'   + Object.id +   '</td>\
                            <td height ="25px">'  + Object.text +  '</td>\
                            <td>' + Object.created_at + '</td>\
                        </tr>\
                        ');
                });
            }
        })
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
        $.ajax({
            url: '/searchinfo',
            contentType: 'application/json',
            success: function(response) {

                var tbodyC = $('#searchbody');
                tbodyC.html('');


            }
        })


    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');

        //TODO: creat a tweet
        $.ajax({
            url: '/tweetinfo',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({tweetIDNAME: createInput.val()}),
            success: function(response) {
                console.log(response);
                createInput.val('');
                $('#get-tweets-button').click();
            }
        })
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
    
    //TODO: search a tweet and display it.
      $.ajax({
          url: '/searchinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({userID: userID.val()}),
          success: function(response) {
              var tbodyC = $('#searchbody');
              tbodyC.html('');
              var index;
              response.tweetinfo.forEach(Object => {
                  if(Object.user.id == parseInt(userID.val())){
                      index = response.tweetinfo.indexOf(Object);
                      //console.log(index);
                  }

              });

                  tbodyC.append('\
                        <tr>\
                            <td class="id";>'   + response.tweetinfo[index].id +   '</td>\
                            <td height ="25px">'  + response.tweetinfo[index].text +  '</td>\
                            <td>' + response.tweetinfo[index].created_at + '</td>\
                        </tr>\
                        ');
          }
      })

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event) {
      event.preventDefault();
      var updateInput = $('#update-input');
      var inputString = updateInput.val();

      const parsedStrings = inputString.split(';');

      var nm = parsedStrings[0];
      var newName = parsedStrings[1];

      //TODO: update a tweet
      $.ajax({
          url: '/tweets/' + nm,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({data:parsedStrings}),
          success: function(response) {
              console.log(response);
              updateInput.val('');
              $('#get-button').click();
          }
      })


  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input')
      var tweetid = id.val();
      event.preventDefault();

    //TODO: delete a tweet
      $.ajax({
          url: '/tweetinfo/',
          method: 'DELETE',
          contentType: 'application/json',
          data: JSON.stringify({id: tweetid}),
          success: function(response) {
              console.log(response);
              $('#get-tweets-button').click();
          }
      })


  });


});


//<td><input type="text" class="tweettext" value="' + Object.text + '"></td>\
   