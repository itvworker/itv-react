export default function (content, group, maxHeight) {
       
    if(!maxHeight){
        return
    }
    var global = window;
   
    var docStyle = document.documentElement.style;

    var engine;
    if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
        engine = 'presto';
    } else if ('MozAppearance' in docStyle) {
        engine = 'gecko';
    } else if ('WebkitAppearance' in docStyle) {
        engine = 'webkit';
    } else if (typeof navigator.cpuClass === 'string') {
        engine = 'trident';
    }

    var vendorPrefix = {
        trident: 'ms',
        gecko: 'Moz',
        webkit: 'Webkit',
        presto: 'O'
    }[engine];

    var helperElem = document.createElement("div");
    var undef;

    var perspectiveProperty = vendorPrefix + "Perspective";
    var transformProperty = vendorPrefix + "Transform";

    if (helperElem.style[perspectiveProperty] !== undef) {
       
        return function(height) {
            content.style[transformProperty] = 'translate3d(0,0,0) scaleY(' + height/maxHeight + ')';
            content.children[0].style[transformProperty] = 'translate3d(0,0,0) scaleY(' + maxHeight/height + ')'
            group.style[transformProperty] = 'translate3d(0,'+(height-maxHeight)+'px,0)';
        };

    } else if (helperElem.style[transformProperty] !== undef) {
        
        return function(left, top, zoom) {
            content.style[transformProperty] = 'translate(0,0） scale(' + height/maxHeight + ')';
            content.children[0].style[transformProperty] = 'translate(0,0) scaleY(' + maxHeight/height + ')'
            group.style[transformProperty] = 'translate(0,'+(height-maxHeight)+'px)';
            
        };

    } else {
       
        return function(left, top, zoom) {
            content.style.marginLeft = left ? (-left/zoom) + 'px' : '';
            content.style.marginTop = top ? (-top/zoom) + 'px' : '';
            content.style.zoom = zoom || '';
        };

    }
}

