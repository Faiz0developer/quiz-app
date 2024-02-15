# About Project
Backend of Quiz App using Express and typescript. MongoDB is used to store, fetch, update and delete the data. Learn how to create REST APIs like for register user,login user, create quiz, get quiz, publish quiz, report API and so on.

# Tech used
![Static Badge](https://img.shields.io/badge/Javascript-%23881337?logo=javascript)
![Static Badge](https://img.shields.io/badge/typescript-%230C4A6E?logo=typescript)
![Static Badge](https://img.shields.io/badge/mongodb-%2378350F?logo=mongodb)
![Static Badge](https://img.shields.io/badge/nodejs-%23701A75)
![Static Badge](https://img.shields.io/badge/express-%23365314)

# Pre-requisite

To follow this project, following are the pre-requisite

NodeJS

VS code

git

postman

# Installation
The following commands install and run the development version

``` 
git clone 'link-of-my-repo '

cd Projects

cd QuizManager

npm install

npm start:dev

```
# Run Server

Now on postman hit the following http

**For Create User**

*localhost:3000/auth/ - for register the user*

*localhost:3000/auth/login - for login the user*

*localhost:3000/user/:userId - to get the user*

*localhost:3000/user/ - for upate the user*

**For Create Quiz**

*localhost:3000/quiz/ - for create a quiz*

*localhost:3000/quiz/quizId? - to get a quiz*

*localhost:3000/quiz/quizId - for delete a quiz*

*localhost:3000/quiz/publish - for publish a quiz*

**For Exam**

*localhost:3000/exam/quizId - for get a quiz and start exam*

*localhost:3000/exam/ - for submit the exam*

**For Report

*localhost:3000/report/reportId? - to get the report*







