export const selectEntityById = (id, entities) => {
    return id && entities ? entities[id] : null;
};

export const selectEntitiesByIds = (ids, entities) => {
    return ids && entities ? ids.map((id) => entities[id]).filter((entity) => !!entity) : [];
};
