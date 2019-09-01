$(function(){

  function appendUsers(user){
    var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">
                  ${user.name}
                 </p>
                 <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                  追加
                 </a>
                </div>`
                $("#user_search_result").append(html);
                return html;
  }

  function appendNoUsers(info) {
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ info }</p>
              </div>`
              $("#user_search_result").append(html);
  }

  function appendMembers(name, user_id){
    var html = `<div class='chat-group-user'>
                 <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>
                   ${name}
                  </p>
                 <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
                  削除
                 </div>
               </div>`
               $("#member_search_result").append(html);
  }
  
 $(function(){
  $(".chat-group-form__input").on("keyup", function() {
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    
    .done(function (users){
      if (input.length == 0 ){
        $("#user_search_result").empty();
      }

      else if (users.length !== 0){
        $("#user_search_result").empty();
        users.forEach(function (user) {
          appendUsers(user);
        });
      }

      else{
        $("#user_search_result").empty();
        appendNoUsers("一致するユーザーはいません");
      }
    })

    .fail(function(){
      alert('ユーザー検索に失敗しました' );
    })
  });
 });

 $(document).on("click", '.user-search-add', function(){
  var name = $(this).data("user-name");
  var id   = $(this).data("user-id");
  appendMembers(name, id);
  $(this).parent().remove();
 });

 $(document).on("click", '.user-search-remove', function(){
  $(this).parent().remove();
 });

 $(document).on("click", '.chat-group-user', function(){
  $(this).parent().remove();
 });
});


