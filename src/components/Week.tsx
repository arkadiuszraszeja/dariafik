import React, { FC, useEffect, useState } from 'react';
import IWeek from '../models/week';
import { Day } from './Day';

const Week : FC<IWeek> = (week : IWeek) =>{
    return (<div style={{whiteSpace:"nowrap"}}>
        {week.days.map((x, index) => {
            return (<Day day={x.day} active={x.active} dayOfWeek={x.dayOfWeek} key={index} hideButtons={x.hideButtons}/>)
        })}
    </div>);
}

export default Week;