export function formatDate(date) {
    var dateObj = new Date(date);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return year + "-" + month + "-" + day;
}