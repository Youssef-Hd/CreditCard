# Versions
Nodejs version 20.5.0
PostgreSQL version 16.0

# Installation steps:
We can use the command ./install.sh to automatically set up the project.
!important If you're not using a linux OS device please make sure to use gitbach for the script to run properly.

# Clone the repository
git clone https://github.com/Youssef-Hd/CreditCard.git

# Change to the project directory
cd CreditCard
cd backend

# Install project dependencies
npm install

# Start the server
nodemon

# Why did I choose Bcrypt library
I used Bcrypt to hash credentials due to its strong security feautures.
Bcrypt is designed to resist brute-force attacks,it also makes handling salt generation easier by automatically generating it.
It's a trusted choice within the community and it's availability in various programming languages makes it easy to implement.

# Why did I choose the approach for Luhn Algorithm
After making my reaserch and checking multiple online resources, I've found different ways to achieve implementing Luhn algorithm(using a library for example).
After consideration I've decided to use a funnction that is purely written with javascript, this approach is reliable and guarentee's me results, it dosent require maintenance and it was fairly easy to implement.
