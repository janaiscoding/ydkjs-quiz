const formatToMarkdown = (string: string) => {
  return string.trim().split("\\n").join("\n");
};

const formatToTemplateLiteral = (string: string) => {
  return string.trim().split(/\n/).join("\\n");
};

export { formatToMarkdown, formatToTemplateLiteral };
