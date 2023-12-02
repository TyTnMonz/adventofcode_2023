const getCalibrationValues = (puzzle) => {
    // Split the Puzzel into lines by \n
    const lines = puzzle.split('\n');
    let sum = 0;
    // Loop through each line
    lines.forEach((line) => {
        /* Find all the Digits inside the line using a Regex,
           it will return an array of matches */
        const digits = line.match(/\d/g);
        if (digits) {
            /* 
                If any match has found sum the FIRST and the LAST element of the array
                If only one digit has found is fine because
                it will be the the first AND the last at the same time
                and the 0-index element will be duplicated to respect the prompt 

                Ex: treb7uchet --> 77
            */
            sum += parseInt(digits[0] + digits[digits.length - 1])
        }
    });
  
    return sum;
}

const puzzleInput = `...`

const result = getCalibrationValues(puzzleInput);
console.log(result);