const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export declare interface Calendars {
    year: number,
    month: number,
    day: number,
    ymd: string,
    disabled: boolean,
    type: string,
    timeNode: string,
    week: number
}

export declare interface OutCalendar {
    year: number,
    month: number,
    minDate?: string,
    maxDate?: string,
    disabled?: (value?:string) => boolean,
    endType?: string,
    startWeek?: number
}

/**
 * @description 获取当前日期是星期几
 * @param value 日期 yyyy-mm-dd 格式
 */
export function getWeek (value: string): number {
    return new Date(value.replace(/-/ig, '/')).getDay()
}
/**
 * @description 输出日历数组
 * @param value 当前月份
 */
export function outCalendar (value: OutCalendar): Calendars[] {
    const disabled = value.disabled || function () { return false }
    const date:Date = new Date(`${value.year}/${value.month}/1`) // 获取1号的Date
    const isLeapYear = value.year % 4 === 0 // 是否为润年
    let days = monthDays[value.month - 1]
    let dayWeek:number = date.getDay()

    if (isLeapYear && value.month === 2) {
        days = 29
    }
    let prev = getPrevMonth(value.year, value.month, dayWeek, value.startWeek, disabled)
    const now:Calendars[] = []
    for (let i = 1; i <= days; i++) {
        const item: Calendars = {
            year: value.year,
            month: value.month,
            day: i,
            week: dayWeek,
            ymd: `${value.year}-${fixedZero(value.month)}-${fixedZero(i)}`,
            disabled: disabled(`${value.year}-${fixedZero(value.month)}-${fixedZero(i)}`),
            timeNode: 'last',
            type: 'current'
        }
        now.push(item)
        dayWeek = calcNextWeek(dayWeek)
    }

    prev = prev.concat(now)

    const newday = prev[prev.length - 1]
    let lastNum = 42 - prev.length
    if (value.endType === 'end') {
        lastNum = 7 - prev.length % 7
    }

    if (value.endType === null) {
        lastNum = 0
    }
    const last = calcNextMonth(newday.year, newday.month, newday.week, lastNum, disabled)
    return prev.concat(last)
}

/**
 * 计算下一天星期几
 * @param {Number} next 0~6
 */
export function calcNextWeek (next:number):number {
    if (next === 6) return 0
    return next + 1
}
// 计算下个月填充所有内容 将行数填充为6行
export function calcNextMonth (year:number, month:number, dayWeek:number, num:number, disabled:(value:string)=>boolean):Calendars[] {
    if (num === 0) return []
    let _year = year
    let _month = month + 1
    let _dayWeek = calcNextWeek(dayWeek)
    const arr = []
    if (month === 12) {
        // 如果是星期日直接返回空数组
        _month = 1
        _year = year + 1
    }
    for (let i = 1; i <= num; i++) {
        const item: Calendars = {
            year: _year,
            month: _month,
            day: i,
            week: _dayWeek,
            ymd: `${_year}-${fixedZero(_month)}-${fixedZero(i)}`,
            disabled: disabled(`${_year}-${fixedZero(_month)}-${fixedZero(i)}`),
            timeNode: 'last',
            type: 'next'
        }
        arr.push(item)
        _dayWeek = calcNextWeek(_dayWeek)
    }
    return arr
}

/**
 * 计算上个月填充当月
 * @param {String,Number} year 当前年
 * @param {String,Number}  month 当前月份
 * @param {String,Number}  dayWeek 当前日期的星期几0~6
 * @param {String,Number} beginOrder 0-6 0是星期日，1是星期一
 */
export function getPrevMonth (year:number, month:number, dayWeek:number, beginOrder = 0, disabled:(value:string)=>boolean):Calendars[] {
    let _year = year
    let _month = month - 1
    if (dayWeek === 0 && beginOrder === 0) {
        // 如果是星期日直接返回空数组
        return []
    }
    if (dayWeek === 1 && beginOrder === 1) {
        // 如果是星期日直接返回空数组
        return []
    }
    if (dayWeek === 0 && beginOrder === 1) {
        dayWeek = 7
    }
    // 如果是一月份上一个月是上一年12月份
    if (month === 1) {
        _year = year - 1
        _month = 12
    }
    const isLeapYear: boolean = _year % 4 === 0 // 是否为润年
    let lastDay = monthDays[_month - 1]
    // 如果是润年的2月分为29天
    if (isLeapYear && month === 2) {
        lastDay = 29
    }
    const arr = []
    for (let i = dayWeek - (1 + beginOrder); i >= 0; i--) {
        let week = i
        if (beginOrder === 1) {
            week = i + 1
            if (week === 7) {
                week = 0
            }
        }
        const item: Calendars = {
            year: _year,
            month: _month,
            day: lastDay,
            week,
            ymd: `${_year}-${fixedZero(_month)}-${fixedZero(lastDay)}`,
            disabled: disabled(`${_year}-${fixedZero(_month)}-${fixedZero(lastDay)}`),
            timeNode: 'last',
            type: 'prev'
        }
        arr.unshift(item)
        lastDay--
    }
    return arr
}
function fixedZero (i:number | string) {
    return i >= 10 ? i : `0${i}`
}
