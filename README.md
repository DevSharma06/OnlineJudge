
# Online Judge

An Online Judge is a virtual arena that allows coders to submit solutions to a variety of programming problems, receiving instant feedback on the online judge accuracy and efficiency of their code. Whether you're a seasoned veteran or just starting out, the diverse range of problems available, from simple to complex, and in multiple programming languages, provides endless opportunities for growth and development.




## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
## Screenshots

![Login Page](https://i.imgur.com/yVnbXuQ.png)

![Home Page](https://i.imgur.com/Tcp6ww9.png)

![Description](https://i.imgur.com/8GaSicy.png)


## Features

- Allow users to create accounts and log in securely.
- Implement user roles such as User, Mod and Admin
- Display problem statements, input/output formats, constraints, and example test cases.
- Allow users to submit their code solutions in various programming languages.
- Validate code submissions for syntax errors.
- Evaluate submitted code against multiple test cases.
- Compile and execute submitted code using isolated environments.


## Technologies Used

- MongoDB: 7.1.0
- Express.js: 4.18.2
- React: 18.2.0
- Node.js: 20.5.0
## Installation

- Clone this repository to your local machine.
- Navigate to the project directory.
- Install backend dependencies.

    ```
    cd server
    npm install
    ```
- Install frontend dependencies.

    ```
    cd ../frontend
    npm install
    ```
- Configure environment variables.
    - Create a `.env` file in the `server` directory.
    - Add necessary environment variables (e.g., database URI, JWT secret).
- Start the server
    ```
    cd ../backend
    npm run dev
- Start the client.
    ```
    cd ../frontend
    npm start
- Open your browser and go to `http://localhost:3000` to use the app.
## Usage

- Register or log in to your account.
- Users can view the problems and check out the description of the problem by clicking on Solve and submit the solution of the problem in C/C++/Java/Python.
- Users with the role Admin/Mod have additional functions such as adding problems and test cases.
- When a problem is submitted, the result shows the number of test cases passed.


## Contributing

We welcome contributions from the community! To contribute to Online Judge, follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them.
- Push your changes to your fork.
- Create a pull request to the `main` branch of the main repository.


## License

This project is under the [MIT License](https://github.com/DevSharma06/OnlineJudge/blob/master/LICENSE.md)

