# Backend for Quiz app

# API Endpoints:

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

| endpoint     | request  | description       | protected | postman |         body          |
| ------------ | -------- | ----------------- | :-------: | :-----: | :-------------------: |
| /answers/:id | `UPDATE` | updates an answer |    ❌     |   ✅    | `answer`, `isCorrect` |
| /answers/:id | `DELETE` | deletes an answer |    ❌     |   ✅    |           -           |
