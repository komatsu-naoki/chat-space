$(function(){



function buildPost(message){
  if(message.image !== null) {
    var image =`<div class="chat-right__comment__box__message">
    <img src=${message.image} alt="image" height="300" width="300">
    </div>`;}
    else{
      var image = ``;
    }
  var html =`<div class="chat-right__comment__box">
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
      $('.chat-right__comment').append(html)
      $('#message_content').val('')
      $('#message_image').val('')
      $('.chat-right__comment__form--send').attr('disabled', false);
      $('.chat-right__comment').animate({ scrollTop: $('.chat-right__comment')[0].scrollHeight});
    })
    .fail(function(){
      alert('エラー');
      $('.chat-right__comment__form--send').attr('disabled', false);
    });
  });
});


