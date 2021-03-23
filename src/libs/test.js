const calendar  = require('./calendar')
let nowMonth = calendar.getMonthArray(2021, 1);
        nowMonth = calendar.fillPrveMonth(nowMonth);
        console.log(nowMonth);
