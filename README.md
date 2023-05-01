# About Blockbase

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

## Home Page - GM

Banner section showcases a brief intro with a CTA button for users who want to view more NFTs. Animation is created by deekaymotion from The Memes by 6529 collection.

![feature-img-banner]

[feature-img-banner]: ./react-app/src/assets/blockbase-preview.png

## Home Page - The Memes by 6529

Landing page section with CTA button that redirects users to a page where they can insert specific collection addresses to view its assets.

![the-memes]

[the-memes]: ./react-app/src/assets/seize-memes-landing.png

## View NFTs from Specific Collection

User can input a specific wallet address they would like to see the NFTs from and view them in a gallery.

![collection-gallery]

[collection-gallery]: ./react-app/src/assets/collection-view.png

## Home Page - Cryptocurrencies

Featured section highlights top cryptocurrencies, introducing users to a diverse range of assets. Users can also choose to explore more assets for a deeper understanding of the cryptocurrency landscape.
![feature-img-featured]

[feature-img-featured]: ./react-app/src/assets/crypto-landing.png

## Explore CryptoCurrencies

Explore section features a comprehensive table showcasing various cryptocurrencies and their key metrics. To prevent rate limiting issues and enhance user experience, pagination is implemented, limiting the number of displayed assets per page.
![feature-img-explore]

[feature-img-explore]: ./react-app/src/assets/blockbase-explore.png

<!-- ## Profile Update

Users have the ability to personalize their profile by updating their profile image, adding a unique bio, and modifying their name as needed. -->

<!-- ![feature-img-7] -->

<!-- [feature-img-7]: ./react-app/src/assets/7-edit-profile.jpg -->

## Future Features

- <input type="checkbox" checked> Mini chart included in the table of all cryptocurrencies
- <input type="checkbox"> Flush out the single cryptocurrency details page
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
