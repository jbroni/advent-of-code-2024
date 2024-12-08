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
       if (checkUpdate(update, order)) {
           middlePageSum += update[(update.length - 1) / 2];
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