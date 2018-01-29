export function handleDateFormat(date) {
    const myDate = date || '';
    if (myDate) {
        let time = myDate.split('-');
        switch (time[1]) {
            case '01': time[1] = 'January'; break;
            case '02': time[1] = 'February'; break;
            case '03': time[1] = 'March'; break;
            case '04': time[1] = 'April'; break;
            case '05': time[1] = 'May'; break;
            case '06': time[1] = 'June'; break;
            case '07': time[1] = 'July'; break;
            case '08': time[1] = 'August'; break;
            case '09': time[1] = 'September'; break;
            case '10': time[1] = 'October'; break;
            case '11': time[1] = 'November'; break;
            case '12': time[1] = 'December'; break;
        }
        return time[2] + " " + time[1] + " " + time[0];
    }
    return myDate;
}