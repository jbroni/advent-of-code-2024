const fs = require('fs');

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const map = input.trim().split('\n').map(line => [...line]);

    const guard = findGuard(map);

    const finalMap = moveGuard(map, guard);
    const uniquePositions = countXs(finalMap);

    console.log('Unique positions visited by guard: ', uniquePositions);

} catch (error) {
    console.error('Error reading input: ', error);
}

function findGuard(map) {
    for (let y = 0; y < map.length; y++) {
        const line = map[y];
        for (let x = 0; x < line.length; x++) {
            const guardSigns = ['^', '>', 'v', '<'];
            if (guardSigns.includes(line[x])) {
                return {x, y, direction: line[x]};
            }
        }
    }
}

function moveGuard(map, guard) {
    switch (guard.direction) {
        case '^':
            if (guard.y === 0) {
                map[guard.y][guard.x] = 'X';
                return map;
            } else if (map[guard.y - 1][guard.x] === '#') {
                map[guard.y][guard.x] = '>';
                guard.direction = '>';
                return moveGuard(map, guard);
            } else {
                map[guard.y][guard.x] = 'X';
                map[guard.y - 1][guard.x] = guard.direction;
                guard.y = guard.y - 1;
                return moveGuard(map, guard);
            }
        case '>':
            if (guard.x === map[guard.y].length - 1) {
                map[guard.y][guard.x] = 'X';
                return map;
            } else if (map[guard.y][guard.x + 1] === '#') {
                map[guard.y][guard.x] = 'v';
                guard.direction = 'v';
                return moveGuard(map, guard);
            } else {
                map[guard.y][guard.x] = 'X';
                map[guard.y][guard.x + 1] = guard.direction;
                guard.x = guard.x + 1;
                return moveGuard(map, guard);
            }
        case 'v':
            if (guard.y === map.length - 1) {
                map[guard.y][guard.x] = 'X';
                return map;
            } else if (map[guard.y + 1][guard.x] === '#') {
                map[guard.y][guard.x] = '<';
                guard.direction = '<';
                return moveGuard(map, guard);
            } else {
                map[guard.y][guard.x] = 'X';
                map[guard.y + 1][guard.x] = guard.direction;
                guard.y = guard.y + 1;
                return moveGuard(map, guard);
            }
        case '<':
            if (guard.x === 0) {
                map[guard.y][guard.x] = 'X';
                return map;
            } else if (map[guard.y][guard.x - 1] === '#') {
                map[guard.y][guard.x] = '^';
                guard.direction = '^';
                return moveGuard(map, guard);
            } else {
                map[guard.y][guard.x] = 'X';
                map[guard.y][guard.x - 1] = guard.direction;
                guard.x = guard.x - 1;
                return moveGuard(map, guard);
            }
    }
    return map;
}

function countXs(map) {
    let Xs = 0;
    map.forEach(line => {
        line.forEach(point => {
            if (point === 'X') {
                Xs++;
            }
        });
    });
    return Xs;
}