const getEnumName = (enumObj, numCode) => {
     const entry = Object.entries(enumObj).find(([key, value]) => numCode === value);

     if (entry) {
        const [key] = entry;
        return key.toLowerCase().replace(/_/g, " ");
     }

     return null;
}

export default getEnumName;