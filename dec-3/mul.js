const fs = require('fs');

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    const instructions = [...input.matchAll(/mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\)/g)]
        .map(value => value[0]); // Get all instructions

    let enabled = true;
    let muls = [];
    instructions.forEach(value => {
        if (value === "don't()") {
            enabled = false;
        } else if (value === 'do()') {
            enabled = true;
        } else if (enabled) { // mul instruction
            muls.push(value.slice(4, -1).split(',').map(Number));
        }
    });

    const result = muls.reduce((previousValue, currentValue) => previousValue + (currentValue[0] * currentValue[1]), 0);
    console.log('Result: ', result);
} catch (error) {
    console.error('Error reading input: ', error);
}