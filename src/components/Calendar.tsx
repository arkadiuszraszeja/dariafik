import React, { FC, useEffect, useState } from 'react';
import { getWeeks } from '../functiions/CalendarFactory';
import IWeek from '../models/week';
import Week from './Week';

interface ICalendar {
    month : number,
    year : number,
    monthName : string,
    hideButtons : boolean
}

const Calendar : FC<ICalendar> = (calendar : ICalendar) => {
    useEffect(() => {
        setWeeks(getWeeks(calendar.month, calendar.year))}
        , [calendar.month, calendar.year]);

        useEffect(() => {
            let weeksCopy = weeks;
            weeksCopy.forEach(x => {
                x.days.forEach(y => y.hideButtons = calendar.hideButtons)
            })
            setWeeks(weeksCopy)}
            , [calendar.hideButtons]);

    const [weeks, setWeeks] = useState<IWeek[]>(getWeeks(calendar.month, calendar.year))
    const daysOfTheWeek = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];

    return (<div style={{marginLeft:20, marginTop:20, width:1100, paddingLeft:35, paddingBottom:30}} id="print">
        <div style={{width:1050, fontSize:28, verticalAlign:"middle", marginBottom:"5px"}}><b>{calendar.monthName.toUpperCase()}</b></div>

        <div style={{textAlign:'left'}}>
            <div>
        {daysOfTheWeek.map((x,index) => {
            return (
                <div style=
                {{textAlign:'center', width : 150, height : 40, display:'inline-block', border: '1px solid rgba(0, 0, 0, 0.05)',
                    backgroundColor: "silver", position:'relative', fontSize:26}} key={index}>
                        {x}
                </div>
            );
        })}
        </div>
    {weeks.map((x, index) => {
        return (
            <Week days={x.days} key={index}/>)
    })}
    </div>
    </div>)
}

export default Calendar;