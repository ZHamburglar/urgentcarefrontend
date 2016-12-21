$(document).ready(function() {
  pageload();
  $('#childsinneed').on('click', showChildsInNeed)
  $('#profileinfo').on('click', loadProfile)
  $('#btn-logout').on('click', logout)


  $('#btn-login').on('click', function (e) {
    e.preventDefault()
    checkuser();
    lock.show()
  });


  $('#drform').on('submit', function (e) {
    e.preventDefault()
    doctorsubmit();
  });
  $('#nurseform').on('submit', function (e) {
    e.preventDefault()
    nursesubmit();
  });


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
  $('#drform, #nurseform, #btn-logout, #chatbox, #navigationbuttons').hide();
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
  $('#btn-logout').show();

  // $('#chatbox').show();
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



function loadProfile(){
  // console.log("Hello Nurse");
  // $('#navigationbuttons').show();
  if (localStorage.emptype === "1"){
    $('#drform').show();
    $('#nurseform, #chatbox').hide();
  } else if (localStorage.emptype === "2"){
    $('#nurseform').show();
    $('#drform, #chatbox').hide();
  } else {
    console.log("This isn't working");
  }
}


function showChildsInNeed(){
  console.log("Showing da childrens in need");
  // console.log("Hello Nurse");
  // $('#navigationbuttons').show();
  $('#drform, #nurseform, #chatbox').hide();

  $('#chatbox').show();
}



function loadnurse(){
  console.log("Hello Nurse");
  //$('#nurseform').show();
  //$('#btn-logout').show();
  $('#navigationbuttons').show();
}

function loaddoctor(){
    console.log("Hello Doctor");
    $('#navigationbuttons').show();
    // $('#drform').show();
    // $('#btn-logout').show();
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

function doctorsubmit(){
  var docname = $('#drname').val();
  var doctitle = $('#drtitle').val();
  var docphone = $('#drphone').val();
  var docemail = $('#dremail').val();
  var docspecialty = $('#drspecialty').val();
  var url = 'http://localhost:3000/care4kids/doctors/'
  $.ajax({
    url: url,
    method: 'POST',
    data: {
      fullName: docname,
      title: doctitle,
      phone: docphone,
      email: docemail,
      specialty: docspecialty
    },
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('idToken')
    }
  }).done(function () {
    li.toggleClass('done')
  })
}

function nursesubmit(){
  var nursename = $('#nuname').val();
  var nursephone = $('#nuphone').val();
  var nurseemail = $('#nuemail').val();
  var schoolname = $('#nuschoolname').val();
  var schoolphone = $('#nuschoolphone').val();
  var url = 'http://localhost:3000/care4kids/faculty/'
  $.ajax({
    url: url,
    method: 'POST',
    data: {
      fullName: nursename,
      phone: nursephone,
      email: nurseemail,
      schoolName: schoolname,
      schoolPhone: schoolphone
    },
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('idToken')
    }
  }).done(function () {
    console.log("PUT to the DB");
  })
}
