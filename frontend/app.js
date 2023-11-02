
document.getElementById("submitForm").addEventListener("click", function () {
  const cardNumber = document.getElementById("cardNumber").value;
  const cvv = document.getElementById("cvv").value;
  const cardNameHolder = document.getElementById("cardNameHolder").value;
  const expMonth = document.getElementById("expMonth").value;
  const expYear = document.getElementById("expYear").value;


  //making our ajax call using the postCard controller
  const data = {
    card_number: cardNumber,
    cvv: cvv,
    card_name_holder: cardNameHolder,
    exp_month: expMonth,
    exp_year: expYear,
  };

  fetch("http://localhost:5000/api/postCard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      //handling the response from the server
      const messageContainer = document.getElementById("myPopup");

      if (data.error) {
        // Displaying error message
        messageContainer.innerHTML = `<div class="myStyledElement error"><h2>${data.error}</h2></div>`;
      } else {
        // Displaying success message
        messageContainer.innerHTML = `<div class="myStyledElement success"><h2>Card data saved successfully!</h2></div>`;
      }
      //making sure the div appears
      messageContainer.style.display = "block";

      //removing the div using a setTimeout function
      setTimeout(function () {
        messageContainer.style.display = "none";
      }, 2000); 

    });
});
