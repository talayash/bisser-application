const timestampToDate = (timestamp) => {
    // Create date with the timestamp
    let date = new Date(timestamp*1000);

    // Get the day
    let day = date.getDate()
    
    if(day < 10){
      day = '0' + day
    }
    
    // Get the month
    let month = (date.getMonth() + 1)
    
    // Check the digits and add zero if need for month
    if(month < 10){
      month = '0' + month
    }

    // Get year
    let year = (date.getFullYear()-1969)

    // Return result
    return day + "/" + month + "/" + year
}

const getTimestampDate = () => {
    return { timestampToDate }
}

export default getTimestampDate