const isCollection = (collection): boolean =>
    collection.collection_id !== null;

export const getCollectionKey = (collection): string =>
    (isCollection(collection)
        ? collection.collection_id
        : collection.thumbnail_inscriptions?.[0]?.id) ?? '';


        export const filterIncriptionItems = (incriptionList, brc20Transfer) => {
            if (!brc20Transfer || brc20Transfer.length === 0) {
                return incriptionList;
            }
        
            const filterIds = new Set(brc20Transfer.map(item => item.id));
        
            return incriptionList.filter(item =>
                !filterIds.has(item.collection_id) && // Exclude if collection_id is in filterIds
                !(Array.isArray(item.thumbnail_inscriptions) && filterIds.has(item.thumbnail_inscriptions[0]?.id)) // Exclude if first thumbnail_inscriptions id is in filterIds
            );
        };
        


