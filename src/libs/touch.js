//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
export default function(startx, starty, endx, endy, show) {
    var angx = endx - startx
    var angy = endy - starty
    var result = 0
    //如果滑动距离太短
    if (Math.abs(angx) < 1.5 && Math.abs(angy) < 1.5 && !show) {
        return result
    }
    var angle = getAngle(angx, angy)
    if (angle >= -135 && angle <= -45) {
        result = 1
    } else if (angle > 45 && angle < 135) {
        result = 2
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3
    } else if (angle >= -45 && angle <= 45) {
        result = 4
    }
    var data = {
        type: result,
        angx: angx,
        angy: angy,
    }
    return data
}

//获得角度
function getAngle(angx, angy) {
    return (Math.atan2(angy, angx) * 180) / Math.PI
}