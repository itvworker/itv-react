/**
 * @description 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
 * @param startx 开始点
 * @param starty 开始点
 * @param endx 结束点
 * @param endy 结束点
 * @param show 是否开启
 * @returns
 */
export default function (startx:number, starty:number, endx: number, endy: number, show?:boolean):any {
    const angx = endx - startx
    const angy = endy - starty
    let type = 0
    // 如果滑动距离太短
    if (Math.abs(angx) < 1.5 && Math.abs(angy) < 1.5 && !show) {
        return {
            type,
            angx,
            angy
        }
    }
    const angle = getAngle(angx, angy)
    if (angle >= -135 && angle <= -45) {
        type = 1
    } else if (angle > 45 && angle < 135) {
        type = 2
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        type = 3
    } else if (angle >= -45 && angle <= 45) {
        type = 4
    }
    return {
        type,
        angx,
        angy
    }
}

// 获得角度
function getAngle (angx:number, angy:number) {
    return (Math.atan2(angy, angx) * 180) / Math.PI
}
