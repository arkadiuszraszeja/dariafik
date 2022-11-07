import html2canvas from 'html2canvas';
import React, { ChangeEventHandler, DetailedHTMLProps, ReactInstance, RefObject, SelectHTMLAttributes, useRef, useState } from 'react';
import './App.css';
import Calendar from './components/Calendar'

function App() {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const [currentMonth, setCurrentMonth] = useState<number>(month);
  const [currentYear, setCurrentYear] = useState<number>(year);
  const [hideButtons, setHideButtons] = useState<boolean>(false);
  const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
  const onMonthChange = (event: any) => {
    setCurrentMonth(Number(event.target.value) + 1)
    return null;
  }
  const print = async () =>{
    setHideButtons(true);
    setHideButtons(true);
    const element = document.getElementById('print');
    if(element== null) return;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');
 
    link.href = data;
    link.download = `${currentMonth}.${currentYear}.jpg`;
 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const hide = () =>{
    setHideButtons(!hideButtons)
  }  

  const onCurrentYearChange = (event :any) => {
      let value = event.target.value;
      if(!isNaN(value)) setCurrentYear(Number(value))
  }

  return (
    <div className="App">
        <input defaultValue={currentYear} onChange={onCurrentYearChange} style={{display:"block"}}/>
        <select defaultValue={currentMonth} onChange={onMonthChange} style={{display:"block"}}>          
          {months.map((x, index) => {
            return (<option value={index} key={index}>{x}</option>);
          })}
        </select>
        <button onClick={print} style={{display:"block"}}>
          Export As JPEG
        </button>
        <button onClick={hide} style={{display:"block"}}>
          hide buttons
        </button>
        <Calendar month={currentMonth} year={currentYear} monthName={months[currentMonth-1]} hideButtons={hideButtons}></Calendar>
    </div>
  );
}

export default App;
