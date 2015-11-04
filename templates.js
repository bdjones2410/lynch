// this section is used to define templates inside this array.

var templates ={

//append to .chatfield ////

  userInput:[
    '<div class="col-md-12 generatedChat" id = <%=_id%>> ',
    '<div class="col-md-2 username">',
    '<div class="col-md-12 userImg">',
    '<img src="<%= avatar%>" alt="">',
    '</div>',
    '<div class="col-md-12 userid">',
    '<%=username%>',
    '</div>',
    '</div>',
    '<div class="col-md-10 usermessage">',
    '<%=message%>',
    '</div>',
    '<button class = "btn btn-danger delete-button" type="button" name="delete">Delete</button>',
    '</div>',
  ].join(""),


//append to .curOnline ///
  activeUser: [
    '<div class="activeUsers">',
    '<%=username%>',
    '</div>',
  ].join(""),

};
//
//
