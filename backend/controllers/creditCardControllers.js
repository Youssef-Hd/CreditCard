//importing the bcrypt library so we can use it to hash our sensitive data
const bcrypt = require("bcrypt");
//importing our data base so we can use it in our controllers to perform request to the database
const Pool = require("../database/db");

//getting all credit cards
//used this function for the sake of testing
const getCards = async (req, res) => {
  try {
    const allCards = await Pool.query("SELECT * FROM credit_cards");
    res.json(allCards.rows);
  } catch (err) {
    console.error(err.message);
  }
};

//This controller take the user input, send it, validate it, store everything into database, and return
//a message indicating if everything went well or not to the client
const postCard = async (req, res) => {
  try {
    //defining variables that will carry the user input data
    const { card_number, cvv, card_name_holder, exp_month, exp_year } =
      req.body;
      
    //storing regex format into variables so we can use it to validate the user input to our requirements
    const regexPatternCardNumber = /^\d{16}$/;
    const regexPatternCVV = /^\d{3}$/;
    const regexPatternExpMonth = /^\d{2}$/;
    const regexPatternExpYear = /^\d{2}$/;
    const regexPatternName = /^.{2,}$/;

    //using an if statement we are using the stored regex value to check if the input is valid,
    //example for the card_number it will only accept a 16 digit number
    if (!regexPatternCardNumber.test(card_number)) {
      return res.status(400).json({
        error: "A card number contains 16-digits",
      });
    }
    if (!regexPatternCVV.test(cvv)) {
      return res.status(400).json({
        error: " CVV needs to be 3-digits",
      });
    }

    if (!regexPatternExpMonth.test(exp_month)) {
      return res.status(400).json({
        error: "Expiration month needs to be two digits",
      });
    }

    if (!regexPatternExpYear.test(exp_year)) {
      return res.status(400).json({
        error: "Expiration year needs to be two digits",
      });
    }

    if (!regexPatternName.test(card_name_holder)) {
      return res.status(400).json({
        error: "The card holder name needs to be two charachters",
      });
    }

    //storing our card_number value inside cardNumber variable
    const cardNumber = req.body.card_number;

    //executing our Luhn algorithm on the cardNumber
    const isValid = isLuhnValid(cardNumber);

    function isLuhnValid(input) {
      return (
        input
          .split("")
          .reverse()
          .map(Number)
          .map((digit, index) => (index % 2 === 1 ? digit * 2 : digit))
          .map((digit) => (digit > 9 ? digit - 9 : digit))
          .reduce((sum, digit) => sum + digit, 0) %
          10 ===
        0
      );
    }

    //Using an if statement we are checking if the Luhn validation was successful and throwing an error if it's not
    if (isValid) {
      console.log("Luhn validation succeeded.");
    } else {
      res.status(400).json({ error: "Luhn validation failed." });
    }

    //implementing the bcrypt library to encrypt card number and cvv
    const saltRounds = 10; // specifying the number of salt rounds
    const hashedCVV = await bcrypt.hash(cvv.toString(), saltRounds);
    const hashedCardNumber = await bcrypt.hash(
      card_number.toString(),
      saltRounds
    );

    //proceeding to post our incoming data to the database after encrypting
    const newCard = await Pool.query(
      "INSERT INTO credit_cards (card_number, cvv, card_name_holder, exp_month, exp_year) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [hashedCardNumber, hashedCVV, card_name_holder, exp_month, exp_year]
    );
    res.json(newCard.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

//exporting our controllers so we can use them in routes
module.exports = {
  getCards,
  postCard,
};
