const textArea = document.getElementById("text-input");

textArea.addEventListener("keydown", function (event) {
  if (event.key === "Tab") {
    event.preventDefault();

    // Get the current selection and caret position
    const selectionStart = textArea.selectionStart;
    const selectionEnd = textArea.selectionEnd;
    const value = textArea.value;

    // Insert a 2-space indentation at the caret position
    const indentation = "  "; // 2 spaces
    textArea.value =
      value.substring(0, selectionStart) +
      indentation +
      value.substring(selectionEnd);

    // Move the caret position after the inserted indentation
    const newCaretPosition = selectionStart + indentation.length;
    textArea.selectionStart = textArea.selectionEnd = newCaretPosition;
  }
});

const updateLineNumbers = () => {
  let textAreaLine = document.getElementById("text-input");
  let lineNumbers = document.getElementById("line-numbers");

  // Split the text area content by line breaks
  let lines = textAreaLine.value.split("\n");

  // Check if the number of rows exceeds the limit
  if (lines.length > 15) {
    // Truncate the lines array to 20 rows
    lines = lines.slice(0, 15);

    // Set the textarea value to the truncated content
    textAreaLine.value = lines.join("\n");
  }

  // Generate line number HTML
  let lineNumberHTML = "";
  for (let i = 1; i <= lines.length; i++) {
    lineNumberHTML += i + "<br />";
  }

  // Update the line numbers container
  lineNumbers.innerHTML = lineNumberHTML;
};

updateLineNumbers();
