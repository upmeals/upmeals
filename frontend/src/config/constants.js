export const todosApiHost = window.location.protocol + "//api." + new RegExp('[a-z-0-9]{2,63}.[a-z.]{2,5}$').exec(window.location.hostname)[0]

export const servicesMap = {
    todos: todosApiHost,
}

export const languages = [
    ["fr", "language__french"],
];
