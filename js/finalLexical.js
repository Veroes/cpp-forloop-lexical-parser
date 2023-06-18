const lexicalAnalyzer = (terminal) => {
  let state = 0;
  for (let i = 0; i < terminal.length; i++) {
    switch (state) {
      case 0:
        if (terminal[i] === "f") {
          state = 1;
        } else if (terminal[i] === "s") {
          state = 4;
        } else if (terminal[i] === "i") {
          state = 9;
        } else if (terminal[i] === "1") {
          state = 10;
        } else if (terminal[i] === "+") {
          state = 11;
        } else if (terminal[i] === "-") {
          state = 12;
        } else if (terminal[i] === "<") {
          state = 13;
        } else if (terminal[i] === ">" || terminal[i] === "=") {
          state = 14;
        } else if (terminal[i] === "!") {
          state = 15;
        } else if (
          terminal[i] === "(" ||
          terminal[i] === ")" ||
          terminal[i] === "{" ||
          terminal[i] === "}" ||
          terminal[i] === "n" ||
          terminal[i] === "x" ||
          terminal[i] === "*" ||
          terminal[i] === "/" ||
          terminal[i] === "%" ||
          terminal[i] === "0" ||
          terminal[i] === ";"
        ) {
          state = 16;
        } else {
          state = -1;
        }
        break;
      case 1:
        if (terminal[i] === "o") {
          state = 2;
        } else {
          state = -1;
        }
        break;
      case 2:
        if (terminal[i] === "r") {
          state = 16;
        } else if (terminal[i] === "u") {
          state = 3;
        } else {
          state = -1;
        }
        break;
      case 3:
        if (terminal[i] === "t") {
          state = 16;
        } else {
          state = -1;
        }
        break;
      case 4:
        if (terminal[i] === "t") {
          state = 5;
        } else {
          state = -1;
        }
        break;
      case 5:
        if (terminal[i] === "d") {
          state = 6;
        } else {
          state = -1;
        }
        break;
      case 6:
        if (terminal[i] === ":") {
          state = 7;
        } else {
          state = -1;
        }
        break;
      case 7:
        if (terminal[i] === ":") {
          state = 8;
        } else {
          state = -1;
        }
        break;
      case 8:
        if (terminal[i] === "c") {
          state = 1;
        } else {
          state = -1;
        }
        break;
      case 9:
        if (terminal[i] === "n") {
          state = 3;
        } else {
          state = -1;
        }
        break;
      case 10:
        if (terminal[i] === "0") {
          state = 16;
        } else {
          state = -1;
        }
        break;
      case 11:
        if (terminal[i] === "+") {
          state = 16;
        } else {
          state = -1;
        }
        break;
      case 12:
        if (terminal[i] === "-") {
          state = 16;
        } else {
          state = -1;
        }
        break;
      case 13:
        if (terminal[i] === "<" || terminal[i] === "=") {
          state = 16;
        } else {
          state = -1;
        }
        break;
      case 14:
        if (terminal[i] === "=") {
          state = 16;
        } else {
          state = -1;
        }
    }
  }
  if (
    state === 9 ||
    state === 10 ||
    state === 11 ||
    state === 12 ||
    state === 13 ||
    state === 14 ||
    state === 16
  ) {
    return true;
  }
  return false;
};

