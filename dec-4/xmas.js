const fs = require('fs');

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const lines = input.trim().split('\n').map(line => [...line]);

    let matches = 0;

    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        const line = lines[lineNumber];
        for (let lineIndex = 0; lineIndex < line.length; lineIndex++) {
            if (line[lineIndex] === 'X') {
                if (checkRight(line, lineIndex)) {
                    matches++;
                }
                if (checkLeft(line, lineIndex)) {
                    matches++;
                }
                if (checkDown(lines, lineNumber, lineIndex)) {
                    matches++
                }
                if (checkUp(lines, lineNumber, lineIndex)) {
                    matches++;
                }
                if (checkDownRight(lines, lineNumber, lineIndex)) {
                    matches++;
                }
                if (checkDownLeft(lines, lineNumber, lineIndex)) {
                    matches++;
                }
                if (checkUpLeft(lines, lineNumber, lineIndex)) {
                    matches++;
                }
                if (checkUpRight(lines, lineNumber, lineIndex)) {
                    matches++;
                }
            }
        }
    }

    console.log('Total XMAS matches: ', matches);
} catch (error) {
    console.error('Error reading input: ', error);
}

function checkRight(line, index) {
    return index + 3 < line.length
        && line[index + 1] === 'M'
        && line[index + 2] === 'A'
        && line[index + 3] === 'S';
}

function checkLeft(line, index) {
    return index - 3 >= 0
        && line[index - 1] === 'M'
        && line[index - 2] === 'A'
        && line[index - 3] === 'S';
}

function checkDown(lines, lineNumber, lineIndex) {
    return lineNumber + 3 < lines.length
        && lines[lineNumber + 1][lineIndex] === 'M'
        && lines[lineNumber + 2][lineIndex] === 'A'
        && lines[lineNumber + 3][lineIndex] === 'S';
}

function checkUp(lines, lineNumber, lineIndex) {
    return lineNumber - 3 >= 0
        && lines[lineNumber - 1][lineIndex] === 'M'
        && lines[lineNumber - 2][lineIndex] === 'A'
        && lines[lineNumber - 3][lineIndex] === 'S';
}

function checkDownRight(lines, lineNumber, lineIndex) {
    return lineNumber + 3 < lines.length
        && lineIndex + 1 < lines[lineNumber + 1].length && lines[lineNumber + 1][lineIndex + 1] === 'M'
        && lineIndex + 2 < lines[lineNumber + 2].length && lines[lineNumber + 2][lineIndex + 2] === 'A'
        && lineIndex + 3 < lines[lineNumber + 3].length && lines[lineNumber + 3][lineIndex + 3] === 'S'
}

function checkDownLeft(lines, lineNumber, lineIndex) {
    return lineNumber + 3 < lines.length
        && lineIndex - 1 >= 0 && lines[lineNumber + 1][lineIndex - 1] === 'M'
        && lineIndex - 2 >= 0 && lines[lineNumber + 2][lineIndex - 2] === 'A'
        && lineIndex - 3 >= 0 && lines[lineNumber + 3][lineIndex - 3] === 'S'
}

function checkUpLeft(lines, lineNumber, lineIndex) {
    return lineNumber - 3 >= 0
        && lineIndex - 1 >= 0 && lines[lineNumber - 1][lineIndex - 1] === 'M'
        && lineIndex - 2 >= 0 && lines[lineNumber - 2][lineIndex - 2] === 'A'
        && lineIndex - 3 >= 0 && lines[lineNumber - 3][lineIndex - 3] === 'S'
}

function checkUpRight(lines, lineNumber, lineIndex) {
    return lineNumber - 3 >= 0
        && lineIndex + 1 < lines[lineNumber - 1].length && lines[lineNumber - 1][lineIndex + 1] === 'M'
        && lineIndex + 2 < lines[lineNumber - 2].length && lines[lineNumber - 2][lineIndex + 2] === 'A'
        && lineIndex + 3 < lines[lineNumber - 3].length && lines[lineNumber - 3][lineIndex + 3] === 'S'
}