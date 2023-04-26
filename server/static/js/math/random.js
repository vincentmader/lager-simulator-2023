export const random_choice = (choices) => {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

export const random_randint = (min, max) => {
    // NOTE: The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
