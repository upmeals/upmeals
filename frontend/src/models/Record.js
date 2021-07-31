import _ from "lodash";

export class Record {
  constructor({ id, type, attributes = {}, relationships = {} }, state) {
    const self = this;

    self.id = id;
    self.type = type;
    self.attributes = attributes;
    self.relationships = relationships;

    // Set Attributes
    Object.keys(attributes).forEach(
      (key) => (self[_.camelCase(key)] = attributes[key])
    );

    // Set Related Records as attributes
    Object.keys(relationships).forEach((key) => {
      const camelKey = _.camelCase(key);
      const value = relationships[key].data;
      self[camelKey] = value;
      self[`has${_.upperFirst(camelKey)}`] = () => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return Boolean(relationships[key].data);
      };
    });
  }

  toString() {
    return `[Record: type=${this.type} id=${this.id}]`;
  }
}

export default Record;