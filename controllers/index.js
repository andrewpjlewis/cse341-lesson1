const awesomeFunction = (req, res, next) => {
    res.json('Saige Lewis');
};

const anotherPerson = (req, res, next) => {
    res.json('Andrew Lewis');
};

module.exports = { awesomeFunction, anotherPerson };