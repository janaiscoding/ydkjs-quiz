# Backend for Quiz app

# API Endpoints:

## Auth

| endpoint     | method | description        | protected | postman |           body            |
| ------------ | ------ | ------------------ | :-------: | :-----: | :-----------------------: |
| /auth/signup | `POST` | create new user    |    ❌     |   ✅    | `name` `email` `password` |
| /auth/login  | `POST` | sign in to account |    ❌     |   ✅    |    `email` `password`     |
| /auth/verify | `POST` | verify jwt token   |    ❌     |   ✅    |          `token`          |

## User

| endpoint   | method | description            | protected | postman |                               body                               |
| ---------- | ------ | ---------------------- | :-------: | :-----: | :--------------------------------------------------------------: |
| /users/:id | `GET`  | get a user profile     |    ❌     |   ✅    |                                -                                 |
| /users/:id | `POST` | add a new quiz history |    ❌     |   ✅    | `quiz_id`, `correctQuestions`, `incorrectQuestions`, `bestScore` |
| /users/:id | `PUT`  | update a history entry |    ❌     |   ✅    | `quiz_id`, `correctQuestions`, `incorrectQuestions`, `bestScore` |

## Quizzes

| endpoint     | method | description                  | protected | postman |  body   |
| ------------ | ------ | ---------------------------- | :-------: | :-----: | :-----: |
| /quizzes     | `GET`  | get all quizzes              |    ❌     |   ✅    |    -    |
| /quizzes     | `POST` | create a new, empty quiz     |    ❌     |   ✅    | `title` |
| /quizzes/:id | `GET`  | get a specific quiz          |    ❌     |   ✅    |    -    |
| /quizzes/:id | `POST` | create a new, empty question |    ❌     |   ✅    | `title` |

## Questions

| endpoint       | method | description                    | protected | postman |         body          |
| -------------- | ------ | ------------------------------ | :-------: | :-----: | :-------------------: |
| /questions/:id | `GET`  | gets one question with answers |    ❌     |   ✅    |           -           |
| /questions/:id | `POST` | creates a new answer           |    ❌     |   ✅    | `answer`, `isCorrect` |

## Answers

| endpoint     | method   | description       | protected | postman | body |
| ------------ | -------- | ----------------- | :-------: | :-----: | :--: |
| /answers/:id | `DELETE` | deletes an answer |    ❌     |   ✅    |  -   |

## Scores

| endpoint         | method | description                | protected | postman | body |
| ---------------- | ------ | -------------------------- | :-------: | :-----: | :--: |
| /scores          | `GET`  | gets all scores            |    ❌     |   ✅    |  -   |
| /scores/quiz/:id | `GET`  | gets all scores for a quiz |    ❌     |   ✅    |  -   |
| /scores/user/:id | `GET`  | gets all scores for a user |    ❌     |   ✅    |  -   |

## To Do list

- [ ] update quiz title
- [ ] update question title
- [ ] update answer
- [ ] delete quiz
- [ ] delete question
- [ ] user auth login/signup/verify
- [ ] protect routes for create/update/delete
