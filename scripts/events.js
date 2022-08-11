//form element events

//remove warning if first name not empty
document.querySelector('#clientFname').addEventListener("blur", function(){
    if((this.value).length > 0){
      console.log((this.value).length, fNameError.innerText);
        fNameError.innerText = "";
    }
});

//remove warning if last name not empty
document.querySelector('#clientLname').addEventListener("blur", function(){
    if((this.value).length > 0){
      console.log((this.value).length);
        lNameError.innerText = "";
    }
});

//remove error if Phone number not empty
document.querySelector('#phoneNumber').addEventListener("blur", function(){
    if(this.value !== ""){
        phoneNumberError.innerText = "";
    }
});

//remove error if Email not empty
document.querySelector('#clientEmail').addEventListener("blur", function(){
    if(this.value !== ""){
        clientEmailError.innerText = "";
    }
});

//remove warning if Province is selected
document.querySelector('#province').addEventListener("click", function(){
      if(orderForm.province.options.selectedIndex !== 0){
          provinceError.innerText = "";
    }
});

//remove warning if city is selected
document.querySelector('#cities').addEventListener("blur", function(){
    if(this.value !== ""){
        cityError.innerText = "";
    }
});

//remove error if Address not empty
document.querySelector('#address1').addEventListener("blur", function(){
    if(this.value !== ""){
        address1Error.innerText = "";
    }
});

//remove error if Delivery not empty
var allButtons = document.querySelectorAll("input[type=radio]");
for (input of allButtons) {
    input.addEventListener ("click", function(){
        if(this.checked) {
            deliveryError.innerText = "";
    }
  }
)
};

//remove warning if date is proper
document.querySelector('#deliveryDate').addEventListener("blur", function(){
  if(this.value !== '') {
      deliveryDateError.innerText = "";
    }
});

//remove warning if comment is not too short or long
document.querySelector('#comment').addEventListener("blur", function(){
    if((this.value).length > 2 && (this.value).length <= 500) {
        commentError.innerText = "";
    }
});

// Add an event to reset all alarm messages
document.orderForm.addEventListener('reset', function(){
  alertMsgs = document.orderForm.querySelectorAll('.alert');
  for (let i of alertMsgs) {
    if (i.innerText !== '') {
      i.innerText = '';
    }
    document.querySelector("#submitButton").disabled = false;
    removeForms();
  }
}
);

// Add an event to the form on submit to validate input
document.orderForm.addEventListener("submit", validate);
