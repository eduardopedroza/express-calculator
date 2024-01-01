const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function calculateMean(nums) {
    let sum = nums.reduce((acc, num) => acc + num, 0);
    return sum / nums.length
}

function calculateMedian(nums) {
    const sortedNums = nums.sort((a, b) => a - b);

    if ((sortedNums.length % 2) === 1) {
        return sortedNums[Math.floor(sortedNums.length / 2)];
    } else {
        const mid1 = sortedNums[(sortedNums.length / 2) - 1];
        const mid2 = sortedNums[sortedNums.length / 2];
        return (mid1 + mid2) / 2;
    }
}

function calculateMode(nums) {
    const numsLibrary = {};
    let maxFreq = 0;
    let modes = [];

    for (let num of nums) {
        if (numsLibrary[num]) {
            numsLibrary[num]++;
        } else {
            numsLibrary[num] = 1;
        }

        if (numsLibrary[num] > maxFreq) {
            maxFreq = numsLibrary[num];
        }
    }

    for (let num in numsLibrary) {
        if (numsLibrary[num] === maxFreq) {
            modes.push(Number(num));
        }
    }

    if (modes.length === Object.keys(numsLibrary).length) {
        modes = [];
    }

    return modes;
}

app.get('/mean', function(req, res) {
    const nums = req.query.nums;

    if (!nums) {
        return res.status(400).json({ error: 'nums are required.'});
    }

    const numArray = nums.split(',').map(Number);

    const invalidNums = numArray.filter(num => isNaN(num));
    if (invalidNums.length > 0) {
        return res.status(400).json({ error: `${invalidNums.join(', ')} is not a number`});
    }

    const mean = calculateMean(numArray);

    res.json({
        operation: 'mean',
        value: mean
    })
})


app.get('/median', function(req, res) {
    const nums = req.query.nums;

    if (!nums) {
        return res.status(400).json({ error: 'nums are required'});
    }

    const numArray = nums.split(',').map(Number);

    const invalidNums = numArray.filter(num => isNaN(num));
    if (invalidNums.length > 0){
        return res.status(400).json({ error: `${invalidNums.join(', ')} is not a number`});
    }

    const median = calculateMedian(numArray);

    res.json({
        operation: 'median',
        value: median
    })
})


app.get('/mode', function(req, res) {
    const nums = req.query.nums;

    if (!nums) {
        return res.status(400).json({ error: 'nums are required'});
    }

    const numArray = nums.split(',').map(Number);

    const invalidNums = numArray.filter(num => isNaN(num));
    if (invalidNums.length > 0) {
        return res.status(400).json({ error: `${invalidNums.join(', ')} is not a number`});
    }

    const mode = calculateMode(numArray);

    res.json({
        operation: 'mode',
        value: mode
    })
})


module.exports = app;