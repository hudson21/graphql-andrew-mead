
const add = (num1, num2) => {
    return `The result of adding is ${num1 + num2}`;
};

const substract = (arg1, arg2) => {
    return `The result of substracting is ${arg1 - arg2}`;
};

export { substract, add as default };