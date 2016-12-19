$(document).ready(function() {
  pageload();
  $('#btn-login').on('click', function (e) {
    e.preventDefault()
    lock.show()
  })

  $('#btn-logout').on('click', function (e) {
    e.preventDefault()
    logout()
  })
});

var lock = new Auth0Lock(
    'kCWx6N5YOzpdWxqzWVTjNmrf8EQ85qVA',
    'thegoblinking.auth0.com',
    {
      auth: {
        params: {
          scope: 'openid email'
        }
      }
    }
  );





function pageload(){
  $('#drform, #nurseform, #btn-logout').hide();
}

lock.on('authenticated', function (authResult) {
  console.log('authResult', authResult);
  localStorage.setItem('idToken', authResult.idToken)
  showProfile();
  $('#drform, #nurseform').show();
  $('#userselect').hide();


})



function isLoggedIn() {
  if (localStorage.getItem('idToken')) {
    return true;
  } else {
    return false;
  }
}

function logout() {
  localStorage.removeItem('idToken')
  window.location.href = '/';
}

function showProfile(){
  console.log('hello');
  $('#btn-login').hide()
  $('#user-info').show()
  lock.getProfile(localStorage.getItem('idToken'), function(error, profile){
    if(error){
      logout()
    } else {
      console.log('Hello Profile', profile);
      $('#avatar').text(profile.name)
      $('#profilepicture').attr('src', profile.picture)
  //    $('#avatar').
    }
  })
}
