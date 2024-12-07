const fs = require('fs');

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    const result = [...input.matchAll(/mul\([0-9]+,[0-9]+\)/g)]
        .map(value => value[0]) // Get all mul values
        .map(value => value.slice(4, -1)) // Remove mul( and )
        .map(value => value.split(',').map(Number)) // Split and map to numbers
        .reduce((previousValue, currentValue) => previousValue + (currentValue[0] * currentValue[1]), 0);

    console.log('Result: ', result);
} catch (error) {
    console.error('Error reading input: ', error);
}