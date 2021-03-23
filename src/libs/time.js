export default {
    /**
     * 
     * @param {Number} start 开始时 
     * @param {Number} end  结束时
     * @param {Boolean} cover 是否要补够两位数
     * @param {Boolean} type  是否分上下午
     * @returns 
     */
    getHour(start, end, cover=true, type) {
        if(!type) {
            let arr = [];
            for(let i = start; i <= end; i++) {
                let time = i;
                if(cover) {
                    time = this.gt(i)
                }
                arr.push({
                    id: time,
                    value: time,
                    name: time  
                })
            }
            return arr;
        }

        let arr = [];
        for(let i = start; i <= end; i++) {
            let index = i%12;
            let time = index||12;
            if(cover) {
                time = this.gt(i)
            }
            let isAm = 'AM'
            if(i >= 12) {
                isAM ="PM"
            }
            arr.push({
                id: isAm+time,
                value: isAm+time,
                name: time 
            })
        }
        return arr;

    },
    gt(value) {
        if(value <= 9) {
            return '0'+value;
        }
        return value.toString()
    },
    /**
     * 
     * @param {Number} start 开始分钟
     * @param {Number} end 结束分钟
     * @param {Number} step 间隔
     * @param {Boolean} cover 是否补足两位 
     * @returns 
     */
    getMinute(start, end, step=1, cover=true) {
        let arr = [];
        for(let i = start; i <= end; i++) {
            let index = i%step;
            if(index!==0) continue;
            let time = i;
            if(cover) {
                time = this.gt(i)
            }
           
            arr.push({
                id: time,
                value: time,
                name: time 
            })
        }
        return arr;
    }
}