# About Tales

Blockbase is a web application inspired by Coinbase & CoinGecko. It is a personal project to learn more about how to use available resources surrounding cryptocurrencies and NFTs.
[Click here to visit Blockbase's live site](https://blockbase.onrender.com/).

<br>

# Tech Stack

Backend:

[![Python][python.js]][python-url]
[![Flask][flask.js]][flask-url]
[![PostgreSQL][postgresql.js]][postgresql-url]

Frontend:

[![HTML][html.js]][html-url]
[![CSS][css.js]][css-url]
[![Javascript][javascript.js]][javascript-url]
[![React][react.js]][react-url]
[![Redux][redux.js]][redux-url]

<br>

# Feature Examples

<!-- All users have access to view the entire website. There is a sign up option for users to create an account and personalzie their PFP. -->

## Home Page - NFTs

The hero features a set of The Memes by 6529 and redirects users to view a table of available NFTs.

## Home Page - Cryptocurrencies

A featured section highlights some of the top cryptocurrencies to familiarize users with available assets, and there is an option to view more assets.
<!-- ![feature-img-1] -->

<!-- [feature-img-1]: ./react-app/src/assets/1-signup.jpg -->

## Profile Update

Users can update their profile with a new image, bio, and name changes.
<!-- ![feature-img-7] -->

<!-- [feature-img-7]: ./react-app/src/assets/7-edit-profile.jpg -->

## Future Features

- <input type="checkbox"> Mini chart included in the table of all cryptocurrencies
- <input type="checkbox"> Search bar with autocomplete functionality to view assets
- <input type="checkbox"> Wallet integration for wallet connect
- <input type="checkbox"> Portfolio estimator via wallet connect OR inputting in a wallet address

<br>

# Get Started

To run this project locally, please perform the following steps:

1. Clone the repository
   ```sh
   git clone https://github.com/truham/blockbase
   ```
2. Install dependencies at the root directory
   ```sh
   pipenv install -r requirements.txt
   ```
3. Create a **.env** file based on the example with proper settings for your development environment

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory. Install the npm packages while inside of the `react-app` directory.

   ```bash
   npm install
   ```

6. Run the backend server at the root directory with pipenv run flask run
   ```bash
   pipenv run flask run
   ```
7. Run the frontend server inside the `react-app` with npm start
   ```bash
   npm start
   ```

<br>

# Contact

Email: [hamiltontruong@gmail.com](mailto:hamiltontruong@gmail.com)

Portfolio: [https://truham.github.io/](https://truham.github.io/)

LinkedIn: [https://www.linkedin.com/in/hamiltontruong/](https://www.linkedin.com/in/hamiltontruong/)

<!-- References and Icons -->

[html.js]: https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[css.js]: https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white
[css-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[javascript.js]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[javascript-url]: https://www.javascript.com/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[redux.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux.js.org/
[python.js]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[python-url]: https://www.python.org/
[flask.js]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[flask-url]: https://expressjs.com/
[postgresql.js]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
