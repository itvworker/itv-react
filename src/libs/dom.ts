interface Position {
    x: number,
    y: number
}
// 根据类名向上查找父元素
export function getClassDom (target: any, className: string): any {
    let classNames:string[] = target.className.split(' ')
    let eleName:string = target.nodeName
    let ele:any
    while (true) {
        if (classNames.indexOf(className) >= 0) {
            ele = target
            break
        }
        if (eleName === 'BODY') {
            break
        }
        target = target.parentElement
        classNames = target.className.split(' ')
        eleName = target.nodeName
    }

    return ele
}

export function getStyle (dom: any): any {
    return window.getComputedStyle ? window.getComputedStyle(dom, null) : dom.currentStyle
}

export function getParentDom (startDom: any, endDom: any): any {
    const arr:any = []
    while (true) {
        if (endDom === startDom || startDom.nodeName === 'BODY') {
            break
        }
        arr.push(startDom)
        startDom = startDom.parentElement
    }
    return arr
}
/**
 * @description 获取相对鼠标相对dom元素的位置，
 */
export function getMouseRelative (dom: HTMLElement, e: MouseEvent): Position {
    const parent: HTMLElement[] = getParentDom(e.target, dom)
    const pos:Position = {
        x: e.offsetX,
        y: e.offsetY
    }
    parent.forEach((item:HTMLElement) => {
        pos.x += item.offsetLeft
        pos.y += item.offsetTop
    })
    return pos
}
