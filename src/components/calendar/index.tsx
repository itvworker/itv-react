
import React from 'react';
export interface CalendarProps{
    name?: String
}

export interface CalendarStates{
    arr: (string | number)[]
}


class Calendar extends React.Component<CalendarProps, CalendarStates> {
    constructor(props:CalendarProps) {
        super(props);
        
        this.state = {
            arr: [12, 30, 14]
        }
    }
    render(){
        return <div>
                {this.props.name}
                <ul>
                    {
                    this.state.arr.map(item=>(
                        <li>{item}</li>
                    ))
                    }
                </ul>
            </div>
    }

}
export default Calendar