/**
 * 格式化时间
 * @param {String,Number} arg 时戳或日期字符串
 * @param {String} format 格式化的时间 Y：年 M:月 D:日 h：时 m:分 s:秒
 */
export function formatDate (arg: Date | string | number = '', format = 'yyyy-MM-dd hh:mm', timezone:number | null = null) {
    // console.log(typeof arg.toString());
    if (typeof arg === 'string') {
        arg = arg.replace(/-/ig, '/');
        if (arg.indexOf('/') < 0 && arg) {
            arg = parseInt(arg);
        }
        if (arg.length === 7 && arg.indexOf('/') === 4) {
            arg = arg + '/01';
        }
    }
    let now = '';
    if (!arg) {
        now = new Date();
    } else {
        now = new Date(arg);
    }
   
    // 如果有传时区的话，按时区时间来格式化
    if (timezone !== null) {
        let offset = now.getTimezoneOffset() * 60000;
        if (offset >= 0) {
            timezone = timezone < 0 ? (-12 - timezone) : timezone;
        } else {
            timezone = timezone < 0 ? (12 - timezone) : timezone;
        }
        let zonetime = now.getTime() + offset; // 转换成0时区时间
        console.log(now.getTime());
        console.log(zonetime);
        console.log(zonetime + (timezone * 3600000));
        now = new Date(zonetime + (timezone * 3600000));
    }
  
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    month = month >= 10 ? month : '0' + month;
    var date = now.getDate();
    date = date >= 10 ? date : '0' + date;
    var hour = now.getHours();
    hour = hour >= 10 ? hour : '0' + hour;
    var minute = now.getMinutes();

    minute = minute >= 10 ? minute : '0' + minute;
    var second = now.getSeconds();
    second = second >= 10 ? second : '0' + second;
    return format
        .replace('yyyy', year)
        .replace('MM', month)
        .replace('dd', date)
        .replace('hh', hour)
        .replace('mm', minute)
        .replace('ss', second)
        .replace('Y', year)
        .replace('M', month)
        .replace('D', date)
        .replace('h', hour)
        .replace('m', minute)
        .replace('s', second)
    ;
}
