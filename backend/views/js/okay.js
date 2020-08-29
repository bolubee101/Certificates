let form = document.getElementById("email-input");

let main = () => {
  var data = {};
  for (var i = 0, ii = form.length; i < ii; ++i) {
    var input = form[i];
    if (input.name) {
      data[input.name] = input.value;
    }
  }
  let email=data["email"]
  //document.write(name);
if(email==""){
alert("input an email address");
}else{
  console.log(email)
  location.href=`https://fierce-bastion-56296.herokuapp.com/EmailCheck/?email=${email}`
}
};