const parser = (cppCode) => {
  let stack = [];

  let state = "i";
  stack.push("#");
  state = "p";
  stack.push("statement");
  state = "q";

  let head = 0;
  let symbol = cppCode[head];
  let topStack = stack.at(-1);

  while (topStack != "#" && state != "error") {
    console.log(stack, symbol);
    switch (topStack) {
      case "statement":
        if (symbol == "for") {
          stack.pop();
          stack.push("}");
          stack.push(";");
          stack.push("action");
          stack.push("{");
          stack.push(")");
          stack.push("increment_decrement");
          stack.push(";");
          stack.push("condition");
          stack.push(";");
          stack.push("initialization");
          stack.push("(");
          stack.push("for");
        } else {
          state = "error";
        }
        break;
      case "initialization":
        if (symbol === "int") {
          stack.pop();
          stack.push("number");
          stack.push("=");
          stack.push("variable");
          stack.push("int");
        } else if (symbol === "i" || symbol === "n" || symbol === "x") {
          stack.pop();
          stack.push("variable");
        } else {
          state = "error";
        }
        break;
      case "condition":
        // i < n
        if (symbol === "i" || symbol === "n" || symbol === "x") {
          stack.pop();
          if (
            cppCode[head + 2] == "i" ||
            cppCode[head + 2] == "n" ||
            cppCode[head + 2] == "x"
          ) {
            stack.push("variable");
            stack.push("comparator");
            stack.push("variable");
          } else {
            stack.push("number");
            stack.push("comparator");
            stack.push("variable");
          }
        } else {
          state = "error";
        }
        break;
      case "increment_decrement":
        if (symbol === "i" || symbol === "n" || symbol === "x") {
          stack.pop();
          if (cppCode[head + 1] === "++") {
            stack.push("++");
            stack.push("variable");
          } else {
            stack.push("--");
            stack.push("variable");
          }
        } else {
          state = "error";
        }
        break;
      case "action":
        if (symbol === "for") {
          stack.pop();
          stack.push("statement");
        } else if (symbol === "std::cout") {
          stack.pop();
          stack.push("variable");
          stack.push("<<");
          stack.push("std::cout");
        } else {
          state = "error";
        }
        break;
      case "variable":
        if (symbol === "i") {
          stack.pop();
          stack.push("i");
        } else if (symbol === "n") {
          stack.pop();
          stack.push("n");
        } else if (symbol === "x") {
          stack.pop();
          stack.push("x");
        } else {
          state = "error";
        }
        break;
      case "number":
        if (symbol === "0") {
          stack.pop();
          stack.push("0");
        } else if (symbol === "1") {
          stack.pop();
          stack.push("1");
        } else if (symbol === "10") {
          stack.pop();
          stack.push("10");
        } else {
          state = "error";
        }
        break;
      case "comparator":
        if (symbol === "==") {
          stack.pop();
          stack.push("==");
        } else if (symbol === "!=") {
          stack.pop();
          stack.push("!=");
        } else if (symbol === ">") {
          stack.pop();
          stack.push(">");
        } else if (symbol === ">=") {
          stack.pop();
          stack.push(">=");
        } else if (symbol === "<") {
          stack.pop();
          stack.push("<");
        } else if (symbol === "<=") {
          stack.pop();
          stack.push("<=");
        } else {
          state = "error";
        }
        break;
      case "operator":
        if (symbol === "+") {
          stack.pop();
          stack.push("+");
        } else if (symbol === "-") {
          stack.pop();
          stack.push("-");
        } else if (symbol === "*") {
          stack.pop();
          stack.push("*");
        } else if (symbol === "/") {
          stack.pop();
          stack.push("/");
        } else if (symbol === "%") {
          stack.pop();
          stack.push("%");
        } else {
          state = "error";
        }
        break;
      case "for":
        if (symbol === "for") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "(":
        if (symbol === "(") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case ")":
        if (symbol === ")") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "{":
        if (symbol === "{") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "}":
        if (symbol === "}") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case ";":
        if (symbol === ";") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "int":
        if (symbol === "int") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "++":
        if (symbol === "++") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "--":
        if (symbol === "--") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "std::cout":
        if (symbol === "std::cout") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "<<":
        if (symbol === "<<") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "=":
        if (symbol === "=") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "i":
      case "n":
      case "x":
        if (symbol === "i" || symbol === "n" || symbol === "x") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "0":
      case "1":
      case "10":
        if (symbol === "0" || symbol === "1" || symbol === "10") {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "==":
      case "!=":
      case ">":
      case ">=":
      case "<":
      case "<=":
        if (
          symbol === "==" ||
          symbol === "!=" ||
          symbol === ">" ||
          symbol === ">=" ||
          symbol === "<" ||
          symbol === "<="
        ) {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        if (
          symbol === "+" ||
          symbol === "-" ||
          symbol === "*" ||
          symbol === "/" ||
          symbol === "%"
        ) {
          stack.pop();
          head++;
          symbol = cppCode[head];
        } else {
          state = "error";
        }
        break;
      default:
        state = "error";
    }
    topStack = stack.at(-1);
  }
  if (state != "error") {
    stack.pop();
    state = "f";
  }
  if (state != "f") {
    return false;
  }
  return true;
};
/*
['for', '(', 'int', 'i', '=', '0', ';', 'i', '<', 'n', ';', 
'i', '++', ')', '{', 'std::cout', '<<', 'i', ';', '}']
*/
// Get text value
const checkButton = document.getElementById("check-button");
const CheckOutput = document.getElementById("text-result");
/*
for(int i = 0; i < 10; i++) {
  std::cout<<i;
}

FOR(int i = 0; i < 10; i++) {
  std::cout<<i;
}

for (i; i < n; i++) {
  std::cout<<x;
}
for(int i = 0; i > 0; i--) {
  std::cout<<i;
}
for(i; i > 0; i--) {
  std::cout<<i;
}
*/
const regex = /[a-zA-Z_]\w*|<<|::|\+\+|\-\-|[\\(\)\{\}<>=;]|[0-9]+/g;

checkButton.addEventListener("click", () => {
  let validLexical = true;
  const codeSymbol = document.getElementById("text-input").value;
  const tokens = codeSymbol.match(regex);

  const stdIndex = tokens.indexOf("std");

  tokens[stdIndex] += tokens[stdIndex + 1] + tokens[stdIndex + 2];
  tokens.splice(stdIndex + 1, 2);
  console.log(tokens);
  tokens.forEach((lexical) => {
    if (lexicalAnalyzer(lexical) === false) {
      validLexical = false;
    }
  });

  const validParse = parser(tokens);

  if (validLexical && validParse) {
    CheckOutput.innerHTML = "Lexical: Valid\n Parser: Valid";
  } else if (validLexical) {
    CheckOutput.innerHTML = "Lexical: Valid\n Parser: Not Valid";
  } else {
    CheckOutput.innerHTML = "Lexical: Not Valid\n Parser: Not Valid";
  }

  console.log(validLexical);
});
