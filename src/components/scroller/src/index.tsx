import type { ScrollerProps } from './type'
function Scroller(props:ScrollerProps) {

    return (
        <div className="it-scroller">
        <div className="it-scroller-content">
            <div className="it-scroller-touch" ref="elScroller">
                <div className="pull-top" v-if="pullDown" ref="elPull">
                   
                </div>

                <div className="itv-scroller-msg">
                    {props.children}
                </div>
            </div>
        </div>
    </div>
        
    )
}
export default Scroller