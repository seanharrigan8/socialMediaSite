
const dateFormat = (createdAtVal) => {
    return `${new Date(createdAtVal).getMonth() + 1}/${new Date(createdAtVal).getDate()}/${new Date(createdAtVal).getFullYear()} at ${new Date(createdAtVal).getHours()}:${new Date(createdAtVal).getMinutes()}`
};

module.exports = dateFormat;