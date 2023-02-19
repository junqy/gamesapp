export default function convertDate(dateString) {
    var date = new Date(dateString);
    return (
        date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
}
