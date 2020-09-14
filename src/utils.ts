function getProperty(obj: any, keys: string[]): any {
    let property = obj;

    for (const key of keys) {
        property = property[key] || {};
    }

    return property;
}