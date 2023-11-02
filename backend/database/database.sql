
CREATE TABLE credit_cards (
  id SERIAL PRIMARY KEY,
  card_number VARCHAR(255),
  cvv VARCHAR(255),
  card_name_holder VARCHAR(255),
  exp_month VARCHAR(255),
  exp_year VARCHAR(255),
)
