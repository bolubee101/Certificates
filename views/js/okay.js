let form = document.getElementById("email-input");

let main = () => {
  var data = {};
  for (var i = 0, ii = form.length; i < ii; ++i) {
    var input = form[i];
    if (input.name) {
      data[input.name] = input.value;
    }
  }
  let email = data["email"]
  if (email == "") {
    alert("Input a valid email address")
  } else {
    //document.write(name);
    if (ValidateEmail(email)) {
      console.log(email)
      location.href = `/EmailCheck/?email=${email}`
    }
  }
};

function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  }
  alert("You have entered an invalid email address!")
  return (false)
}
