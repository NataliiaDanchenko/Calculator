let number = document.querySelectorAll('.number'); 
let firstNumber = ''; 
let secondNumber = ''; 
let result = document.querySelector('.result');
let symbol = ''; 
let calculationEnd = false; 

let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']; 
let symbols = ['+', '-', '*', '/']; 


function reset () {
    firstNumber = '';
    secondNumber = '';
    symbol = '';
    result.textContent = '';
    calculationEnd = false;
    return;
}

document.querySelector('.reset').addEventListener('click', reset); 

number.forEach(num => {
    num.addEventListener('click', function (event) { 
        if(event.target.classList.contains('.symbol')) return; 
        if(event.target.classList.contains('.reset')) return; 
        
        let key = event.target.textContent; 

        if(numbers.includes(key)) {
            if(result.textContent == firstNumber && calculationEnd) {
                calculationEnd = false; 
                firstNumber = key; 
                result.textContent = firstNumber; 
            }

            else if(secondNumber === '' && symbol === '') { 
                firstNumber += key; 
                result.textContent = firstNumber; 
            }

            else { 
                secondNumber += key; 
                result.textContent = secondNumber; 
            }
            return;
        }

        if(key === '=' || (secondNumber !== '' && symbols.includes(key))) { 
            if (secondNumber === '') secondNumber = 0; 
           
            switch (symbol) {
                case '+':
                    firstNumber = (+firstNumber) + (+secondNumber); 
                    break;
                case '-':
                    firstNumber = firstNumber - secondNumber; 
                    break;
                case '*':
                    firstNumber = firstNumber * secondNumber; 
                    break;
                case '/':
                    if (secondNumber == '0') { 
                        firstNumber = ''; 
                        secondNumber = '';
                        symbol = '';
                        result.textContent = 'Error';
                        return
                    }
                    firstNumber = firstNumber / secondNumber; 
                    break;   
            }
            secondNumber = '';
            symbol = '';
            calculationEnd = true; 
            result.textContent = firstNumber; 
        }

        if(symbols.includes(key)) { 
            symbol = key; 
            result.textContent = symbol;
        }
    })
})