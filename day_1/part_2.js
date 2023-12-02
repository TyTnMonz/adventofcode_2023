/* 
    SAME AS THE PART 1
     - add the <sanitizePuzzle> function to replace the strings with digits
     - get the Calibration Value out from the Sanitized Puzzle
*/

const sanitizePuzzle = (puzzle) => {
    /* 
        To sanitize the input puzzle we need to replace 
        all the string representing digits ( <digit string> ) with the corresponding digit.
        Instead of replace the <digit string> with the single digit, we will
        replace the <digit string> with a new string CONTAINING the digit ENCLOSED
        between the first and the last char of the <digit string>.
        This will 'destroy' the <digit string> but will preserve the sequence of
        two or more <digit string> with overlapped char to respect the prompt.
        Thanks to this, not even the order in which we make the replacement will matter

        Ex: eightwothree       
            ----^        8
                ^--      2
                   ^---- 3

        The result of this line must be 83 but there is an ovelapping between eighT and Two.
        Looping through the array of replacements we will first replace 'TWO' but 
        if we would replace 'TWO' with '2' only, we would lose the last 'T' of 'eighT' ( eigh2three )
        and this will produce an output as 23 at the end, which is wrong.
        By replacing 'TWO' with 'T2O' we will preserve the 'T' of eighT ( eighT2Othree ) so
        it will be correctly replaced when needed.
        Not all digits can face overlapping, but is fine to apply the rule to each one.
     */
    const stringsReplacements = {
        one: 'o1e',
        two: 't2o',
        three: 't3e',
        four: 'f4r',
        five: 'f5e',
        six: 's6x',
        seven: 's7n',
        eight: 'e8t',
        nine: 'n9e',
    };

    Object.keys(stringsReplacements).forEach((strNum) => {
        puzzle = puzzle.replaceAll(strNum, stringsReplacements[strNum]);
    });

    return puzzle;
}

const getCalibrationValues = (puzzle) => {
    const lines = puzzle.split('\n');
    let sum = 0;
  
    lines.forEach((line) => {
      const digits = line.match(/\d/g);
      if (digits) {
        sum += parseInt(digits[0] + digits[digits.length - 1])
      }
    });
  
    return sum;
}

const puzzleInput = `...`

const result = getCalibrationValues(sanitizePuzzle(puzzleInput));
console.log(result);