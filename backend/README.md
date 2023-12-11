# Backend for Quiz app

# API Endpoints:

## Auth

| endpoint     | request | description        | protected | postman |           body            |
| ------------ | ------- | ------------------ | :-------: | :-----: | :-----------------------: |
| /auth/signup | `POST`  | create new user    |    ❌     |   ✅    | `name` `email` `password` |
| /auth/login  | `POST`  | sign in to account |    ❌     |   ✅    |    `email` `password`     |
| /auth/verify | `POST`  | verify jwt token   |    ❌     |   ✅    |          `token`          |

## Quizzes

| endpoint     | request | description                  | protected | postman |  body   |
| ------------ | ------- | ---------------------------- | :-------: | :-----: | :-----: |
| /quizzes     | `GET`   | get all quizzes              |    ❌     |   ✅    |    -    |
| /quizzes     | `POST`  | create a new, empty quiz     |    ❌     |   ✅    | `title` |
| /quizzes/:id | `GET`   | get a specific quiz          |    ❌     |   ✅    |    -    |
| /quizzes/:id | `POST`  | create a new, empty question |    ❌     |   ✅    | `title` |

## Questions

| endpoint       | request | description                    | protected | postman |         body          |
| -------------- | ------- | ------------------------------ | :-------: | :-----: | :-------------------: |
| /questions/:id | `GET`   | gets one question with answers |    ❌     |   ✅    |           -           |
| /questions/:id | `POST`  | creates a new answer           |    ❌     |   ✅    | `answer`, `isCorrect` |

## Answers

| endpoint     | request  | description       | protected | postman | body |
| ------------ | -------- | ----------------- | :-------: | :-----: | :--: |
| /answers/:id | `DELETE` | deletes an answer |    ❌     |   ✅    |  -   |

## To Do list

- [ ] update quiz title
- [ ] update question title
- [ ] update answer
- [ ] delete quiz
- [ ] delete question
- [ ] user auth login/signup/verify
- [ ] protect routes for create/update/delete
