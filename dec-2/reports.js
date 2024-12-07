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
        const {safe, index} = checkReport(report);
        if (safe) {
            safeReports++;
        } else {
            // Problem Dampener
            const alteredReports = [[...report], [...report]];
            alteredReports[0].splice(index - 1, 1);
            alteredReports[1].splice(index, 1);

            if (index > 1) {
                const alteredReport = [...report];
                alteredReport.splice(index - 2, 1);
                alteredReports.push(alteredReport);
            }

            for (let i = 0; i < alteredReports.length; i++) {
                const {safe, _} = checkReport(alteredReports[i]);
                if (safe) {
                    safeReports++;
                    break;
                }
            }
        }
    });

    console.log('Safe reports: ', safeReports);
});

function checkReport(report) {
    let safe = true;
    let index = 1;
    if (report.length > 1) {
        let increasing = report[0] < report[1];
        for (index = 1; index < report.length; index++) {
            const previous = report[index - 1];
            const current = report[index];

            if (!checkSafe(increasing, previous, current)) {
                safe = false;
                break;
            }
        }
    }
    return {safe, index};
}

function checkSafe(increasing, previous, current) {
    const distance = increasing ? current - previous : previous - current;
    return distance >= 1 && distance <= 3;
}