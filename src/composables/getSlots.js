
// Function that Convere String Hour to Integer value (13:45 -> 1345)
const converteStringHourToInteger = (hour) => {
    var arr = hour.split(':');
    var dec = parseInt((arr[1]/6)*10, 10);

    var result = parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec) * 100
    
    var check = getHour(result).split(':');

    if(!(check[1] == arr[1])){
        result += 1
    }

    return result;
}

// Function to converte minutes to number value for calculating slots
// 15 minutes = 25% from an hour so it will return number 25
const minutesToNumber = (minutes) => {
    return (minutes / 60 ) * 100
}

// Function to caculate amount of slots that will be needed
//  For exmpale: if the start hour is 08:00 and end its 10:00
//  And the time unit is 15 minutes than the slots amount is 8 (8 times of 15 minutes between start and end)
const slotsAmount = (startC, endC, timeC) => {
    return (endC - startC) / timeC
}

// Function to converte from decimal number to String hour
// '8.25' -> "08:15"
function getHour(n) {
    var xyz = ( n / 100 )
    var decimalTimeString = xyz ;
    var decimalTime = parseFloat(decimalTimeString);
    decimalTime = decimalTime * 60 * 60;
    var hours = Math.floor((decimalTime / (60 * 60)));
    decimalTime = decimalTime - (hours * 60 * 60);
    var minutes = Math.floor((decimalTime / 60));
    decimalTime = decimalTime - (minutes * 60);
    
    if(hours < 10){
        hours = "0" + hours;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }

    return "" + hours + ":" + minutes; 
}

function fillArrayWithValues(start, end, time) {

    var arr = []

    // Converte start and end time to integer number (08:00 -> 800 | 11:30 -> 1130)
    var _start = converteStringHourToInteger(start);
    var _end = converteStringHourToInteger(end);

    // Get time unit in integer (15 Minutes = 25)
    var _time = minutesToNumber(time);

    // Calculate slots numbers
    var _slotsNumber = slotsAmount(_start, _end, _time);

    // Fill the array currently
    for (let x = 0; x < _slotsNumber; x++) {
        // Create new appointments array
        let _appoinment = {
            'id': x,
            'start': getHour(_start),
            'end': getHour(_start + _time),
            'userId': null,
        };
        // Add the current appointment to array
        arr[x] = _appoinment;

        _start = _start + _time;
    }

    return arr
}

// Get Slots function
const getSlots = (start, end, time) => {
    
    return fillArrayWithValues(start, end, time)   
}

// Export default
export default getSlots