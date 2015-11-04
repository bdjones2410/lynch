$(document).ready(function() {
   main.init();
});

var curData;
var main ={
    urlMessages: "https://tiny-tiny.herokuapp.com/collections/lynchberg/",
    urlUsers:"https://tiny-tiny.herokuapp.com/collections/lynchUser/",


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

    $('.chatbox').on('click','.delete-button',function(){
      var id = $(this).parent('div').attr('id');
      main.deleteMessages(id);
    });


     $('section').on('click', '.signInSubmit', function(e) {
       e.preventDefault();
       $('.page1').addClass('hidden');
       $('.container').removeClass('hidden');
       var userEntry = $(this).siblings('input[name="username"]').val();
       var avatarEntry = $(this).siblings('input[name="avatar"]').val();
     });
  },


  startFixedWindowAtBottom: function(item) {
    var div = document.getElementsByClassName(item);
    div[0].scrollTop = div[0].scrollHeight;
  },

 loadMessages:function(data){
   $('.generatedChat').remove();
   var tmpl = _.template(templates.userInput);
   _.each(data, function(el){
     $('.chatfield').prepend(tmpl(el));
 });

   var timeRefresh = function(){ window.setTimeout(main.grabMessages, 2000);
   }
   timeRefresh();
 },


 loadUsers:function(data){
   var tmpl = _.templates(templates.activeUsers);
   $('aside .users').append(tmpl(data));
   console.log(data);
 },


grabUsers:function(){
   $.ajax({
     url:main.urlUsers,
     method:'GET',
     success:function(users){
       console.log(users);
       main.loadUsers(users);
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
