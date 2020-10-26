$(document).ready(() => {

  //公共变量
  $('.vip').tooltip(); //VIP用户提示
  $('.userAvatar').tooltip(); //设置个人头像提示
  
  //修改个人信息
  $('#setUserInfo').click(() => {
    var id = $('#userInfo').find('#setUserInfoId').text(); var realname = $('#userInfo').find('#realname').val();
    var sex = $('#userInfo').find('#sex').val(); var birth = $('#userInfo').find('#birth').val();
    var identity = $('#userInfo').find('#identity').val(); var native_place = $('#userInfo').find('#native_place').val();
    var phone = $('#userInfo').find('#phone').val(); var email = $('#userInfo').find('#email').val();
    if(id, realname, sex, birth, identity, native_place, phone, email) {
      $.ajax({
        url: '/api/setUserInfo', type: 'post',
        dataType: 'json', timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: {
          id: id, realname: realname, sex: sex, birth: birth,
          identity: identity, native_place: native_place, phone: phone, email: email
        },
        success: function(response) {
          if(response.result.code == 20000) { alert('修改个人信息成功！'); window.location.reload();
          }else{ alert('未知错误，修改个人信息失败！'); }
        },
        error: function(error) { console.log(error); alert('未知错误，修改个人信息失败！'); }
      })
    }else{ alert('请填写完整个人信息！'); }
  });

  //VIP用户高亮
  if($('.vip').attr('data-target') == 1) { $('.vip').addClass('badge-warning'); $('.vip').attr('data-original-title', 'VIP用户'); }
  
  //VIP简历高亮
  $('.teamplate-type').each(function() { if($(this).text() == 'VIP') { $(this).css('background-color', '#dc3545'); } })

  //判断有无简历
  if($('.resume-list-group').attr('data-target') == '') { $('.resume-list-group').append('<h3 class="text-secondary text-center p-5">暂无简历，快去新建一份简历吧 (๑╹◡╹)ﾉ"""</h3>'); }

  //修改密码
  $('#accountSettings').find('#modifyPassword').click(() => {
    var nowPassword = $('#nowPassword').val();
    var newPassword = $('#newPassword').val();
    if(nowPassword && newPassword) {
      var confirmReset = window.confirm('确定修改密码吗？');
      if(confirmReset) {
        $.ajax({
          url: '/api/modifyPassword', type: 'post',
          dataType: 'json', timeout: 5000,
          headers: { 'x-csrf-token': $.cookie('csrfToken') },
          data: { nowPassword: nowPassword, newPassword: newPassword },
          success: function(response) {
            if(response.result.code == 20000) { alert('修改密码成功！'); window.location.reload(); }else{ alert('修改密码失败！'); }
          },
          error: function(error) { alert('修改密码失败！'); console.log(error); }
        })
      }
    }else{ alert('请填写完整信息！'); }
  })

  //设置密保
  $('#accountSettings').find('#setSecurity').click(() => {
    var securityQuestion = $('#securityQuestion').val();
    var securityAnswer = $('#securityAnswer').val();
    if(securityQuestion && securityAnswer) {
      var confirmset = window.confirm('确定设置密保吗？');
      if(confirmset) {
        $.ajax({
          url: '/api/setSecurity', type: 'post',
          dataType: 'json', timeout: 5000,
          headers: { 'x-csrf-token': $.cookie('csrfToken') },
          data: { securityQuestion: securityQuestion, securityAnswer: securityAnswer },
          success: function(response) {
            if(response.result.code == 20000) { alert('设置密保成功！'); window.location.reload(); }else{ alert('设置密保失败！'); }
          },
          error: function(error) { alert('设置密保失败！'); console.log(error); }
        })
      }
    }else{
      alert('请填写完整信息！');
    }
  })

})