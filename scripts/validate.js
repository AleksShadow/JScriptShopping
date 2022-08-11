//validate module
function validate(events){
    events.preventDefault();
    var valid=true;

    //display warning if First name is not entered
    if ((orderForm.clientFname.value).length < 1 ){
    document.querySelector('#fNameError').innerText="Last name is required";
        valid = false;
    }

    //display warning if Last name is not entered
    if ((orderForm.clientLname.value).length < 1 ){
    document.querySelector('#lNameError').innerText="Last name is required";
        valid = false;
    }

    //display warning if Phone number is not entered
    if (orderForm.phoneNumber.value == "") {
        document.querySelector('#phoneNumberError').innerText="Phone number is required";
        valid=false;
    } else {
        if (isNaN(orderForm.phoneNumber.value)) {
          document.querySelector('#phoneNumberError').innerText="Use numbers only";
          valid=false;
    } else {
        if ((orderForm.phoneNumber.value).length < 6) {
          document.querySelector('#phoneNumberError').innerText="Min 6 digits";
          valid = false;
        }
      }
  }

    //display warning if email is not entered
    if (orderForm.clientEmail.value == ""){
        document.querySelector('#clientEmailError').innerText="Email is required";
        valid=false;
    }

    //display warning if City is not entered
    if (orderForm.cities.value == ""){
        document.querySelector('#cityError').innerText="City is required";
        valid=false;
}

    //display warning if Province is not selected
    if (orderForm.province.options.selectedIndex === 0){
      valid = false;
      document.querySelector('#provinceError').innerText="...Please select the Province...";
}

    //display warning if Address is not selected
    if (orderForm.address1.value == ""){
      document.querySelector('#address1Error').innerText="Adress is required";
      valid = false;
}

    //display warning if Delivery is not selected
  if(document.querySelector('input[name="delivery"]:checked') == null) {
      document.querySelector('#deliveryError').innerText="The field is requared";
      valid = false;
}

  //display warning if date less or equal than current day
  if (orderForm.deliveryDate.value == '') {
    document.querySelector('#deliveryDateError').innerText="Date is requared";
      valid = false;
}

  //display warning if comments is too short or long
  if ((orderForm.comment.value).length <= 2 && (orderForm.comment.value).length !==0 || (orderForm.comment.value).length > 500){
  document.querySelector('#commentError').innerText="Too short or long";
      valid = false;
}

  if(valid && orderTotal != 0){
      document.querySelector("#submitButton").disabled = true;
      customerOutput(); // output validated customer information
      orderOutput(); // output current order
}
  return valid;
};
