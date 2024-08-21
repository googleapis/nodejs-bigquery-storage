/*eslint-disable n/no-extraneous-require, eqeqeq, block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
'use strict';

var $protobuf = require('protobufjs/minimal');

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {});

$root.CustomerRecord = (function () {
  /**
   * Properties of a CustomerRecord.
   * @exports ICustomerRecord
   * @interface ICustomerRecord
   * @property {string|null} [customerName] CustomerRecord customerName
   * @property {number|Long} rowNum CustomerRecord rowNum
   */

  /**
   * Constructs a new CustomerRecord.
   * @exports CustomerRecord
   * @classdesc Represents a CustomerRecord.
   * @implements ICustomerRecord
   * @constructor
   * @param {ICustomerRecord=} [properties] Properties to set
   */
  function CustomerRecord(properties) {
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * CustomerRecord customerName.
   * @member {string} customerName
   * @memberof CustomerRecord
   * @instance
   */
  CustomerRecord.prototype.customerName = '';

  /**
   * CustomerRecord rowNum.
   * @member {number|Long} rowNum
   * @memberof CustomerRecord
   * @instance
   */
  CustomerRecord.prototype.rowNum = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0;

  /**
   * Creates a new CustomerRecord instance using the specified properties.
   * @function create
   * @memberof CustomerRecord
   * @static
   * @param {ICustomerRecord=} [properties] Properties to set
   * @returns {CustomerRecord} CustomerRecord instance
   */
  CustomerRecord.create = function create(properties) {
    return new CustomerRecord(properties);
  };

  /**
   * Encodes the specified CustomerRecord message. Does not implicitly {@link CustomerRecord.verify|verify} messages.
   * @function encode
   * @memberof CustomerRecord
   * @static
   * @param {ICustomerRecord} message CustomerRecord message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  CustomerRecord.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.customerName != null &&
      Object.hasOwnProperty.call(message, 'customerName')
    )
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.customerName);
    writer.uint32(/* id 2, wireType 0 =*/ 16).int64(message.rowNum);
    return writer;
  };

  /**
   * Encodes the specified CustomerRecord message, length delimited. Does not implicitly {@link CustomerRecord.verify|verify} messages.
   * @function encodeDelimited
   * @memberof CustomerRecord
   * @static
   * @param {ICustomerRecord} message CustomerRecord message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  CustomerRecord.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a CustomerRecord message from the specified reader or buffer.
   * @function decode
   * @memberof CustomerRecord
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {CustomerRecord} CustomerRecord
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  CustomerRecord.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.CustomerRecord();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          message.customerName = reader.string();
          break;
        }
        case 2: {
          message.rowNum = reader.int64();
          break;
        }
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    if (!message.hasOwnProperty('rowNum'))
      throw $util.ProtocolError("missing required 'rowNum'", {
        instance: message,
      });
    return message;
  };

  /**
   * Decodes a CustomerRecord message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof CustomerRecord
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {CustomerRecord} CustomerRecord
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  CustomerRecord.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a CustomerRecord message.
   * @function verify
   * @memberof CustomerRecord
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  CustomerRecord.verify = function verify(message) {
    if (typeof message !== 'object' || message === null)
      return 'object expected';
    if (message.customerName != null && message.hasOwnProperty('customerName'))
      if (!$util.isString(message.customerName))
        return 'customerName: string expected';
    if (
      !$util.isInteger(message.rowNum) &&
      !(
        message.rowNum &&
        $util.isInteger(message.rowNum.low) &&
        $util.isInteger(message.rowNum.high)
      )
    )
      return 'rowNum: integer|Long expected';
    return null;
  };

  /**
   * Creates a CustomerRecord message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof CustomerRecord
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {CustomerRecord} CustomerRecord
   */
  CustomerRecord.fromObject = function fromObject(object) {
    if (object instanceof $root.CustomerRecord) return object;
    var message = new $root.CustomerRecord();
    if (object.customerName != null)
      message.customerName = String(object.customerName);
    if (object.rowNum != null)
      if ($util.Long)
        (message.rowNum = $util.Long.fromValue(object.rowNum)).unsigned = false;
      else if (typeof object.rowNum === 'string')
        message.rowNum = parseInt(object.rowNum, 10);
      else if (typeof object.rowNum === 'number')
        message.rowNum = object.rowNum;
      else if (typeof object.rowNum === 'object')
        message.rowNum = new $util.LongBits(
          object.rowNum.low >>> 0,
          object.rowNum.high >>> 0
        ).toNumber();
    return message;
  };

  /**
   * Creates a plain object from a CustomerRecord message. Also converts values to other types if specified.
   * @function toObject
   * @memberof CustomerRecord
   * @static
   * @param {CustomerRecord} message CustomerRecord
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  CustomerRecord.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.defaults) {
      object.customerName = '';
      if ($util.Long) {
        var long = new $util.Long(0, 0, false);
        object.rowNum =
          options.longs === String
            ? long.toString()
            : options.longs === Number
              ? long.toNumber()
              : long;
      } else object.rowNum = options.longs === String ? '0' : 0;
    }
    if (message.customerName != null && message.hasOwnProperty('customerName'))
      object.customerName = message.customerName;
    if (message.rowNum != null && message.hasOwnProperty('rowNum'))
      if (typeof message.rowNum === 'number')
        object.rowNum =
          options.longs === String ? String(message.rowNum) : message.rowNum;
      else
        object.rowNum =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.rowNum)
            : options.longs === Number
              ? new $util.LongBits(
                  message.rowNum.low >>> 0,
                  message.rowNum.high >>> 0
                ).toNumber()
              : message.rowNum;
    return object;
  };

  /**
   * Converts this CustomerRecord to JSON.
   * @function toJSON
   * @memberof CustomerRecord
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  CustomerRecord.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  /**
   * Gets the default type url for CustomerRecord
   * @function getTypeUrl
   * @memberof CustomerRecord
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  CustomerRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = 'type.googleapis.com';
    }
    return typeUrlPrefix + '/CustomerRecord';
  };

  return CustomerRecord;
})();

module.exports = $root;
