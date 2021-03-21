
import './index.less';
export default function Header(props) {
    return (
        <div className="itv-header">
            <div className="itv-icon-arrow"></div>
            {props.title}
            {props.children}
        </div>
    )
}

