$(document).ready(function() {
   main.init();
});


var main ={
     urlMessages: "https://tiny-tiny.herokuapp.com/collections/lynchberg/",
     urlUsers:"https://tiny-tiny.herokuapp.com/collections/lynchBros/",

   init:function() {
     main.styling();
     main.events();

   },

    styling: function(){
      main.grabMessages();
   },


   events:function(){



      main.grabMessages();
      // Edit.events ();
      $('.textbox').on('click', '.subbut',function(e) {
        e.preventDefault();
        var messageText = $(this).siblings('input[name="message"]').val();
        var data ={
          username: "lauren",
          message: messageText,
          avatar: "http://31.media.tumblr.com/fffd0f8677c5f75e47bfbaa9a17c44e9/tumblr_neyjbn8JGm1texwuzo1_400.gif",
        };

        main.postMessage(data);


        $(this).siblings('input[name="message"]').val(' ');

      });


    //  $('.textbox').keypress(function(e){
    //   if(e.which == 13){//Enter key pressed
    //       $('.subbut').click();//Trigger search button click event
    //   }
    // });
    $('.chatbox').on('click','.delete-button',function(){
      var id = $(this).parent('div').attr('id');
      main.deleteMessages(id);
    });

      $('section').on('click', '.signInSubmit', function(e) {
        e.preventDefault();
        var userEntry = $(this).siblings('input[name="username"]').val();
        var avatarEntry = $(this).siblings('input[name="avatar"]').val();
        //check if user exists in database if not add to database
        main.checkUsers(userEntry,avatarEntry);
        $('.page1').addClass('hidden');
        $('.container').removeClass('hidden');
         main.startFixedWindowAtBottom('chatfield');
        main.grabUsers();

            });
   },



  //    $('section').on('click','.signInSubmit', function(e) {
  //      e.preventDefault();
  //      $('.page1').addClass('hidden');
  //      $('.container').removeClass('hidden');
  //      main.startFixedWindowAtBottom('chatfield');
  //      var userEntry = $(this).siblings('input[name="username"]').val();
  //      var avatarEntry = $(this).siblings('input[name="avatar"]').val();
  //    });
  // },



  startFixedWindowAtBottom: function(item) {
    var div = document.getElementsByClassName(item);
    div[0].scrollTop = div[0].scrollHeight;
  },

 loadMessages:function(data){
   var html = " ";
   var tmpl = _.template(templates.userInput);
   _.each(data, function(el){
     html += tmpl(el);
 });
   $('.chatfield').html(html);

 },


  loadUsers:function(data){
    var tmpl = _.template(templates.activeUser);
    var array = [];
    _.each(data,function(el){
      $('aside .curOnline').append(tmpl(el));
      console.log("load users");
    })

  },




grabUsers:function(){
   $.ajax({
     url:main.urlUsers,
     method:'GET',
     success:function(user){
       main.loadUsers(user);
     }
   });
},
checkUsers:function(inputUsername,avatarEntry){
  var data = {
    username : inputUsername,
    avatar : avatarEntry,
    status: "active",
  }
  var bool = true;
  $.ajax({
    url:main.urlUsers,
    method:'GET',
    success:function(users){
      _.each(users,function(el){
        if(el.username === inputUsername){
          bool = false;
        }
      });
      if(bool === true){
        console.log("you may add me to database");
        main.postUsers(data);
        localStorage.setItem('username',inputUsername);
      }else{
        console.log("try again");
      }
    },
    failure:function(users){
      console.log("You are a looser");
    }
  });

},
  postUsers:function(user){
    $.ajax({
      url:main.urlUsers,
      method:'POST',
      data: user,
      success:function(data){
        console.log(data);
      },
      failure:function(data){
        console.log("You are a failure" + data);
      }
    });
  },
  deleteUsers:function(userId){
      $.ajax({
        url: main.urlUsers + userId,
        method: 'DELETE',
        success:function(data){
          console.log(data + "deleted");

        },
        failure:function(){
          console.log(data+ " :not deleted, idiot");
        }

      });
  },
 postUsers:function(user){
   $.ajax({
     url:main.urlUsers,
     method:'POST',
     data: user,
     success:function(data){
       console.log(data);

     },
     failure:function(data){
       console.log("You are a failure" + data);
     }
   });
 },
 deleteUsers:function(userId){
     $.ajax({
       url: main.urlUsers + userId,
       method: 'DELETE',
       success:function(data){
         console.log(data + "deleted");

       },
       failure:function(){
         console.log(data+ " :not deleted, idiot");
       }

     });
 },

 postMessage: function(message) {
 $.ajax({
   url: main.urlMessages,
   method: 'POST',
   data: message,
   success: function(resp) {
     console.log(resp);
     var tmpl = _.template(templates.userInput);
     $('.chatfield').append(tmpl(resp));
     main.startFixedWindowAtBottom('chatfield');

   },
   failure: function(resp) {
     console.log("FAILURE", resp);
   }
 });
},
grabMessages: function() {
 $.ajax({
   type: 'GET',
   url: main.urlMessages,
   success: function(data) {
     main.loadMessages(data);

   },
   failure: function(data) {
     console.log("FAILURE: ", data);
   }
 });
},

deleteMessages: function(messageId) {
 $.ajax({
   method: 'DELETE',
   url: main.urlMessages + messageId,
   success: function(data) {
     console.log("DELETED", data);
     var id = '#' + messageId;
     $(id).remove();
   },
   failure: function(data) {
     console.log("ERROR", data);
   }
 });
},
deleteAll:function(){
 $.ajax({
   method: 'DELETE',
   url:main.urlMessages,
   success:function(){
     console.log('all deleted');
   }
 });
}
};
