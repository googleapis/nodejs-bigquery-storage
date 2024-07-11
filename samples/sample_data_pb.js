/*eslint-disable n/no-extraneous-require, eqeqeq, block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
'use strict';

var $protobuf = require('protobufjs/minimal');

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {});

$root.SampleData = (function () {
  /**
   * Properties of a SampleData.
   * @exports ISampleData
   * @interface ISampleData
   * @property {boolean|null} [boolCol] SampleData boolCol
   * @property {Uint8Array|null} [bytesCol] SampleData bytesCol
   * @property {number|null} [float64Col] SampleData float64Col
   * @property {number|Long|null} [int64Col] SampleData int64Col
   * @property {string|null} [stringCol] SampleData stringCol
   * @property {number|Long|null} [dateCol] SampleData dateCol
   * @property {string|null} [datetimeCol] SampleData datetimeCol
   * @property {string|null} [geographyCol] SampleData geographyCol
   * @property {string|null} [numericCol] SampleData numericCol
   * @property {string|null} [bignumericCol] SampleData bignumericCol
   * @property {string|null} [timeCol] SampleData timeCol
   * @property {number|Long|null} [timestampCol] SampleData timestampCol
   * @property {Array.<number|Long>|null} [int64List] SampleData int64List
   * @property {SampleData.ISampleStruct|null} [structCol] SampleData structCol
   * @property {Array.<SampleData.ISampleStruct>|null} [structList] SampleData structList
   * @property {SampleData.ISampleRange|null} [rangeCol] SampleData rangeCol
   * @property {number|Long} rowNum SampleData rowNum
   */

  /**
   * Constructs a new SampleData.
   * @exports SampleData
   * @classdesc Represents a SampleData.
   * @implements ISampleData
   * @constructor
   * @param {ISampleData=} [properties] Properties to set
   */
  function SampleData(properties) {
    this.int64List = [];
    this.structList = [];
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * SampleData boolCol.
   * @member {boolean} boolCol
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.boolCol = false;

  /**
   * SampleData bytesCol.
   * @member {Uint8Array} bytesCol
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.bytesCol = $util.newBuffer([]);

  /**
   * SampleData float64Col.
   * @member {number} float64Col
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.float64Col = 0;

  /**
   * SampleData int64Col.
   * @member {number|Long} int64Col
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.int64Col = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0;

  /**
   * SampleData stringCol.
   * @member {string} stringCol
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.stringCol = '';

  /**
   * SampleData dateCol.
   * @member {number|Long} dateCol
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.dateCol = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0;

  /**
   * SampleData datetimeCol.
   * @member {string} datetimeCol
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.datetimeCol = '';

  /**
   * SampleData geographyCol.
   * @member {string} geographyCol
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.geographyCol = '';

  /**
   * SampleData numericCol.
   * @member {string} numericCol
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.numericCol = '';

  /**
   * SampleData bignumericCol.
   * @member {string} bignumericCol
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.bignumericCol = '';

  /**
   * SampleData timeCol.
   * @member {string} timeCol
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.timeCol = '';

  /**
   * SampleData timestampCol.
   * @member {number|Long} timestampCol
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.timestampCol = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0;

  /**
   * SampleData int64List.
   * @member {Array.<number|Long>} int64List
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.int64List = $util.emptyArray;

  /**
   * SampleData structCol.
   * @member {SampleData.ISampleStruct|null|undefined} structCol
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.structCol = null;

  /**
   * SampleData structList.
   * @member {Array.<SampleData.ISampleStruct>} structList
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.structList = $util.emptyArray;

  /**
   * SampleData rangeCol.
   * @member {SampleData.ISampleRange|null|undefined} rangeCol
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.rangeCol = null;

  /**
   * SampleData rowNum.
   * @member {number|Long} rowNum
   * @memberof SampleData
   * @instance
   */
  SampleData.prototype.rowNum = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0;

  /**
   * Creates a new SampleData instance using the specified properties.
   * @function create
   * @memberof SampleData
   * @static
   * @param {ISampleData=} [properties] Properties to set
   * @returns {SampleData} SampleData instance
   */
  SampleData.create = function create(properties) {
    return new SampleData(properties);
  };

  /**
   * Encodes the specified SampleData message. Does not implicitly {@link SampleData.verify|verify} messages.
   * @function encode
   * @memberof SampleData
   * @static
   * @param {ISampleData} message SampleData message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  SampleData.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.boolCol != null &&
      Object.hasOwnProperty.call(message, 'boolCol')
    )
      writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.boolCol);
    if (
      message.bytesCol != null &&
      Object.hasOwnProperty.call(message, 'bytesCol')
    )
      writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.bytesCol);
    if (
      message.float64Col != null &&
      Object.hasOwnProperty.call(message, 'float64Col')
    )
      writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.float64Col);
    if (
      message.int64Col != null &&
      Object.hasOwnProperty.call(message, 'int64Col')
    )
      writer.uint32(/* id 4, wireType 0 =*/ 32).int64(message.int64Col);
    if (
      message.stringCol != null &&
      Object.hasOwnProperty.call(message, 'stringCol')
    )
      writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.stringCol);
    if (
      message.dateCol != null &&
      Object.hasOwnProperty.call(message, 'dateCol')
    )
      writer.uint32(/* id 6, wireType 0 =*/ 48).int64(message.dateCol);
    if (
      message.datetimeCol != null &&
      Object.hasOwnProperty.call(message, 'datetimeCol')
    )
      writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.datetimeCol);
    if (
      message.geographyCol != null &&
      Object.hasOwnProperty.call(message, 'geographyCol')
    )
      writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.geographyCol);
    if (
      message.numericCol != null &&
      Object.hasOwnProperty.call(message, 'numericCol')
    )
      writer.uint32(/* id 9, wireType 2 =*/ 74).string(message.numericCol);
    if (
      message.bignumericCol != null &&
      Object.hasOwnProperty.call(message, 'bignumericCol')
    )
      writer.uint32(/* id 10, wireType 2 =*/ 82).string(message.bignumericCol);
    if (
      message.timeCol != null &&
      Object.hasOwnProperty.call(message, 'timeCol')
    )
      writer.uint32(/* id 11, wireType 2 =*/ 90).string(message.timeCol);
    if (
      message.timestampCol != null &&
      Object.hasOwnProperty.call(message, 'timestampCol')
    )
      writer.uint32(/* id 12, wireType 0 =*/ 96).int64(message.timestampCol);
    if (message.int64List != null && message.int64List.length)
      for (var i = 0; i < message.int64List.length; ++i)
        writer.uint32(/* id 13, wireType 0 =*/ 104).int64(message.int64List[i]);
    if (
      message.structCol != null &&
      Object.hasOwnProperty.call(message, 'structCol')
    )
      $root.SampleData.SampleStruct.encode(
        message.structCol,
        writer.uint32(/* id 14, wireType 2 =*/ 114).fork()
      ).ldelim();
    if (message.structList != null && message.structList.length)
      for (var i = 0; i < message.structList.length; ++i)
        $root.SampleData.SampleStruct.encode(
          message.structList[i],
          writer.uint32(/* id 15, wireType 2 =*/ 122).fork()
        ).ldelim();
    if (
      message.rangeCol != null &&
      Object.hasOwnProperty.call(message, 'rangeCol')
    )
      $root.SampleData.SampleRange.encode(
        message.rangeCol,
        writer.uint32(/* id 16, wireType 2 =*/ 130).fork()
      ).ldelim();
    writer.uint32(/* id 17, wireType 0 =*/ 136).int64(message.rowNum);
    return writer;
  };

  /**
   * Encodes the specified SampleData message, length delimited. Does not implicitly {@link SampleData.verify|verify} messages.
   * @function encodeDelimited
   * @memberof SampleData
   * @static
   * @param {ISampleData} message SampleData message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  SampleData.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a SampleData message from the specified reader or buffer.
   * @function decode
   * @memberof SampleData
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {SampleData} SampleData
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  SampleData.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.SampleData();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          message.boolCol = reader.bool();
          break;
        }
        case 2: {
          message.bytesCol = reader.bytes();
          break;
        }
        case 3: {
          message.float64Col = reader.float();
          break;
        }
        case 4: {
          message.int64Col = reader.int64();
          break;
        }
        case 5: {
          message.stringCol = reader.string();
          break;
        }
        case 6: {
          message.dateCol = reader.int64();
          break;
        }
        case 7: {
          message.datetimeCol = reader.string();
          break;
        }
        case 8: {
          message.geographyCol = reader.string();
          break;
        }
        case 9: {
          message.numericCol = reader.string();
          break;
        }
        case 10: {
          message.bignumericCol = reader.string();
          break;
        }
        case 11: {
          message.timeCol = reader.string();
          break;
        }
        case 12: {
          message.timestampCol = reader.int64();
          break;
        }
        case 13: {
          if (!(message.int64List && message.int64List.length))
            message.int64List = [];
          if ((tag & 7) === 2) {
            var end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) message.int64List.push(reader.int64());
          } else message.int64List.push(reader.int64());
          break;
        }
        case 14: {
          message.structCol = $root.SampleData.SampleStruct.decode(
            reader,
            reader.uint32()
          );
          break;
        }
        case 15: {
          if (!(message.structList && message.structList.length))
            message.structList = [];
          message.structList.push(
            $root.SampleData.SampleStruct.decode(reader, reader.uint32())
          );
          break;
        }
        case 16: {
          message.rangeCol = $root.SampleData.SampleRange.decode(
            reader,
            reader.uint32()
          );
          break;
        }
        case 17: {
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
   * Decodes a SampleData message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof SampleData
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {SampleData} SampleData
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  SampleData.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a SampleData message.
   * @function verify
   * @memberof SampleData
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  SampleData.verify = function verify(message) {
    if (typeof message !== 'object' || message === null)
      return 'object expected';
    if (message.boolCol != null && message.hasOwnProperty('boolCol'))
      if (typeof message.boolCol !== 'boolean')
        return 'boolCol: boolean expected';
    if (message.bytesCol != null && message.hasOwnProperty('bytesCol'))
      if (
        !(
          (message.bytesCol && typeof message.bytesCol.length === 'number') ||
          $util.isString(message.bytesCol)
        )
      )
        return 'bytesCol: buffer expected';
    if (message.float64Col != null && message.hasOwnProperty('float64Col'))
      if (typeof message.float64Col !== 'number')
        return 'float64Col: number expected';
    if (message.int64Col != null && message.hasOwnProperty('int64Col'))
      if (
        !$util.isInteger(message.int64Col) &&
        !(
          message.int64Col &&
          $util.isInteger(message.int64Col.low) &&
          $util.isInteger(message.int64Col.high)
        )
      )
        return 'int64Col: integer|Long expected';
    if (message.stringCol != null && message.hasOwnProperty('stringCol'))
      if (!$util.isString(message.stringCol))
        return 'stringCol: string expected';
    if (message.dateCol != null && message.hasOwnProperty('dateCol'))
      if (
        !$util.isInteger(message.dateCol) &&
        !(
          message.dateCol &&
          $util.isInteger(message.dateCol.low) &&
          $util.isInteger(message.dateCol.high)
        )
      )
        return 'dateCol: integer|Long expected';
    if (message.datetimeCol != null && message.hasOwnProperty('datetimeCol'))
      if (!$util.isString(message.datetimeCol))
        return 'datetimeCol: string expected';
    if (message.geographyCol != null && message.hasOwnProperty('geographyCol'))
      if (!$util.isString(message.geographyCol))
        return 'geographyCol: string expected';
    if (message.numericCol != null && message.hasOwnProperty('numericCol'))
      if (!$util.isString(message.numericCol))
        return 'numericCol: string expected';
    if (
      message.bignumericCol != null &&
      message.hasOwnProperty('bignumericCol')
    )
      if (!$util.isString(message.bignumericCol))
        return 'bignumericCol: string expected';
    if (message.timeCol != null && message.hasOwnProperty('timeCol'))
      if (!$util.isString(message.timeCol)) return 'timeCol: string expected';
    if (message.timestampCol != null && message.hasOwnProperty('timestampCol'))
      if (
        !$util.isInteger(message.timestampCol) &&
        !(
          message.timestampCol &&
          $util.isInteger(message.timestampCol.low) &&
          $util.isInteger(message.timestampCol.high)
        )
      )
        return 'timestampCol: integer|Long expected';
    if (message.int64List != null && message.hasOwnProperty('int64List')) {
      if (!Array.isArray(message.int64List)) return 'int64List: array expected';
      for (var i = 0; i < message.int64List.length; ++i)
        if (
          !$util.isInteger(message.int64List[i]) &&
          !(
            message.int64List[i] &&
            $util.isInteger(message.int64List[i].low) &&
            $util.isInteger(message.int64List[i].high)
          )
        )
          return 'int64List: integer|Long[] expected';
    }
    if (message.structCol != null && message.hasOwnProperty('structCol')) {
      var error = $root.SampleData.SampleStruct.verify(message.structCol);
      if (error) return 'structCol.' + error;
    }
    if (message.structList != null && message.hasOwnProperty('structList')) {
      if (!Array.isArray(message.structList))
        return 'structList: array expected';
      for (var i = 0; i < message.structList.length; ++i) {
        var error = $root.SampleData.SampleStruct.verify(message.structList[i]);
        if (error) return 'structList.' + error;
      }
    }
    if (message.rangeCol != null && message.hasOwnProperty('rangeCol')) {
      var error = $root.SampleData.SampleRange.verify(message.rangeCol);
      if (error) return 'rangeCol.' + error;
    }
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
   * Creates a SampleData message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof SampleData
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {SampleData} SampleData
   */
  SampleData.fromObject = function fromObject(object) {
    if (object instanceof $root.SampleData) return object;
    var message = new $root.SampleData();
    if (object.boolCol != null) message.boolCol = Boolean(object.boolCol);
    if (object.bytesCol != null)
      if (typeof object.bytesCol === 'string')
        $util.base64.decode(
          object.bytesCol,
          (message.bytesCol = $util.newBuffer(
            $util.base64.length(object.bytesCol)
          )),
          0
        );
      else if (object.bytesCol.length >= 0) message.bytesCol = object.bytesCol;
    if (object.float64Col != null)
      message.float64Col = Number(object.float64Col);
    if (object.int64Col != null)
      if ($util.Long)
        (message.int64Col = $util.Long.fromValue(object.int64Col)).unsigned =
          false;
      else if (typeof object.int64Col === 'string')
        message.int64Col = parseInt(object.int64Col, 10);
      else if (typeof object.int64Col === 'number')
        message.int64Col = object.int64Col;
      else if (typeof object.int64Col === 'object')
        message.int64Col = new $util.LongBits(
          object.int64Col.low >>> 0,
          object.int64Col.high >>> 0
        ).toNumber();
    if (object.stringCol != null) message.stringCol = String(object.stringCol);
    if (object.dateCol != null)
      if ($util.Long)
        (message.dateCol = $util.Long.fromValue(object.dateCol)).unsigned =
          false;
      else if (typeof object.dateCol === 'string')
        message.dateCol = parseInt(object.dateCol, 10);
      else if (typeof object.dateCol === 'number')
        message.dateCol = object.dateCol;
      else if (typeof object.dateCol === 'object')
        message.dateCol = new $util.LongBits(
          object.dateCol.low >>> 0,
          object.dateCol.high >>> 0
        ).toNumber();
    if (object.datetimeCol != null)
      message.datetimeCol = String(object.datetimeCol);
    if (object.geographyCol != null)
      message.geographyCol = String(object.geographyCol);
    if (object.numericCol != null)
      message.numericCol = String(object.numericCol);
    if (object.bignumericCol != null)
      message.bignumericCol = String(object.bignumericCol);
    if (object.timeCol != null) message.timeCol = String(object.timeCol);
    if (object.timestampCol != null)
      if ($util.Long)
        (message.timestampCol = $util.Long.fromValue(
          object.timestampCol
        )).unsigned = false;
      else if (typeof object.timestampCol === 'string')
        message.timestampCol = parseInt(object.timestampCol, 10);
      else if (typeof object.timestampCol === 'number')
        message.timestampCol = object.timestampCol;
      else if (typeof object.timestampCol === 'object')
        message.timestampCol = new $util.LongBits(
          object.timestampCol.low >>> 0,
          object.timestampCol.high >>> 0
        ).toNumber();
    if (object.int64List) {
      if (!Array.isArray(object.int64List))
        throw TypeError('.SampleData.int64List: array expected');
      message.int64List = [];
      for (var i = 0; i < object.int64List.length; ++i)
        if ($util.Long)
          (message.int64List[i] = $util.Long.fromValue(
            object.int64List[i]
          )).unsigned = false;
        else if (typeof object.int64List[i] === 'string')
          message.int64List[i] = parseInt(object.int64List[i], 10);
        else if (typeof object.int64List[i] === 'number')
          message.int64List[i] = object.int64List[i];
        else if (typeof object.int64List[i] === 'object')
          message.int64List[i] = new $util.LongBits(
            object.int64List[i].low >>> 0,
            object.int64List[i].high >>> 0
          ).toNumber();
    }
    if (object.structCol != null) {
      if (typeof object.structCol !== 'object')
        throw TypeError('.SampleData.structCol: object expected');
      message.structCol = $root.SampleData.SampleStruct.fromObject(
        object.structCol
      );
    }
    if (object.structList) {
      if (!Array.isArray(object.structList))
        throw TypeError('.SampleData.structList: array expected');
      message.structList = [];
      for (var i = 0; i < object.structList.length; ++i) {
        if (typeof object.structList[i] !== 'object')
          throw TypeError('.SampleData.structList: object expected');
        message.structList[i] = $root.SampleData.SampleStruct.fromObject(
          object.structList[i]
        );
      }
    }
    if (object.rangeCol != null) {
      if (typeof object.rangeCol !== 'object')
        throw TypeError('.SampleData.rangeCol: object expected');
      message.rangeCol = $root.SampleData.SampleRange.fromObject(
        object.rangeCol
      );
    }
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
   * Creates a plain object from a SampleData message. Also converts values to other types if specified.
   * @function toObject
   * @memberof SampleData
   * @static
   * @param {SampleData} message SampleData
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  SampleData.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.arrays || options.defaults) {
      object.int64List = [];
      object.structList = [];
    }
    if (options.defaults) {
      object.boolCol = false;
      if (options.bytes === String) object.bytesCol = '';
      else {
        object.bytesCol = [];
        if (options.bytes !== Array)
          object.bytesCol = $util.newBuffer(object.bytesCol);
      }
      object.float64Col = 0;
      if ($util.Long) {
        var long = new $util.Long(0, 0, false);
        object.int64Col =
          options.longs === String
            ? long.toString()
            : options.longs === Number
              ? long.toNumber()
              : long;
      } else object.int64Col = options.longs === String ? '0' : 0;
      object.stringCol = '';
      if ($util.Long) {
        var long = new $util.Long(0, 0, false);
        object.dateCol =
          options.longs === String
            ? long.toString()
            : options.longs === Number
              ? long.toNumber()
              : long;
      } else object.dateCol = options.longs === String ? '0' : 0;
      object.datetimeCol = '';
      object.geographyCol = '';
      object.numericCol = '';
      object.bignumericCol = '';
      object.timeCol = '';
      if ($util.Long) {
        var long = new $util.Long(0, 0, false);
        object.timestampCol =
          options.longs === String
            ? long.toString()
            : options.longs === Number
              ? long.toNumber()
              : long;
      } else object.timestampCol = options.longs === String ? '0' : 0;
      object.structCol = null;
      object.rangeCol = null;
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
    if (message.boolCol != null && message.hasOwnProperty('boolCol'))
      object.boolCol = message.boolCol;
    if (message.bytesCol != null && message.hasOwnProperty('bytesCol'))
      object.bytesCol =
        options.bytes === String
          ? $util.base64.encode(message.bytesCol, 0, message.bytesCol.length)
          : options.bytes === Array
            ? Array.prototype.slice.call(message.bytesCol)
            : message.bytesCol;
    if (message.float64Col != null && message.hasOwnProperty('float64Col'))
      object.float64Col =
        options.json && !isFinite(message.float64Col)
          ? String(message.float64Col)
          : message.float64Col;
    if (message.int64Col != null && message.hasOwnProperty('int64Col'))
      if (typeof message.int64Col === 'number')
        object.int64Col =
          options.longs === String
            ? String(message.int64Col)
            : message.int64Col;
      else
        object.int64Col =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.int64Col)
            : options.longs === Number
              ? new $util.LongBits(
                  message.int64Col.low >>> 0,
                  message.int64Col.high >>> 0
                ).toNumber()
              : message.int64Col;
    if (message.stringCol != null && message.hasOwnProperty('stringCol'))
      object.stringCol = message.stringCol;
    if (message.dateCol != null && message.hasOwnProperty('dateCol'))
      if (typeof message.dateCol === 'number')
        object.dateCol =
          options.longs === String ? String(message.dateCol) : message.dateCol;
      else
        object.dateCol =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.dateCol)
            : options.longs === Number
              ? new $util.LongBits(
                  message.dateCol.low >>> 0,
                  message.dateCol.high >>> 0
                ).toNumber()
              : message.dateCol;
    if (message.datetimeCol != null && message.hasOwnProperty('datetimeCol'))
      object.datetimeCol = message.datetimeCol;
    if (message.geographyCol != null && message.hasOwnProperty('geographyCol'))
      object.geographyCol = message.geographyCol;
    if (message.numericCol != null && message.hasOwnProperty('numericCol'))
      object.numericCol = message.numericCol;
    if (
      message.bignumericCol != null &&
      message.hasOwnProperty('bignumericCol')
    )
      object.bignumericCol = message.bignumericCol;
    if (message.timeCol != null && message.hasOwnProperty('timeCol'))
      object.timeCol = message.timeCol;
    if (message.timestampCol != null && message.hasOwnProperty('timestampCol'))
      if (typeof message.timestampCol === 'number')
        object.timestampCol =
          options.longs === String
            ? String(message.timestampCol)
            : message.timestampCol;
      else
        object.timestampCol =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.timestampCol)
            : options.longs === Number
              ? new $util.LongBits(
                  message.timestampCol.low >>> 0,
                  message.timestampCol.high >>> 0
                ).toNumber()
              : message.timestampCol;
    if (message.int64List && message.int64List.length) {
      object.int64List = [];
      for (var j = 0; j < message.int64List.length; ++j)
        if (typeof message.int64List[j] === 'number')
          object.int64List[j] =
            options.longs === String
              ? String(message.int64List[j])
              : message.int64List[j];
        else
          object.int64List[j] =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.int64List[j])
              : options.longs === Number
                ? new $util.LongBits(
                    message.int64List[j].low >>> 0,
                    message.int64List[j].high >>> 0
                  ).toNumber()
                : message.int64List[j];
    }
    if (message.structCol != null && message.hasOwnProperty('structCol'))
      object.structCol = $root.SampleData.SampleStruct.toObject(
        message.structCol,
        options
      );
    if (message.structList && message.structList.length) {
      object.structList = [];
      for (var j = 0; j < message.structList.length; ++j)
        object.structList[j] = $root.SampleData.SampleStruct.toObject(
          message.structList[j],
          options
        );
    }
    if (message.rangeCol != null && message.hasOwnProperty('rangeCol'))
      object.rangeCol = $root.SampleData.SampleRange.toObject(
        message.rangeCol,
        options
      );
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
   * Converts this SampleData to JSON.
   * @function toJSON
   * @memberof SampleData
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  SampleData.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  /**
   * Gets the default type url for SampleData
   * @function getTypeUrl
   * @memberof SampleData
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  SampleData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = 'type.googleapis.com';
    }
    return typeUrlPrefix + '/SampleData';
  };

  SampleData.SampleStruct = (function () {
    /**
     * Properties of a SampleStruct.
     * @memberof SampleData
     * @interface ISampleStruct
     * @property {number|Long|null} [subIntCol] SampleStruct subIntCol
     */

    /**
     * Constructs a new SampleStruct.
     * @memberof SampleData
     * @classdesc Represents a SampleStruct.
     * @implements ISampleStruct
     * @constructor
     * @param {SampleData.ISampleStruct=} [properties] Properties to set
     */
    function SampleStruct(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * SampleStruct subIntCol.
     * @member {number|Long} subIntCol
     * @memberof SampleData.SampleStruct
     * @instance
     */
    SampleStruct.prototype.subIntCol = $util.Long
      ? $util.Long.fromBits(0, 0, false)
      : 0;

    /**
     * Creates a new SampleStruct instance using the specified properties.
     * @function create
     * @memberof SampleData.SampleStruct
     * @static
     * @param {SampleData.ISampleStruct=} [properties] Properties to set
     * @returns {SampleData.SampleStruct} SampleStruct instance
     */
    SampleStruct.create = function create(properties) {
      return new SampleStruct(properties);
    };

    /**
     * Encodes the specified SampleStruct message. Does not implicitly {@link SampleData.SampleStruct.verify|verify} messages.
     * @function encode
     * @memberof SampleData.SampleStruct
     * @static
     * @param {SampleData.ISampleStruct} message SampleStruct message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SampleStruct.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.subIntCol != null &&
        Object.hasOwnProperty.call(message, 'subIntCol')
      )
        writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.subIntCol);
      return writer;
    };

    /**
     * Encodes the specified SampleStruct message, length delimited. Does not implicitly {@link SampleData.SampleStruct.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SampleData.SampleStruct
     * @static
     * @param {SampleData.ISampleStruct} message SampleStruct message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SampleStruct.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SampleStruct message from the specified reader or buffer.
     * @function decode
     * @memberof SampleData.SampleStruct
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SampleData.SampleStruct} SampleStruct
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SampleStruct.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.SampleData.SampleStruct();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.subIntCol = reader.int64();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a SampleStruct message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SampleData.SampleStruct
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SampleData.SampleStruct} SampleStruct
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SampleStruct.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SampleStruct message.
     * @function verify
     * @memberof SampleData.SampleStruct
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SampleStruct.verify = function verify(message) {
      if (typeof message !== 'object' || message === null)
        return 'object expected';
      if (message.subIntCol != null && message.hasOwnProperty('subIntCol'))
        if (
          !$util.isInteger(message.subIntCol) &&
          !(
            message.subIntCol &&
            $util.isInteger(message.subIntCol.low) &&
            $util.isInteger(message.subIntCol.high)
          )
        )
          return 'subIntCol: integer|Long expected';
      return null;
    };

    /**
     * Creates a SampleStruct message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SampleData.SampleStruct
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SampleData.SampleStruct} SampleStruct
     */
    SampleStruct.fromObject = function fromObject(object) {
      if (object instanceof $root.SampleData.SampleStruct) return object;
      var message = new $root.SampleData.SampleStruct();
      if (object.subIntCol != null)
        if ($util.Long)
          (message.subIntCol = $util.Long.fromValue(
            object.subIntCol
          )).unsigned = false;
        else if (typeof object.subIntCol === 'string')
          message.subIntCol = parseInt(object.subIntCol, 10);
        else if (typeof object.subIntCol === 'number')
          message.subIntCol = object.subIntCol;
        else if (typeof object.subIntCol === 'object')
          message.subIntCol = new $util.LongBits(
            object.subIntCol.low >>> 0,
            object.subIntCol.high >>> 0
          ).toNumber();
      return message;
    };

    /**
     * Creates a plain object from a SampleStruct message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SampleData.SampleStruct
     * @static
     * @param {SampleData.SampleStruct} message SampleStruct
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SampleStruct.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults)
        if ($util.Long) {
          var long = new $util.Long(0, 0, false);
          object.subIntCol =
            options.longs === String
              ? long.toString()
              : options.longs === Number
                ? long.toNumber()
                : long;
        } else object.subIntCol = options.longs === String ? '0' : 0;
      if (message.subIntCol != null && message.hasOwnProperty('subIntCol'))
        if (typeof message.subIntCol === 'number')
          object.subIntCol =
            options.longs === String
              ? String(message.subIntCol)
              : message.subIntCol;
        else
          object.subIntCol =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.subIntCol)
              : options.longs === Number
                ? new $util.LongBits(
                    message.subIntCol.low >>> 0,
                    message.subIntCol.high >>> 0
                  ).toNumber()
                : message.subIntCol;
      return object;
    };

    /**
     * Converts this SampleStruct to JSON.
     * @function toJSON
     * @memberof SampleData.SampleStruct
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SampleStruct.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SampleStruct
     * @function getTypeUrl
     * @memberof SampleData.SampleStruct
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SampleStruct.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com';
      }
      return typeUrlPrefix + '/SampleData.SampleStruct';
    };

    return SampleStruct;
  })();

  SampleData.SampleRange = (function () {
    /**
     * Properties of a SampleRange.
     * @memberof SampleData
     * @interface ISampleRange
     * @property {number|Long|null} [start] SampleRange start
     * @property {number|Long|null} [end] SampleRange end
     */

    /**
     * Constructs a new SampleRange.
     * @memberof SampleData
     * @classdesc Represents a SampleRange.
     * @implements ISampleRange
     * @constructor
     * @param {SampleData.ISampleRange=} [properties] Properties to set
     */
    function SampleRange(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * SampleRange start.
     * @member {number|Long} start
     * @memberof SampleData.SampleRange
     * @instance
     */
    SampleRange.prototype.start = $util.Long
      ? $util.Long.fromBits(0, 0, false)
      : 0;

    /**
     * SampleRange end.
     * @member {number|Long} end
     * @memberof SampleData.SampleRange
     * @instance
     */
    SampleRange.prototype.end = $util.Long
      ? $util.Long.fromBits(0, 0, false)
      : 0;

    /**
     * Creates a new SampleRange instance using the specified properties.
     * @function create
     * @memberof SampleData.SampleRange
     * @static
     * @param {SampleData.ISampleRange=} [properties] Properties to set
     * @returns {SampleData.SampleRange} SampleRange instance
     */
    SampleRange.create = function create(properties) {
      return new SampleRange(properties);
    };

    /**
     * Encodes the specified SampleRange message. Does not implicitly {@link SampleData.SampleRange.verify|verify} messages.
     * @function encode
     * @memberof SampleData.SampleRange
     * @static
     * @param {SampleData.ISampleRange} message SampleRange message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SampleRange.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.start != null && Object.hasOwnProperty.call(message, 'start'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.start);
      if (message.end != null && Object.hasOwnProperty.call(message, 'end'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).int64(message.end);
      return writer;
    };

    /**
     * Encodes the specified SampleRange message, length delimited. Does not implicitly {@link SampleData.SampleRange.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SampleData.SampleRange
     * @static
     * @param {SampleData.ISampleRange} message SampleRange message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SampleRange.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SampleRange message from the specified reader or buffer.
     * @function decode
     * @memberof SampleData.SampleRange
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SampleData.SampleRange} SampleRange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SampleRange.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.SampleData.SampleRange();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.start = reader.int64();
            break;
          }
          case 2: {
            message.end = reader.int64();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a SampleRange message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SampleData.SampleRange
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SampleData.SampleRange} SampleRange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SampleRange.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SampleRange message.
     * @function verify
     * @memberof SampleData.SampleRange
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SampleRange.verify = function verify(message) {
      if (typeof message !== 'object' || message === null)
        return 'object expected';
      if (message.start != null && message.hasOwnProperty('start'))
        if (
          !$util.isInteger(message.start) &&
          !(
            message.start &&
            $util.isInteger(message.start.low) &&
            $util.isInteger(message.start.high)
          )
        )
          return 'start: integer|Long expected';
      if (message.end != null && message.hasOwnProperty('end'))
        if (
          !$util.isInteger(message.end) &&
          !(
            message.end &&
            $util.isInteger(message.end.low) &&
            $util.isInteger(message.end.high)
          )
        )
          return 'end: integer|Long expected';
      return null;
    };

    /**
     * Creates a SampleRange message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SampleData.SampleRange
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SampleData.SampleRange} SampleRange
     */
    SampleRange.fromObject = function fromObject(object) {
      if (object instanceof $root.SampleData.SampleRange) return object;
      var message = new $root.SampleData.SampleRange();
      if (object.start != null)
        if ($util.Long)
          (message.start = $util.Long.fromValue(object.start)).unsigned = false;
        else if (typeof object.start === 'string')
          message.start = parseInt(object.start, 10);
        else if (typeof object.start === 'number') message.start = object.start;
        else if (typeof object.start === 'object')
          message.start = new $util.LongBits(
            object.start.low >>> 0,
            object.start.high >>> 0
          ).toNumber();
      if (object.end != null)
        if ($util.Long)
          (message.end = $util.Long.fromValue(object.end)).unsigned = false;
        else if (typeof object.end === 'string')
          message.end = parseInt(object.end, 10);
        else if (typeof object.end === 'number') message.end = object.end;
        else if (typeof object.end === 'object')
          message.end = new $util.LongBits(
            object.end.low >>> 0,
            object.end.high >>> 0
          ).toNumber();
      return message;
    };

    /**
     * Creates a plain object from a SampleRange message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SampleData.SampleRange
     * @static
     * @param {SampleData.SampleRange} message SampleRange
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SampleRange.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        if ($util.Long) {
          var long = new $util.Long(0, 0, false);
          object.start =
            options.longs === String
              ? long.toString()
              : options.longs === Number
                ? long.toNumber()
                : long;
        } else object.start = options.longs === String ? '0' : 0;
        if ($util.Long) {
          var long = new $util.Long(0, 0, false);
          object.end =
            options.longs === String
              ? long.toString()
              : options.longs === Number
                ? long.toNumber()
                : long;
        } else object.end = options.longs === String ? '0' : 0;
      }
      if (message.start != null && message.hasOwnProperty('start'))
        if (typeof message.start === 'number')
          object.start =
            options.longs === String ? String(message.start) : message.start;
        else
          object.start =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.start)
              : options.longs === Number
                ? new $util.LongBits(
                    message.start.low >>> 0,
                    message.start.high >>> 0
                  ).toNumber()
                : message.start;
      if (message.end != null && message.hasOwnProperty('end'))
        if (typeof message.end === 'number')
          object.end =
            options.longs === String ? String(message.end) : message.end;
        else
          object.end =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.end)
              : options.longs === Number
                ? new $util.LongBits(
                    message.end.low >>> 0,
                    message.end.high >>> 0
                  ).toNumber()
                : message.end;
      return object;
    };

    /**
     * Converts this SampleRange to JSON.
     * @function toJSON
     * @memberof SampleData.SampleRange
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SampleRange.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SampleRange
     * @function getTypeUrl
     * @memberof SampleData.SampleRange
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SampleRange.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com';
      }
      return typeUrlPrefix + '/SampleData.SampleRange';
    };

    return SampleRange;
  })();

  return SampleData;
})();

module.exports = $root;
