# Backend for Quiz app

# API Endpoints:

## Auth

| endpoint     | method | description        | protected | postman |           body            |
| ------------ | ------ | ------------------ | :-------: | :-----: | :-----------------------: |
| /auth/signup | `POST` | create new user    |    ❌     |   ✅    | `name` `email` `password` |
| /auth/login  | `POST` | sign in to account |    ❌     |   ✅    |    `email` `password`     |
| /auth/verify | `POST` | verify jwt token   |    ❌     |   ✅    |          `token`          |

## User

| endpoint   | method | description                          | protected | postman |         body         |
| ---------- | ------ | ------------------------------------ | :-------: | :-----: | :------------------: |
| /users/:id | `GET`  | get a user profile, see user history |    ❌     |   ✅    |          -           |
| /users/:id | `POST` | add a new quiz history               |    ✅     |   ✅    |  `quiz_id` `score`   |
| /users/:id | `PUT`  | update a quiz history entry          |    ✅     |   ✅    | `quiz_id` `newScore` |

## Quizzes

| endpoint     | method   | description                                                       | protected | postman |  body   |
| ------------ | -------- | ----------------------------------------------------------------- | :-------: | :-----: | :-----: |
| /quizzes     | `GET`    | get all quizzes                                                   |    ❌     |   ✅    |    -    |
| /quizzes     | `POST`   | create a new, empty quiz                                          |    ✅     |   ✅    | `title` |
| /quizzes/:id | `GET`    | get a specific quiz, with questions and answers                   |    ❌     |   ✅    |    -    |
| /quizzes/:id | `POST`   | create a new, empty question                                      |    ✅     |   ✅    | `title` |
| /quizzes/:id | `PUT`    | update a quiz title                                               |    ✅     |   ✅    | `title` |
| /quizzes/:id | `DELETE` | delete a specific quiz, won't delete questions and linked answers |    ✅     |   ✅    |    -    |

## Questions

| endpoint            | method   | description                                                      | protected | postman |         body          |
| ------------------- | -------- | ---------------------------------------------------------------- | :-------: | :-----: | :-------------------: |
| /questions          | `GET`    | gets all questions                                               |    ❌     |   ✅    |           -           |
| /questions/:id      | `GET`    | gets one question with answers                                   |    ❌     |   ✅    |           -           |
| /questions/:id      | `POST`   | creates a new answer                                             |    ✅     |   ✅    | `answer`, `isCorrect` |
| /questions/:id      | `PUT`    | updates a question's title                                       |    ✅     |   ✅    |        `title`        |
| /questions/:id      | `DELETE` | deletes question, updates parent quiz, clears child answers      |    ✅     |   ✅    |           -           |
| /questions/:id/quiz | `PUT`    | updates a question's parent quiz, moves from one quiz to another |    ✅     |   ✅    |     `parent_quiz`     |

## Answers

| endpoint     | method   | description                                | protected | postman |         body         |
| ------------ | -------- | ------------------------------------------ | :-------: | :-----: | :------------------: |
| /answers     | `GET`    | gets all answers                           |    ❌     |   ✅    |          -           |
| /answers/:id | `PUT`    | updates an answer                          |    ✅     |   ✅    | `answer` `isCorrect` |
| /answers/:id | `DELETE` | deletes an answer. updates parent question |    ✅     |   ✅    |          -           |

## Scores

| endpoint         | method | description                | protected | postman |            body             |
| ---------------- | ------ | -------------------------- | :-------: | :-----: | :-------------------------: |
| /scores          | `GET`  | gets all scores            |    ❌     |   ✅    |              -              |
| /scores          | `POST` | creates a new scores       |    ✅     |   ✅    | `user_id` `quiz_id` `score` |
| /scores/quiz/:id | `GET`  | gets all scores for a quiz |    ❌     |   ✅    |              -              |
| /scores/user/:id | `GET`  | gets all scores for a user |    ❌     |   ✅    |              -              |

## To Do list

- [x] update quiz title
- [x] update question title
- [x] update answer
- [x] delete quiz
- [x] delete question
- [x] user auth login/signup/verify
- [x] protect routes for create/update/delete
