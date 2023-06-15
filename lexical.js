// C++ Parser FOR LOOP
/*
for (Initialization; Condition; Update ) {
  ...
}
Initialization : <data_type>[int] <var_name>[word]* = <number>[int]
Condition : <var_name>[word]* <logical_op>[==, !=, <=, >=, <, >]
Update :[
          ++<var_name>[word]*, 
          <var_name>[word]*++,
          --<var_name>[word]*,
          <var_name>[word]*--, 
        ]
*/

// Inisialiasai class Stack
class StackClass {
  constructor() {
    this.top = -1;
    this.stackList = [];
  }
  push(symbol) {
    this.top++;
    this.StackList.push(symbol);
  }
  pop() {
    this.top--;
    return this.StackList.pop();
  }
  isEmpty() {
    return this.top === -1;
  }
  readTop() {
    return this.stackList[this.top];
  }
}

// Aturan Produksi CFG

// Get text value
const checkButton = document.getElementById("check-button");
const CheckOutput = document.getElementById("text-result");

checkButton.addEventListener("click", () => {
  const codeSymbol = document.getElementById("text-input").value;
  const codeSplitted = codeSymbol.split(/\s+/g);
  if (codeSplitted.at(-1) === "") {
    codeSplitted.pop("");
  }
  console.log(codeSplitted);
  CheckOutput.innerHTML = codeSplitted;
});
