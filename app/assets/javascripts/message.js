$(function(){

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.chat-right__comment__box:last').data('id')
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        var insertHTML = buildPost(message)
        $('.chat-right__comment').append(insertHTML)
        $('.chat-right__comment').animate({ scrollTop: $('.chat-right__comment')[0].scrollHeight});
      })
      
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
   }
  };

  

function buildPost(message){
 var image =( message.image !== null ?
    `<div class="chat-right__comment__box__message" data-id= "${message.id}">
    <img src=${message.image} alt="image" height="300" width="300">
    </div>`:
     ``);
    
  var html =`<div class="chat-right__comment__box" data-id= "${message.id}" >
              <div class="chat-right__comment__box__name">
               <div class="chat-right__comment__box__name__user">
                 ${message.name}
               </div>
               <div class="chat-right__comment__box__name__time">
                 ${message.date}
               </div>
               </div>
               <div class="chat-right__comment__box__message">
                <p class="lower-message__content">
                 ${message.content}
                </p>
                 ${image}
               </div>
             </div>`
  return html;
}

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildPost(message);
      $('.chat-right__comment').append(html);
      $('#new_message')[0].reset();
      $('.chat-right__comment__form--send').attr('disabled', false);
      $('.chat-right__comment').animate({ scrollTop: $('.chat-right__comment')[0].scrollHeight});
    })
    .fail(function(){
      alert('エラー');
      $('.chat-right__comment__form--send').attr('disabled', false);
    });
  });
  setInterval(reloadMessages, 5000);
});



