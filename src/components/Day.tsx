import React, { FC, useState } from 'react';
import SchedulleButton from './SchedulleButton';

export interface IDay{
    day : number,
    active : boolean,
    dayOfWeek : number,
    hideButtons : boolean
}

export const Day : FC<IDay> = (callendarDay: IDay) =>{
    const [color, setColor] = useState<string>('white');
    const [text, setText] = useState<string>('');
    const [hour, setHour] = useState<string>('')
    const [hasBeenSet, setHasBeenSet] = useState<boolean>(false);

    const setSchedulle = (place : string, color : string, hour : string) => {
        setColor(color);
        setText(place);
        setHour(hour);
        setHasBeenSet(true);
    }
    const setZaspaMorning = () => {

        setSchedulle("Zaspa", "#F2C49E", "08:00")
    }
    const setZaspaNight = () => {
        setSchedulle("Zaspa", "#C7F29E", "20:00")
    }
    const setRCKMorning = () => {
        setSchedulle("RCKiK", "#9EF2EE", "08:00");
    }
    const setRCKNight = () => {
        setSchedulle("RCKiK", "#EE9EF2", callendarDay.dayOfWeek === 5 || callendarDay.dayOfWeek === 6 ? "20:00" : "19:15");
    }
    const reset = () => {
        setColor("");
        setText("");
        setHour("");
        setHasBeenSet(false);
    }
    return (
            <>
                <div style=
                {{textAlign:'center', width : 150, height : 120, display:'inline-block', border: '1px solid rgba(0, 0, 0, 0.05)',
                    color: callendarDay.active ? 'black' : 'gray', backgroundColor: color, position:'relative', fontSize:26}}> 
                    {callendarDay.day}
                    <br/>
                    {text === '' && <br/>}
                    {text}
                    <br/>  
                    {hour}
                    {!callendarDay.hideButtons && 
                   <>
                        {!hasBeenSet ? <div style={{position:'absolute',bottom:20}}>
                            <SchedulleButton text='ZR' color = 'white' onClick={setZaspaMorning}/>
                            <SchedulleButton text='ZN' color = 'white' onClick={setZaspaNight}/>
                            <SchedulleButton text='WR' color = 'white' onClick={setRCKMorning}/>
                            <SchedulleButton text='WN' color = 'white' onClick={setRCKNight}/>
                        </div> : 
                        <div style={{position:'absolute',bottom:10}}>
                            <div style={{width:20, height:20}} onClick={reset}>X</div>
                        </div>}
                    </>
                    }
                </div>
            </>
        );
};

//export default Day;