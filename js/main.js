$(document).ready(function() {
  pageload();
  loadMessages();
  $('#childsinneed').on('click', showChildsInNeed);
  $('#profileinfo').on('click', loadProfile);
  $('#btn-logout').on('click', logout);
  $('#contactprovider').on('click', loadProvider);
  $('#btn-login').on('click', function (e) {
    e.preventDefault();
    checkuser();
    lock.show();
  });
  $('#drform').on('submit', function (e) {
    e.preventDefault();
    doctorsubmit();
  });
  $('#nurseform').on('submit', function (e) {
    e.preventDefault();
    nursesubmit();
  });
  $('#providerform').on('submit', function (e) {
    e.preventDefault();
    patientsubmit();
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
  $('#drform, #nurseform, #btn-logout, #chatbox, #navigationbuttons, #providerform').hide();
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
  localStorage.setItem('idToken', authResult.idToken);
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
    $('#drform, #chatbox, #providerform').hide();
  } else {
    console.log("This isn't working");
  }
}


function showChildsInNeed(){
  console.log("Showing da childrens in need");
  // console.log("Hello Nurse");
  // $('#navigationbuttons').show();
  $('#drform, #nurseform, #providerform').hide();
  $('#chatbox').show();
}

function loadProvider(){
  $('#drform, #nurseform, #chatbox').hide();
  $('#providerform').show();
}

function loadnurse(){
  $('#navigationbuttons').show();
}

function loaddoctor(){
    $('#navigationbuttons').show();
    $('#contactprovider').hide();
  }

function isLoggedIn() {
  if (localStorage.getItem('idToken')) {
    return true;
  } else {
    return false;
  }
}

function logout() {
  localStorage.removeItem('idToken');
  window.location.href = '/';
}

function doctorsubmit(){
  var docname = $('#drname').val();
  var doctitle = $('#drtitle').val();
  var docphone = $('#drphone').val();
  var docemail = $('#dremail').val();
  var docspecialty = $('#drspecialty').val();
  var url = 'http://localhost:3000/care4kids/doctors/';
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
    li.toggleClass('done');
  });
}

function nursesubmit(){
  var nursename = $('#nuname').val();
  var nursephone = $('#nuphone').val();
  var nurseemail = $('#nuemail').val();
  var schoolname = $('#nuschoolname').val();
  var schoolphone = $('#nuschoolphone').val();
  var url = 'http://localhost:3000/care4kids/faculty/';
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
  });
}

function patientsubmit(){
  var studentname = $('#stuname').val();
  var studentdob = $('#studob').val();
  var studentgender = $('#stugender').val();
  var studentall = $('#stuall').val();
  var studentsymp= $('#stusymp').val();
  var studentcon = $('#stucon').val();
  var url = 'http://localhost:3000/care4kids/patientrequest/';
  $.ajax({
    url: url,
    method: 'POST',
    data: {
      studentName: studentname,
      studentDob: studentdob,
      studentGender: studentgender,
      allergies: studentall,
      symptoms: studentsymp,
      contact: studentcon,
      completed: false
    },
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('idToken')
    }
  }).done(function () {
    console.log("PUT to the DB");
  });
}

function loadMessages() {
  $.ajax({
    url: 'http://localhost:3000/care4kids/patientrequest/',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('idToken')
    }
  }).done(function (data) {
    data.forEach(function (datum) {
      console.log(datum);
      insertMessages(datum);
    });
  });
}

function insertMessages(message) {
  if (message.completed ===false) {
    console.log("This is not done");
    var handdone = '../images/statusattention.png';
    completedMessages(message, handdone);
  } else {
    var handdone = '../images/statuscompleted.png';
    completedMessages(message, handdone);
  }
}

function completedMessages(message,handdone){
  var li = '<div id="posties">'+
              '<div class=row>'+
                '<div class="col-xs-4">' + "Name: "+ message.studentName + '</div>'+
                '<div class="col-xs-2">' + "DOB: "+ message.studentDob + '</div>'+
                '<div class="col-xs-2">' + "Gender: " + message.studentGender + '</div>'+
                '<div class="col-xs-4">' + "Contact: "+ message.contact + '</div>'+
              '</div>'+
              '<div class=row id="lowerform">'+
                '<div class="col-xs-1" id="togglecomplete">'+ '<img src="'+ handdone +'" height="250" id="statusimages" alt="" />' +'</div>'+
                '<div class="col-xs-3">' + "Allergies: "+ message.allergies + '</div>'+
                '<div class="col-xs-8">' + "Symptoms: "+ message.symptoms + '</div>'+
              '</div>'+
            '</div>';
  $('#chat').append(li);
}
