export default function (content: HTMLElement) {
    const global:any = window
    const docStyle = document.documentElement.style

    let engine = 'webkit'
    const nav:any = navigator
    if (global.opera && Object.prototype.toString.call(global.opera) === '[object Opera]') {
        engine = 'presto'
    } else if ('MozAppearance' in docStyle) {
        engine = 'gecko'
    } else if ('WebkitAppearance' in docStyle) {
        engine = 'webkit'
    } else if (typeof nav.cpuClass === 'string') {
        engine = 'trident'
    }

    const vender: any = {
        trident: 'ms',
        gecko: 'Moz',
        webkit: 'Webkit',
        presto: 'O'
    }
    const vendorPrefix: string = vender[engine] || 'Webkit'
    const helperElem = document.createElement('div')

    const perspectiveProperty:any = `${vendorPrefix}Perspective`
    const transformProperty:any = `${vendorPrefix}Transform`

    if (helperElem.style[perspectiveProperty] !== 'undefind') {
        return function (left:number, top:number, zoom:number) {
            content.style[transformProperty] = `translate3d(${-left}px, ${-top}px,0) scale(${zoom})`
        }
    } else if (helperElem.style[transformProperty] !== 'undefind') {
        return function (left:number, top:number, zoom:number) {
            content.style[transformProperty] = `translate3d(${-left}px, ${-top}px,0) scale(${zoom})`
        }
    } else {
        return function (left:number, top:number, zoom:number) {
            content.style.marginLeft = left ? `${-left / zoom}px` : ''
            content.style.marginTop = top ? `${-top / zoom}px` + 'px' : ''
        }
    }
}
