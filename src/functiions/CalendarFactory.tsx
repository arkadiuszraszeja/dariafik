import { IDay } from "../components/Day";
import IWeek from "../models/week";

export function getWeeks(month : number, year : number){
    const days = getCalendar(month, year);
    let weeks : IWeek[] = [];
    const noOfWeeks = days.filter(x => x.dayOfWeek === 1).length;
    for(let i = 0; i < noOfWeeks; i++){
        let tillDay = (i+1) * 7 >= days.length ? days.length : (i+1) * 7;
        let week : IWeek =  {days: days.slice(i * 7, tillDay)}
        weeks.push(week);
    }

    return weeks;
}

export default function getCalendar(month : number, year : number) {
    let firstDay: Date = getFirstDay(month, year);
    let results: IDay[] = getInactive(firstDay);
    
    let lastDay = getLastDay(month, year);
    
    for(let i = 1; i <= lastDay; i++){
        let day :IDay = {day : i, active : true, dayOfWeek : getDayOfTheWeek(i, month - 1, year), hideButtons:false};
        results.push(day);
    }

    return results
}

function getNumberOfInactive(firstDay : Date){
    if(firstDay.getDay() === 0) return 6;

    return firstDay.getDay()-1;
}

function getInactive(firstDay : Date){
    let results = [];
    let noOfInactive = getNumberOfInactive(firstDay);
    let lastDate =getLastDayOfPreviousMonth(firstDay.getMonth(), firstDay.getFullYear());

    let firstDate = lastDate - noOfInactive + 1;
    let index = 0;
    for(let i = firstDate; i <= lastDate; i++){
        let day :IDay = {day : i, active : false, dayOfWeek :  ++index, hideButtons:false};
        results.push(day)
    }

    return results;
}

function getLastDayOfPreviousMonth(month : number, year : number){
    console.log("getLastDayOfPreviousMonth");
    console.log(month);
    console.log(year);

    if(month == 0) return getLastDay(12, year - 1);
    return getLastDay(month, year);
}

function getLastDay(month : number, year : number){
    console.log("getLastDay");
    console.log(month);
    console.log(year);
    console.log(new Date(year, month, 0));
    console.log(new Date(year, month, 0).getDate());

   return new Date(year, month, 0).getDate();
}

function getFirstDay(month : number, year : number){
    return new Date(year, month - 1, 1);
}

function getDayOfTheWeek(day: number, month : number, year : number){
    let date : Date = new Date();
    date.setFullYear(year, month, day);
    return date.getDay();
}