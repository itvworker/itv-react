import objectAssign from 'object-assign'

export default function ($vm, options) {
    const defaults = {}
    for (let i in $vm.$options.props) {
        if (i !== 'value') {
            if( (typeof $vm.$options.props[i].default).toString() === 'function') {
                defaults[i] = $vm.$options.props[i].default()
               
            }else{
                defaults[i] = $vm.$options.props[i].default
            }
        }
    }
    const _options = objectAssign({}, defaults, options)
    for (let i in _options) {
        $vm[i] = _options[i]
    }
}
