
export default  {
    /**
     * @description 是否是闰年
     * @param {Number} 年
     */
    isLeapYear(year) {
        return year % 4 === 0
    },

    /**
     * @description 获取月份的天数
     * @param {Number} year 年
     * @param {Number} month 月
     */
    getMonthDays(year, month) {
        if(this.isLeapYear(year) && month ===2) {
            return  28
        }
        let daysArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return daysArr[month - 1]
    },
    /**
     * 将0到9转换成09
     * @param {Number} value
     */
    gt(value) {
        value = parseInt(value)
        return value>=10?value:0+''+value
    },
    /**
     * @description 生成月分数组
     * @param {number} year  年
     * @param {number} month 月
     * @param {number} minDate 最小日期
     * @param {number} fixed 最大日期
     */
    getMonthArray(year, month, monthType='current', minDate="0000-00-00", maxDate="3000-01-01") {
        let days = this.getMonthDays(year, month);
        let minnumber = parseInt(minDate.replace(/-\//ig,''))
        let maxnumber = parseInt(maxDate.replace(/-\//ig,''))
        let nowymdnumber = parseInt(this.formatDate('','YMD'))
        let daysArr = [];
        for (let i=1, l = days; i <= l; i++) {
            let date =  new Date(`${year}/${month}/${i}`);
            let monthStr = this.gt(month);
            let dayStr = this.gt(i)
            let overTop = false; //是否超出范围
            let timeType = 'formerly'; //时间类型， formerly为过去， today为今天，  future为将来
            let ymdnumber = parseInt(`${year}${monthStr}${dayStr}`);
            if(ymdnumber > maxnumber || ymdnumber < minnumber) {
                overTop = true;
            }
            if(ymdnumber === nowymdnumber) {
                timeType = 'today'
            }
            if(ymdnumber > nowymdnumber) {
                timeType =  'future';
            }

            daysArr.push({
                day: i,
                week: date.getDay(),
                year: year,
                month: month,
                timestamp: date.getTime(),
                key: this.getId(),
                ym:`${year}-${monthStr}`,
                ymd: `${year}-${monthStr}-${dayStr}`,
                ymnumber: parseInt(`${year}${monthStr}`),
                ymdnumber: ymdnumber,
                type: monthType, //当前月
                timeType: timeType, 
                overTop: overTop,
                keyStr: `${year}${monthStr}${dayStr}`
            })
        }
        return daysArr;  
    },
    /**
     * @description 生成月分数组
     * @param {Array} monthArr  年
     * @param {number} weekType 0为周日为开始， 1为周1开始
     * @param {number} minDate 最小日期
     * @param {number} fixed 最大日期
     */
    fillPrveMonth(monthArr, weekType=0, minDate="0000-00-00", maxDate="3000-01-01") {
        let daysArr = monthArr;
        let minnumber = parseInt(minDate.replace(/-\//ig,''))
        let maxnumber = parseInt(maxDate.replace(/-\//ig,''))
        let nowymdnumber = parseInt(this.formatDate('','YMD'));
        let oneday = 1000*60*60*24; 
        let i = 0;
        while (daysArr[0].week !==weekType && i < 7){     
            i++
               
            let timestamp = daysArr[0].timestamp - oneday;
            let nowday = this.formatDate(timestamp,'Y/M/D');
            let date =  new Date(nowday);  
            let ymdArr = nowday.split('/');

            let overTop = false; //是否超出范围
            let timeType = 'formerly'; //时间类型， formerly为过去， today为今天，  future为将来
            let ymdnumber = parseInt(`${ymdArr[0]}${ymdArr[1]}${ymdArr[2]}`);
            if(ymdnumber > maxnumber || ymdnumber < minnumber) {
                overTop = true;
            }
            if(ymdnumber === nowymdnumber) {
                timeType = 'today'
            }
            if(ymdnumber > nowymdnumber) {
                timeType =  'future';
            }

            monthArr.unshift({
                year: parseInt(ymdArr[0]),
                month: parseInt(ymdArr[1]),
                day: parseInt(ymdArr[2]),
                timestamp: timestamp,
                key: this.getId(),
                week: date.getDay(),
                ym:`${ymdArr[0]}-${ymdArr[1]}`,
                ymd: `${ymdArr[0]}-${ymdArr[1]}-${ymdArr[2]}`,
                ymnumber: parseInt(`${ymdArr[0]}${ymdArr[1]}`),
                ymdnumber:ymdnumber,
                type: 'prev', //当前月
                timeType: timeType, 
                overTop: overTop,
                keyStr: `${ymdArr[0]}${ymdArr[1]}${ymdArr[2]}`
            })

        }  
        return monthArr;
    },
    getNextMonth(year, month) {
        let y = year;
        let m = month+1
        if(month === 12) {
            m = 1;
            y++;
        }
        return {
            year: y,
            month: m
        }
    },
    getPrevMonth(year, month) {
        let y = year;
        let m = month-1
        if(month === 1) {
            m = 12;
            y--;
        }
        return {
            year: y,
            month: m
        }
    },

    getId() {
        let a = Math.random() * 1000000000000000
        let b = Math.random() * 1000000000000000
        let c = Math.random() * 1000000000000000
        return parseInt(a + b + c)
    },
    /**
     * 格式化时间
     * @param {String,Number} arg 时戳或日期字符串
     * @param {String} format 格式化的时间 Y：年 M:月 D:日 h：时 m:分 s:秒
     */
    formatDate(arg="", format) {
        if(typeof arg === "string" && arg) {
            arg = arg.replace(/-/ig, '/');
            if(arg.indexOf('/')<0) {
                arg = parseInt(arg);
            }
        }
        
        format = format || "Y/M/D h:m";
        let now = ''
        if(!arg) {
            now = new Date();
        }else{
            now = new Date(arg);
        }
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        month = month >= 10 ? month : "0" + month;
        var date = now.getDate();
        date = date >= 10 ? date : "0" + date;
        var hour = now.getHours();
        hour = hour >= 10 ? hour : "0" + hour;
        var minute = now.getMinutes();
    
        minute = minute >= 10 ? minute : "0" + minute;
        var second = now.getSeconds();
        second = second >= 10 ? second : "0" + second;
        return format
        .replace("Y", year)
        .replace("M", month)
        .replace("D", date)
        .replace("h", hour)
        .replace("m", minute)
        .replace("s", second);
    }
    
    
}