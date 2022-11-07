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
    if(firstDay.getDay() == 0) return 6;

    return firstDay.getDay()-1;
}

function getInactive(firstDay : Date){
    let results = [];
    let noOfInactive = getNumberOfInactive(firstDay);
    let lastDate = getLastDay(firstDay.getMonth() - 1, firstDay.getFullYear());
    let firstDate = lastDate - noOfInactive + 1;
    let index = 0;
    for(let i = firstDate; i <= lastDate; i++){
        let day :IDay = {day : i, active : false, dayOfWeek :  ++index, hideButtons:false};//getDayOfTheWeek(i, firstDay.getMonth() - 1, firstDay.getFullYear())};
        results.push(day)
    }

    return results;
}

function getLastDay(month : number, year : number){
   let day : Date = getFirstDay(month -1 , year);
   day.setDate(day.getDate() - 1);

   return day.getDate();
}

function getFirstDay(month : number, year : number){
    let firstDay: Date = new Date();
    firstDay.setFullYear(year, month - 1, 1);
    return firstDay;
}

function getDayOfTheWeek(day: number, month : number, year : number){
    let date : Date = new Date();
    date.setFullYear(year, month, day);
    return date.getDay();
}