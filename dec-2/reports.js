let input = '';

process.stdin.on('data', (data) => {
    input += data;
});

process.stdin.on('end', () => {
    const reports = input.trim().split('\n').map(line => {
        return line.split(' ').map(Number);
    });


    let safeReports = 0;
    reports.forEach(report => {
        let safe = true;
        if (report.length > 1) {
            const increasing = report[0] < report[1];
            for (let index = 1; index < report.length; index++) {
                const previous = report[index - 1];
                const current = report[index];

                const distance = increasing ? current - previous : previous - current;
                safe = distance >= 1 && distance <= 3;
                if (!safe) {
                    break;
                }
            }
        }
        if (safe) {
            safeReports++;
        }
    });

    console.log('Safe reports: ', safeReports);
});