const fs = require('fs');

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const lines = input.trim().split('\n').map(line => [...line]);

    let matches = 0;

    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        const line = lines[lineNumber];
        for (let lineIndex = 0; lineIndex < line.length; lineIndex++) {
            if (line[lineIndex] === 'A'
                && lineNumber - 1 >= 0
                && lineNumber + 1 < lines.length
                && lineIndex - 1 >= 0
                && lineIndex + 1 < line.length) {

                const up = lines[lineNumber - 1];
                const down = lines[lineNumber + 1];

                /*
                M . S
                . A .
                M . S
                 */
                if (up[lineIndex - 1] === 'M'
                    && up[lineIndex + 1] === 'S'
                    && down[lineIndex - 1] === 'M'
                    && down[lineIndex + 1] === 'S') {
                    matches++;
                }

                /*
                M . M
                . A .
                S . S
                 */
                if (up[lineIndex - 1] === 'M'
                    && up[lineIndex + 1] === 'M'
                    && down[lineIndex - 1] === 'S'
                    && down[lineIndex + 1] === 'S') {
                    matches++;
                }

                /*
                S . S
                . A .
                M . M
                 */
                if (up[lineIndex - 1] === 'S'
                    && up[lineIndex + 1] === 'S'
                    && down[lineIndex - 1] === 'M'
                    && down[lineIndex + 1] === 'M') {
                    matches++;
                }

                /*
                S . M
                . A .
                S . M
                 */
                if (up[lineIndex - 1] === 'S'
                    && up[lineIndex + 1] === 'M'
                    && down[lineIndex - 1] === 'S'
                    && down[lineIndex + 1] === 'M') {
                    matches++;
                }
            }
        }
    }

    console.log('Total X-MAS matches: ', matches);
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