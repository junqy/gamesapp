function convertDate(dateString) {
    var date = new Date(dateString);
    return (
        date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
}

function calculateHours(date) {
    const result = Math.abs(Date.now() - new Date(date)) / 36e5
    const dateRes = convertDate(date)
    if (result < 1) {
        return "Kilka minut temu"
    } else if (result < 24) {
        return result.toFixed(0) + " godzin temu"
    } else if (result < 48) {
        return "1 dzień temu"
    } else if (result < 168) {
        return "Kilka dni temu"
    } else if (result < 336) {
        return "Tydzień temu"
    } else if (result < 400) {
        return "Dwa tygodnie temu"
    } else if (result < 720) {
        return "Kilka tygodni temu"
    } else if (result < 1440) {
        return "Miesiąc temu"
    } else if (result < 2000) {
        return "Kilka miesięcy temu"
    } else if (result < 3000) {
        return dateRes
    }
    
}

export { convertDate, calculateHours }

