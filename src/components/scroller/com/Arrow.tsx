export default function Arrow(props) {
    let {fillColor} = props;
    if(!fillColor) {
        fillColor ='#aaa'
    }
    return (
        <svg viewBox="0 0 63.657 63.657" style={{'enableBackground':'new 0 0 63.657 63.657'}}  width="512px" height="512px">
        <g>
            <g>
                <g>
                    <g>
                        <polygon points="31.891,63.657 0.012,35.835 2.642,32.821 31.886,58.343 61.009,32.824 63.645,35.832" fill={fillColor}/>
                    </g>
                </g>
                <g>
                    <g>
                        <rect x="29.827" width="4" height="60" fill={fillColor}/>
                    </g>
                </g>
            </g>
           
        </g>
    </svg>
    )
}