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

    const distance = leftList.reduce((previousValue, currentValue, index) => {
        return previousValue + Math.abs(currentValue - rightList[index]);
    }, 0);

    console.log('Distance: ', distance);

    let similarity = 0;
    let rightIndex = 0;
    let previousLeftValue = 0;
    let previousScore = 0;

    leftList.forEach((leftValue) => {
        if (leftValue !== previousLeftValue) {
            let similarities = 0;
            while (rightIndex < rightList.length && rightList[rightIndex] <= leftValue) {
                if (rightList[rightIndex] === leftValue) {
                    similarities++;
                }
                rightIndex++;
            }
            previousLeftValue = leftValue;
            previousScore = similarities * leftValue;
        }
        similarity += previousScore;
    });

    console.log('Similarity: ', similarity);
});