import React, { FC } from 'react';

interface ISchedulleButton {
    text: string,
    color : string,
    onClick : (event: React.MouseEvent<HTMLElement>) => void
}

const SchedulleButon : FC<ISchedulleButton> = ({text , color, onClick}) => {
    return (<div style={{ backgroundColor : color, 
    width: '25%', height:15, 
    display:'inline-block', 
    fontSize:10, 
    border:'1px solid rgba(0, 0, 0, 0.05)',
    marginLeft:5, marginRight:5}} onClick={onClick}>
        {text}
    </div>);
}

export default SchedulleButon;