'use strict';
const QClient = require('@nmq/q/client');
/**
 * class for mongo-model for teams and players
 */
class Model {
  /**
   * model schema
   * @param {*} schema
   */
  constructor(schema) {
    this.schema = schema;
  }
  /**
   * model for get
   * @param {*} _id
   */
  get(_id) {
    console.log('getting things');
    let queryObject = _id ? { _id } : {};
    QClient.publish('database', 'read', { action: 'get' });
    return this.schema.find(queryObject);
  }
  /**
   * model for post
   * @param {*} record
   */
  post(record) {
    let newRecord = new this.schema(record);
    QClient.publish('database', 'create', { action: 'post' });
    return newRecord.save();
  }
  /**
   * model for put
   * @param {*} _id
   * @param {*} record
   */
  put(_id, record) {
    QClient.publish('database', 'update', { action: 'put', id: _id });
    return this.schema.findByIdAndUpdate(_id, record, {
      new: true,
      upsert: true
    });
  }
  patch(_id, record) {
    QClient.publish('database', 'update', { action: 'patch', id: _id });
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }
  /**
   * model for delete
   * @param {} _id
   */
  delete(_id) {
    QClient.publish('database', 'delete', { action: 'delete', id: _id });
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;
