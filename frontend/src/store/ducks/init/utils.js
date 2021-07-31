export const reduceSettings = (state, action) => {
    if (!action.error && action.payload) {
        return action.payload.data.data[0].attributes;
    }
    return null;
};