const okay = ["Thank you for being an amazing member",
"Please fill in the name you want to appear on your certificate.",
'Enter your name',
"Download",
'verify(well)'
]

const well = ["Oops! You're not a member",
"Kindly register to be part of the family",
'none',
'Register',
'verify(email)'
]

const email = ["Email Verification",
"Hi there! Kindly enter your email adress to get verified",
'Enter your Email',
'Verify',
'verify(well)'
]

function verify(okay)
{
    var dsc = document.getElementById('first-text');
    dsc.innerHTML = okay[0];
    
    var dsc = document.getElementById('second-text');
    dsc.innerHTML = okay[1];

    var dsc = document.getElementById('input-text');
    dsc.setAttribute('placeholder', okay[2]);
    dsc.setAttribute('type', )
    var dsc = document.getElementById('button-id');
    dsc.innerHTML = okay[3];
    dsc.setAttribute('onclick',okay[4]);
}
     
    
function ifClicked(){
    let email = document.getElementById('input-text').value;

    let endpoint = "http://localhost:3000/EmailCheck?email=" email;

    if( !email ){
     document.getElementById('warn').innerHTML = "Please provide a first and last name"
    }else{
     var http = new XMLHttpRequest();
       http.onreadystatechange = function () {
             if (this.readyState === 4 && this.status === 200) {
                 document.getElementById('output').innerText = this.responseText
          }
       };
       http.open("GET", endpoint, false);
       http.send();
    }
 }