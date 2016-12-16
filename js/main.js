
var lock = new Auth0Lock('kCWx6N5YOzpdWxqzWVTjNmrf8EQ85qVA', 'thegoblinking.auth0.com', {
    auth: {
      params: {
        scope: 'openid email'
      }
    }
  });

lock.on('authenticated', function (authResult) {
  console.log('authResult', authResult);
  localStorage.setItem('idToken', authResult.idToken)
  showProfile()
})

$(document).ready(function() {
  $('#btn-login').on('click', function (e) {
    e.preventDefault()
    lock.show()
  })

  $('#btn-logout').on('click', function (e) {
    e.preventDefault()
    logout()
  })


});







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
