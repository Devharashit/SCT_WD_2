const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (value === "AC") {
            currentInput = "";
        } 
        else if (value === "DEL") {
            currentInput = currentInput.slice(0, -1);
        } 
        else if (value === "=") {
            try {
                // Prevent division by zero
                if (/\/0(?!\.)/.test(currentInput)) {
                    display.value = "Error";
                    currentInput = "";
                    return;
                }
                currentInput = eval(currentInput).toString();
            } catch {
                display.value = "Error";
                currentInput = "";
                return;
            }
        } 
        else {
            currentInput += value;
        }

        display.value = currentInput;
    });
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
    if ((e.key >= "0" && e.key <= "9") || "+-*/.%".includes(e.key)) {
        currentInput += e.key;
    } 
    else if (e.key === "Enter") {
        try {
            if (/\/0(?!\.)/.test(currentInput)) {
                display.value = "Error";
                currentInput = "";
                return;
            }
            currentInput = eval(currentInput).toString();
        } catch {
            display.value = "Error";
            currentInput = "";
            return;
        }
    } 
    else if (e.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
    } 
    else if (e.key === "Escape") {
        currentInput = "";
    }

    display.value = currentInput;
});
