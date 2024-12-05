let input = '';

process.stdin.on('data', (data) => {
    input += data;
});

process.stdin.on('end', () => {
    const lines = input.trim().split('\n');
    const leftList = [];
    const rightList = [];

    lines.forEach(line => {
        const [left, right] = line.split('   ').map(Number);
        leftList.push(left);
        rightList.push(right);
    });

    leftList.sort();
    rightList.sort();

    console.log('Left:', leftList);
    console.log('Right:', rightList);

    const distance = leftList.reduce((previousValue, currentValue, index) => {
        return previousValue + Math.abs(currentValue - rightList[index]);
    }, 0);

    console.log('Distance: ', distance);
});