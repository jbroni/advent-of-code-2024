const fs = require('fs');

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const lines = input.trim().split('\n');

    const separator = lines.findIndex(value => value === '');
    const rules = lines.slice(0, separator).map(rule => rule.split('|').map(Number));
    const updates = lines.slice(separator + 1, lines.length).map(update => update.split(',').map(Number));

    const order = getOrderFromRules(rules);

    let middlePageSum = 0;
    updates.forEach(update => {
       if (!checkUpdate(update, order)) {
           const reorderedMiddlePage = reorderPagesAndGetMiddle(update, order);
           middlePageSum += reorderedMiddlePage;
       }
    });

    console.log('Sum of middle pages: ', middlePageSum);
} catch (error) {
    console.error('Error reading input: ', error);
}

function getOrderFromRules(rules) {
    const order = new Map();
    rules.forEach(rule => {
        const value = order.get(rule[0]);
        const values = value ? [...value, rule[1]] : [rule[1]];
        order.set(rule[0], values);
    });
    return order;
}

function checkUpdate(update, order) {
    for (let i = 1; i < update.length; i++) {
        const prevPages = update.slice(0, i);
        const page = update[i];
        const rule = order.get(page);
        const wrongOrder = rule && prevPages.some(value => rule.includes(value));
        if (wrongOrder) {
            return false;
        }
    }
    return true;
}

function reorderPagesAndGetMiddle(update, order) {
    const newOrder = [update[0]];
    for (let i = 1; i < update.length; i++) {
        const prevPages = newOrder.slice(0, i);
        const page = update[i];
        const rule = order.get(page);

        const incorrectPages = [];
        prevPages.forEach(page => {
            if (rule && rule.includes(page)) {
                incorrectPages.push(page);
            }
        });

        if (incorrectPages.length > 0) {
            let earliestIndex = -1;
            incorrectPages.forEach(page => {
               const index = newOrder.findIndex(value => value === page);
               if (earliestIndex === -1 || index < earliestIndex) {
                   earliestIndex = index;
               }
            });
            newOrder.splice(earliestIndex, 0, page);
        } else {
            newOrder.push(page);
        }
    }
    return newOrder[(newOrder.length - 1) / 2];
}