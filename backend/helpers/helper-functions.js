function generateRandomId() {
    let text = '';
    let possible = 'ABCDEFGHIJKMNPQRSTUVWXYZ23456789';

    for (let i = 0; i < 15; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

module.exports = {
    generateRandomId
};