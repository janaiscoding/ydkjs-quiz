const formatToMarkdown = (string: string) => {
  // Whenever we need to display our code to the frontend, it needs to be shown as markdown
  // That way we can use syntax highlighters and also be able to edit text in the textareas
  // Used after fetches, in conjuction with MarkdownWrapper, used in textareas defaultValue
  return string.trim().split("\\n").join("\n");
};

const formatToTemplateLiteral = (string: string) => {
  // This needs to be used before we store our strings to the database, so that it keeps new lines and indentation.
  // Used in edits, and new question/quiz/answer
  return string.trim().split(/\n/).join("\\n");
};
// Example. It will turn this:
//   What is the output of the following JavaScript code?
// ```javascript
// function sayHello(){
//    console.log('Hello, World!');
// }
// sayHello();
// ```
// Into this:
//What is the output of the following JavaScript code?\n```javascript\nfunction sayHello(){\n   console.log('Hello, World!');\n}\nsayHello();\n```

export { formatToMarkdown, formatToTemplateLiteral };
