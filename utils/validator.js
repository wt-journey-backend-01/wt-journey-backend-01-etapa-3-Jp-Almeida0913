function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    const now = new Date();
    return !isNaN(date) && date <= now;
}

module.exports = {
    isValidDate
};