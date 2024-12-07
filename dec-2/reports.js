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
        //console.log(report);
        let safe = true;
        let problemDampened = false;
        if (report.length > 1) {
            let increasing = report[0] < report[1];
            for (let index = 1; index < report.length; index++) {
                const previous = report[index - 1];
                const current = report[index];

                //console.log('Checking ', previous, current);

                safe = checkSafe(increasing, previous, current);
                if (!safe) {
                    console.log('Unsafe!', previous, current);
                    if (problemDampened) {
                        //console.log('Already dampened problem once...');
                        //console.log(report);
                        break;
                    } else {
                        // 87 81 78 77 75 75 74
                        //  p  c
                        //     i

                        if (index === 1) {
                            const cont = checkSafe(increasing, current, report[index + 1]) || checkSafe(increasing, previous, report[index + 1]);
                            const swap = checkSafe(!increasing, current, report[index + 1]) || checkSafe(!increasing, previous, report[index + 1]);

                            if (cont || swap ) {
                                problemDampened = true;
                                safe = true;
                                if (swap && !cont) {
                                    increasing = !increasing;
                                }
                                index++
                            } else {
                                //console.log('Cannot dampen problem...');
                                //console.log(report);
                                break;
                            }


                        } else {
                            const canRemovePrevious = index > 1 && checkSafe(increasing, report[index - 2], current);
                            const canRemoveCurrent = index + 1 < report.length && checkSafe(increasing, previous, report[index + 1]);

                            const canRemovePreviousAndSwap = index === 2 && checkSafe(!increasing, report[index - 2], current);
                            const canRemoveCurrentAndSwap = index === 1 && report.length > 2 && checkSafe(!increasing, previous, report[index + 1]);

                            //console.log('CanRemovePrevious: ', canRemovePrevious, '; CanRemoveCurrent: ', canRemoveCurrent, '; CanSwap: ', canRemovePreviousAndSwap, canRemoveCurrentAndSwap);
                            if (canRemovePrevious || canRemoveCurrent || canRemovePreviousAndSwap || canRemoveCurrentAndSwap) {
                                problemDampened = true;
                                safe = true;
                                if ((canRemovePreviousAndSwap || canRemoveCurrentAndSwap) && !canRemoveCurrent && !canRemovePrevious) {
                                    increasing = !increasing;
                                }
                                index++;
                            }
                            else {
                                //console.log('Cannot dampen problem...');
                                //console.log(report);
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (safe) {
            safeReports++;
        }
    });

    console.log('Safe reports: ', safeReports);
});

function checkSafe(increasing, previous, current) {
    //console.log('Checking for: Increasing', increasing, '; prev: ', previous, '; current: ', current);
    const distance = increasing ? current - previous : previous - current;
    return distance >= 1 && distance <= 3;
}