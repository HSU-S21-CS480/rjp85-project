import moment from 'moment';

export const calculateTime = (date) => {
    const now = moment()
    const days = now.diff(date, "days")
    const weeks = now.diff(date, "weeks")
    var result = ""; 
    if (days == 0) {
        result = " today"
    } else if (days > 0 && days < 7) {
        result = days + " days ago"
    } else if (days == 7 || (days > 7 && days < 14)) {
        result = "one week ago"
    } else {
        result = weeks + " weeks ago"
    }
    return result;
}

export const getDate = (date) => { 
    const formatted = moment(date).format("YYYY/MM/DD"); 
    return formatted
}