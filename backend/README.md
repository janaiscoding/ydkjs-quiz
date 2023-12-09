# Backend for Quiz app

will handle auth
will handle user
will handle quiz + questions + answers

### API Endpoints:

| API endpoints | Request | Description              | Protected | Postman tested | Body Content |
| ------------- | ------- | ------------------------ | --------- | -------------- | ------------ |
| /quizzes      | GET     | Fetch all quizzes        | ❌        | ✅             | -            |
| /quizzes      | POST    | Creates a new empty quiz | ❌        | ✅             | title        |
| /quizzes/:id  | GET     | Fetch one quiz           | ❌        | ✅             | title        |
