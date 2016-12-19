$(document).ready(function() {
  pageload();

  $('#btn-login').on('click', function (e) {
    e.preventDefault()
    checkuser();
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

function checkuser(){
  var emptype = $('#sel1').val();
// Put the object into storage
  localStorage.setItem('emptype', emptype);
// Retrieve the object from storage
  console.log('Employee Type: ', emptype);
  console.log(window.localStorage.getItem(emptype));

}

lock.on('authenticated', function (authResult) {
  console.log('authResult', authResult);
  localStorage.setItem('idToken', authResult.idToken)
  $('#userselect').hide();
  $('#chooseruser').empty();
  console.log('this runs');
  checktype();
});

function checktype(){
  if (localStorage.emptype === "1"){
    loaddoctor();
  } else if (localStorage.emptype === "2"){
    loadnurse();
  } else {
    console.log("This isn't working");
  }
}

function loaddoctor(){
  console.log("Hello Doctor");
  $('#drform').show();
  $('#btn-logout').show();
}

function loadnurse(){
  console.log("Hello Nurse");
  $('#nurseform').show();
  $('#btn-logout').show();

}

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
