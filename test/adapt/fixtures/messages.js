/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const testdata = $root.testdata = (() => {

    /**
     * Namespace testdata.
     * @exports testdata
     * @namespace
     */
    const testdata = {};

    testdata.SimpleMessage = (function() {

        /**
         * Properties of a SimpleMessage.
         * @memberof testdata
         * @interface ISimpleMessage
         * @property {string|null} [name] SimpleMessage name
         * @property {number|Long|null} [value] SimpleMessage value
         * @property {string|null} [other] SimpleMessage other
         */

        /**
         * Constructs a new SimpleMessage.
         * @memberof testdata
         * @classdesc Represents a SimpleMessage.
         * @implements ISimpleMessage
         * @constructor
         * @param {testdata.ISimpleMessage=} [properties] Properties to set
         */
        function SimpleMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SimpleMessage name.
         * @member {string} name
         * @memberof testdata.SimpleMessage
         * @instance
         */
        SimpleMessage.prototype.name = "";

        /**
         * SimpleMessage value.
         * @member {number|Long} value
         * @memberof testdata.SimpleMessage
         * @instance
         */
        SimpleMessage.prototype.value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SimpleMessage other.
         * @member {string} other
         * @memberof testdata.SimpleMessage
         * @instance
         */
        SimpleMessage.prototype.other = "";

        /**
         * Creates a new SimpleMessage instance using the specified properties.
         * @function create
         * @memberof testdata.SimpleMessage
         * @static
         * @param {testdata.ISimpleMessage=} [properties] Properties to set
         * @returns {testdata.SimpleMessage} SimpleMessage instance
         */
        SimpleMessage.create = function create(properties) {
            return new SimpleMessage(properties);
        };

        /**
         * Encodes the specified SimpleMessage message. Does not implicitly {@link testdata.SimpleMessage.verify|verify} messages.
         * @function encode
         * @memberof testdata.SimpleMessage
         * @static
         * @param {testdata.ISimpleMessage} message SimpleMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SimpleMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.value);
            if (message.other != null && Object.hasOwnProperty.call(message, "other"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.other);
            return writer;
        };

        /**
         * Encodes the specified SimpleMessage message, length delimited. Does not implicitly {@link testdata.SimpleMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof testdata.SimpleMessage
         * @static
         * @param {testdata.ISimpleMessage} message SimpleMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SimpleMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SimpleMessage message from the specified reader or buffer.
         * @function decode
         * @memberof testdata.SimpleMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {testdata.SimpleMessage} SimpleMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SimpleMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.testdata.SimpleMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.name = reader.string();
                        break;
                    }
                case 2: {
                        message.value = reader.int64();
                        break;
                    }
                case 3: {
                        message.other = reader.string();
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
         * Decodes a SimpleMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof testdata.SimpleMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {testdata.SimpleMessage} SimpleMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SimpleMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SimpleMessage message.
         * @function verify
         * @memberof testdata.SimpleMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SimpleMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
                    return "value: integer|Long expected";
            if (message.other != null && message.hasOwnProperty("other"))
                if (!$util.isString(message.other))
                    return "other: string expected";
            return null;
        };

        /**
         * Creates a SimpleMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof testdata.SimpleMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {testdata.SimpleMessage} SimpleMessage
         */
        SimpleMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.testdata.SimpleMessage)
                return object;
            let message = new $root.testdata.SimpleMessage();
            if (object.name != null)
                message.name = String(object.name);
            if (object.value != null)
                if ($util.Long)
                    (message.value = $util.Long.fromValue(object.value)).unsigned = false;
                else if (typeof object.value === "string")
                    message.value = parseInt(object.value, 10);
                else if (typeof object.value === "number")
                    message.value = object.value;
                else if (typeof object.value === "object")
                    message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber();
            if (object.other != null)
                message.other = String(object.other);
            return message;
        };

        /**
         * Creates a plain object from a SimpleMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof testdata.SimpleMessage
         * @static
         * @param {testdata.SimpleMessage} message SimpleMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SimpleMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.name = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.value = options.longs === String ? "0" : 0;
                object.other = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.value != null && message.hasOwnProperty("value"))
                if (typeof message.value === "number")
                    object.value = options.longs === String ? String(message.value) : message.value;
                else
                    object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber() : message.value;
            if (message.other != null && message.hasOwnProperty("other"))
                object.other = message.other;
            return object;
        };

        /**
         * Converts this SimpleMessage to JSON.
         * @function toJSON
         * @memberof testdata.SimpleMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SimpleMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SimpleMessage
         * @function getTypeUrl
         * @memberof testdata.SimpleMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SimpleMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/testdata.SimpleMessage";
        };

        return SimpleMessage;
    })();

    testdata.GithubArchiveEntity = (function() {

        /**
         * Properties of a GithubArchiveEntity.
         * @memberof testdata
         * @interface IGithubArchiveEntity
         * @property {number|Long|null} [id] GithubArchiveEntity id
         * @property {string|null} [login] GithubArchiveEntity login
         * @property {string|null} [gravatarId] GithubArchiveEntity gravatarId
         * @property {string|null} [avatarUrl] GithubArchiveEntity avatarUrl
         * @property {string|null} [url] GithubArchiveEntity url
         */

        /**
         * Constructs a new GithubArchiveEntity.
         * @memberof testdata
         * @classdesc Represents a GithubArchiveEntity.
         * @implements IGithubArchiveEntity
         * @constructor
         * @param {testdata.IGithubArchiveEntity=} [properties] Properties to set
         */
        function GithubArchiveEntity(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GithubArchiveEntity id.
         * @member {number|Long} id
         * @memberof testdata.GithubArchiveEntity
         * @instance
         */
        GithubArchiveEntity.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GithubArchiveEntity login.
         * @member {string} login
         * @memberof testdata.GithubArchiveEntity
         * @instance
         */
        GithubArchiveEntity.prototype.login = "";

        /**
         * GithubArchiveEntity gravatarId.
         * @member {string} gravatarId
         * @memberof testdata.GithubArchiveEntity
         * @instance
         */
        GithubArchiveEntity.prototype.gravatarId = "";

        /**
         * GithubArchiveEntity avatarUrl.
         * @member {string} avatarUrl
         * @memberof testdata.GithubArchiveEntity
         * @instance
         */
        GithubArchiveEntity.prototype.avatarUrl = "";

        /**
         * GithubArchiveEntity url.
         * @member {string} url
         * @memberof testdata.GithubArchiveEntity
         * @instance
         */
        GithubArchiveEntity.prototype.url = "";

        /**
         * Creates a new GithubArchiveEntity instance using the specified properties.
         * @function create
         * @memberof testdata.GithubArchiveEntity
         * @static
         * @param {testdata.IGithubArchiveEntity=} [properties] Properties to set
         * @returns {testdata.GithubArchiveEntity} GithubArchiveEntity instance
         */
        GithubArchiveEntity.create = function create(properties) {
            return new GithubArchiveEntity(properties);
        };

        /**
         * Encodes the specified GithubArchiveEntity message. Does not implicitly {@link testdata.GithubArchiveEntity.verify|verify} messages.
         * @function encode
         * @memberof testdata.GithubArchiveEntity
         * @static
         * @param {testdata.IGithubArchiveEntity} message GithubArchiveEntity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GithubArchiveEntity.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
            if (message.login != null && Object.hasOwnProperty.call(message, "login"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.login);
            if (message.gravatarId != null && Object.hasOwnProperty.call(message, "gravatarId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.gravatarId);
            if (message.avatarUrl != null && Object.hasOwnProperty.call(message, "avatarUrl"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.avatarUrl);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.url);
            return writer;
        };

        /**
         * Encodes the specified GithubArchiveEntity message, length delimited. Does not implicitly {@link testdata.GithubArchiveEntity.verify|verify} messages.
         * @function encodeDelimited
         * @memberof testdata.GithubArchiveEntity
         * @static
         * @param {testdata.IGithubArchiveEntity} message GithubArchiveEntity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GithubArchiveEntity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GithubArchiveEntity message from the specified reader or buffer.
         * @function decode
         * @memberof testdata.GithubArchiveEntity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {testdata.GithubArchiveEntity} GithubArchiveEntity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GithubArchiveEntity.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.testdata.GithubArchiveEntity();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int64();
                        break;
                    }
                case 2: {
                        message.login = reader.string();
                        break;
                    }
                case 3: {
                        message.gravatarId = reader.string();
                        break;
                    }
                case 4: {
                        message.avatarUrl = reader.string();
                        break;
                    }
                case 5: {
                        message.url = reader.string();
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
         * Decodes a GithubArchiveEntity message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof testdata.GithubArchiveEntity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {testdata.GithubArchiveEntity} GithubArchiveEntity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GithubArchiveEntity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GithubArchiveEntity message.
         * @function verify
         * @memberof testdata.GithubArchiveEntity
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GithubArchiveEntity.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.login != null && message.hasOwnProperty("login"))
                if (!$util.isString(message.login))
                    return "login: string expected";
            if (message.gravatarId != null && message.hasOwnProperty("gravatarId"))
                if (!$util.isString(message.gravatarId))
                    return "gravatarId: string expected";
            if (message.avatarUrl != null && message.hasOwnProperty("avatarUrl"))
                if (!$util.isString(message.avatarUrl))
                    return "avatarUrl: string expected";
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            return null;
        };

        /**
         * Creates a GithubArchiveEntity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof testdata.GithubArchiveEntity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {testdata.GithubArchiveEntity} GithubArchiveEntity
         */
        GithubArchiveEntity.fromObject = function fromObject(object) {
            if (object instanceof $root.testdata.GithubArchiveEntity)
                return object;
            let message = new $root.testdata.GithubArchiveEntity();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
            if (object.login != null)
                message.login = String(object.login);
            if (object.gravatarId != null)
                message.gravatarId = String(object.gravatarId);
            if (object.avatarUrl != null)
                message.avatarUrl = String(object.avatarUrl);
            if (object.url != null)
                message.url = String(object.url);
            return message;
        };

        /**
         * Creates a plain object from a GithubArchiveEntity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof testdata.GithubArchiveEntity
         * @static
         * @param {testdata.GithubArchiveEntity} message GithubArchiveEntity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GithubArchiveEntity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
                object.login = "";
                object.gravatarId = "";
                object.avatarUrl = "";
                object.url = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
            if (message.login != null && message.hasOwnProperty("login"))
                object.login = message.login;
            if (message.gravatarId != null && message.hasOwnProperty("gravatarId"))
                object.gravatarId = message.gravatarId;
            if (message.avatarUrl != null && message.hasOwnProperty("avatarUrl"))
                object.avatarUrl = message.avatarUrl;
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            return object;
        };

        /**
         * Converts this GithubArchiveEntity to JSON.
         * @function toJSON
         * @memberof testdata.GithubArchiveEntity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GithubArchiveEntity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GithubArchiveEntity
         * @function getTypeUrl
         * @memberof testdata.GithubArchiveEntity
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GithubArchiveEntity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/testdata.GithubArchiveEntity";
        };

        return GithubArchiveEntity;
    })();

    testdata.GithubArchiveRepo = (function() {

        /**
         * Properties of a GithubArchiveRepo.
         * @memberof testdata
         * @interface IGithubArchiveRepo
         * @property {number|Long|null} [id] GithubArchiveRepo id
         * @property {string|null} [name] GithubArchiveRepo name
         * @property {string|null} [url] GithubArchiveRepo url
         */

        /**
         * Constructs a new GithubArchiveRepo.
         * @memberof testdata
         * @classdesc Represents a GithubArchiveRepo.
         * @implements IGithubArchiveRepo
         * @constructor
         * @param {testdata.IGithubArchiveRepo=} [properties] Properties to set
         */
        function GithubArchiveRepo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GithubArchiveRepo id.
         * @member {number|Long} id
         * @memberof testdata.GithubArchiveRepo
         * @instance
         */
        GithubArchiveRepo.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GithubArchiveRepo name.
         * @member {string} name
         * @memberof testdata.GithubArchiveRepo
         * @instance
         */
        GithubArchiveRepo.prototype.name = "";

        /**
         * GithubArchiveRepo url.
         * @member {string} url
         * @memberof testdata.GithubArchiveRepo
         * @instance
         */
        GithubArchiveRepo.prototype.url = "";

        /**
         * Creates a new GithubArchiveRepo instance using the specified properties.
         * @function create
         * @memberof testdata.GithubArchiveRepo
         * @static
         * @param {testdata.IGithubArchiveRepo=} [properties] Properties to set
         * @returns {testdata.GithubArchiveRepo} GithubArchiveRepo instance
         */
        GithubArchiveRepo.create = function create(properties) {
            return new GithubArchiveRepo(properties);
        };

        /**
         * Encodes the specified GithubArchiveRepo message. Does not implicitly {@link testdata.GithubArchiveRepo.verify|verify} messages.
         * @function encode
         * @memberof testdata.GithubArchiveRepo
         * @static
         * @param {testdata.IGithubArchiveRepo} message GithubArchiveRepo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GithubArchiveRepo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.url);
            return writer;
        };

        /**
         * Encodes the specified GithubArchiveRepo message, length delimited. Does not implicitly {@link testdata.GithubArchiveRepo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof testdata.GithubArchiveRepo
         * @static
         * @param {testdata.IGithubArchiveRepo} message GithubArchiveRepo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GithubArchiveRepo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GithubArchiveRepo message from the specified reader or buffer.
         * @function decode
         * @memberof testdata.GithubArchiveRepo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {testdata.GithubArchiveRepo} GithubArchiveRepo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GithubArchiveRepo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.testdata.GithubArchiveRepo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int64();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.url = reader.string();
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
         * Decodes a GithubArchiveRepo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof testdata.GithubArchiveRepo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {testdata.GithubArchiveRepo} GithubArchiveRepo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GithubArchiveRepo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GithubArchiveRepo message.
         * @function verify
         * @memberof testdata.GithubArchiveRepo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GithubArchiveRepo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            return null;
        };

        /**
         * Creates a GithubArchiveRepo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof testdata.GithubArchiveRepo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {testdata.GithubArchiveRepo} GithubArchiveRepo
         */
        GithubArchiveRepo.fromObject = function fromObject(object) {
            if (object instanceof $root.testdata.GithubArchiveRepo)
                return object;
            let message = new $root.testdata.GithubArchiveRepo();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
            if (object.name != null)
                message.name = String(object.name);
            if (object.url != null)
                message.url = String(object.url);
            return message;
        };

        /**
         * Creates a plain object from a GithubArchiveRepo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof testdata.GithubArchiveRepo
         * @static
         * @param {testdata.GithubArchiveRepo} message GithubArchiveRepo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GithubArchiveRepo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
                object.name = "";
                object.url = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            return object;
        };

        /**
         * Converts this GithubArchiveRepo to JSON.
         * @function toJSON
         * @memberof testdata.GithubArchiveRepo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GithubArchiveRepo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GithubArchiveRepo
         * @function getTypeUrl
         * @memberof testdata.GithubArchiveRepo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GithubArchiveRepo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/testdata.GithubArchiveRepo";
        };

        return GithubArchiveRepo;
    })();

    testdata.GithubArchiveMessage = (function() {

        /**
         * Properties of a GithubArchiveMessage.
         * @memberof testdata
         * @interface IGithubArchiveMessage
         * @property {string|null} [type] GithubArchiveMessage type
         * @property {boolean|null} ["public"] GithubArchiveMessage public
         * @property {string|null} [payload] GithubArchiveMessage payload
         * @property {testdata.IGithubArchiveRepo|null} [repo] GithubArchiveMessage repo
         * @property {testdata.IGithubArchiveEntity|null} [actor] GithubArchiveMessage actor
         * @property {testdata.IGithubArchiveEntity|null} [org] GithubArchiveMessage org
         * @property {number|Long|null} [createdAt] GithubArchiveMessage createdAt
         * @property {string|null} [id] GithubArchiveMessage id
         * @property {string|null} [other] GithubArchiveMessage other
         */

        /**
         * Constructs a new GithubArchiveMessage.
         * @memberof testdata
         * @classdesc Represents a GithubArchiveMessage.
         * @implements IGithubArchiveMessage
         * @constructor
         * @param {testdata.IGithubArchiveMessage=} [properties] Properties to set
         */
        function GithubArchiveMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GithubArchiveMessage type.
         * @member {string} type
         * @memberof testdata.GithubArchiveMessage
         * @instance
         */
        GithubArchiveMessage.prototype.type = "";

        /**
         * GithubArchiveMessage public.
         * @member {boolean} public
         * @memberof testdata.GithubArchiveMessage
         * @instance
         */
        GithubArchiveMessage.prototype["public"] = false;

        /**
         * GithubArchiveMessage payload.
         * @member {string} payload
         * @memberof testdata.GithubArchiveMessage
         * @instance
         */
        GithubArchiveMessage.prototype.payload = "";

        /**
         * GithubArchiveMessage repo.
         * @member {testdata.IGithubArchiveRepo|null|undefined} repo
         * @memberof testdata.GithubArchiveMessage
         * @instance
         */
        GithubArchiveMessage.prototype.repo = null;

        /**
         * GithubArchiveMessage actor.
         * @member {testdata.IGithubArchiveEntity|null|undefined} actor
         * @memberof testdata.GithubArchiveMessage
         * @instance
         */
        GithubArchiveMessage.prototype.actor = null;

        /**
         * GithubArchiveMessage org.
         * @member {testdata.IGithubArchiveEntity|null|undefined} org
         * @memberof testdata.GithubArchiveMessage
         * @instance
         */
        GithubArchiveMessage.prototype.org = null;

        /**
         * GithubArchiveMessage createdAt.
         * @member {number|Long} createdAt
         * @memberof testdata.GithubArchiveMessage
         * @instance
         */
        GithubArchiveMessage.prototype.createdAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GithubArchiveMessage id.
         * @member {string} id
         * @memberof testdata.GithubArchiveMessage
         * @instance
         */
        GithubArchiveMessage.prototype.id = "";

        /**
         * GithubArchiveMessage other.
         * @member {string} other
         * @memberof testdata.GithubArchiveMessage
         * @instance
         */
        GithubArchiveMessage.prototype.other = "";

        /**
         * Creates a new GithubArchiveMessage instance using the specified properties.
         * @function create
         * @memberof testdata.GithubArchiveMessage
         * @static
         * @param {testdata.IGithubArchiveMessage=} [properties] Properties to set
         * @returns {testdata.GithubArchiveMessage} GithubArchiveMessage instance
         */
        GithubArchiveMessage.create = function create(properties) {
            return new GithubArchiveMessage(properties);
        };

        /**
         * Encodes the specified GithubArchiveMessage message. Does not implicitly {@link testdata.GithubArchiveMessage.verify|verify} messages.
         * @function encode
         * @memberof testdata.GithubArchiveMessage
         * @static
         * @param {testdata.IGithubArchiveMessage} message GithubArchiveMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GithubArchiveMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
            if (message["public"] != null && Object.hasOwnProperty.call(message, "public"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message["public"]);
            if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.payload);
            if (message.repo != null && Object.hasOwnProperty.call(message, "repo"))
                $root.testdata.GithubArchiveRepo.encode(message.repo, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.actor != null && Object.hasOwnProperty.call(message, "actor"))
                $root.testdata.GithubArchiveEntity.encode(message.actor, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.org != null && Object.hasOwnProperty.call(message, "org"))
                $root.testdata.GithubArchiveEntity.encode(message.org, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.createdAt);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.id);
            if (message.other != null && Object.hasOwnProperty.call(message, "other"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.other);
            return writer;
        };

        /**
         * Encodes the specified GithubArchiveMessage message, length delimited. Does not implicitly {@link testdata.GithubArchiveMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof testdata.GithubArchiveMessage
         * @static
         * @param {testdata.IGithubArchiveMessage} message GithubArchiveMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GithubArchiveMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GithubArchiveMessage message from the specified reader or buffer.
         * @function decode
         * @memberof testdata.GithubArchiveMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {testdata.GithubArchiveMessage} GithubArchiveMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GithubArchiveMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.testdata.GithubArchiveMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.string();
                        break;
                    }
                case 2: {
                        message["public"] = reader.bool();
                        break;
                    }
                case 3: {
                        message.payload = reader.string();
                        break;
                    }
                case 4: {
                        message.repo = $root.testdata.GithubArchiveRepo.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.actor = $root.testdata.GithubArchiveEntity.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.org = $root.testdata.GithubArchiveEntity.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.createdAt = reader.int64();
                        break;
                    }
                case 8: {
                        message.id = reader.string();
                        break;
                    }
                case 9: {
                        message.other = reader.string();
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
         * Decodes a GithubArchiveMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof testdata.GithubArchiveMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {testdata.GithubArchiveMessage} GithubArchiveMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GithubArchiveMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GithubArchiveMessage message.
         * @function verify
         * @memberof testdata.GithubArchiveMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GithubArchiveMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message["public"] != null && message.hasOwnProperty("public"))
                if (typeof message["public"] !== "boolean")
                    return "public: boolean expected";
            if (message.payload != null && message.hasOwnProperty("payload"))
                if (!$util.isString(message.payload))
                    return "payload: string expected";
            if (message.repo != null && message.hasOwnProperty("repo")) {
                let error = $root.testdata.GithubArchiveRepo.verify(message.repo);
                if (error)
                    return "repo." + error;
            }
            if (message.actor != null && message.hasOwnProperty("actor")) {
                let error = $root.testdata.GithubArchiveEntity.verify(message.actor);
                if (error)
                    return "actor." + error;
            }
            if (message.org != null && message.hasOwnProperty("org")) {
                let error = $root.testdata.GithubArchiveEntity.verify(message.org);
                if (error)
                    return "org." + error;
            }
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                if (!$util.isInteger(message.createdAt) && !(message.createdAt && $util.isInteger(message.createdAt.low) && $util.isInteger(message.createdAt.high)))
                    return "createdAt: integer|Long expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.other != null && message.hasOwnProperty("other"))
                if (!$util.isString(message.other))
                    return "other: string expected";
            return null;
        };

        /**
         * Creates a GithubArchiveMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof testdata.GithubArchiveMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {testdata.GithubArchiveMessage} GithubArchiveMessage
         */
        GithubArchiveMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.testdata.GithubArchiveMessage)
                return object;
            let message = new $root.testdata.GithubArchiveMessage();
            if (object.type != null)
                message.type = String(object.type);
            if (object["public"] != null)
                message["public"] = Boolean(object["public"]);
            if (object.payload != null)
                message.payload = String(object.payload);
            if (object.repo != null) {
                if (typeof object.repo !== "object")
                    throw TypeError(".testdata.GithubArchiveMessage.repo: object expected");
                message.repo = $root.testdata.GithubArchiveRepo.fromObject(object.repo);
            }
            if (object.actor != null) {
                if (typeof object.actor !== "object")
                    throw TypeError(".testdata.GithubArchiveMessage.actor: object expected");
                message.actor = $root.testdata.GithubArchiveEntity.fromObject(object.actor);
            }
            if (object.org != null) {
                if (typeof object.org !== "object")
                    throw TypeError(".testdata.GithubArchiveMessage.org: object expected");
                message.org = $root.testdata.GithubArchiveEntity.fromObject(object.org);
            }
            if (object.createdAt != null)
                if ($util.Long)
                    (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned = false;
                else if (typeof object.createdAt === "string")
                    message.createdAt = parseInt(object.createdAt, 10);
                else if (typeof object.createdAt === "number")
                    message.createdAt = object.createdAt;
                else if (typeof object.createdAt === "object")
                    message.createdAt = new $util.LongBits(object.createdAt.low >>> 0, object.createdAt.high >>> 0).toNumber();
            if (object.id != null)
                message.id = String(object.id);
            if (object.other != null)
                message.other = String(object.other);
            return message;
        };

        /**
         * Creates a plain object from a GithubArchiveMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof testdata.GithubArchiveMessage
         * @static
         * @param {testdata.GithubArchiveMessage} message GithubArchiveMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GithubArchiveMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = "";
                object["public"] = false;
                object.payload = "";
                object.repo = null;
                object.actor = null;
                object.org = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.createdAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createdAt = options.longs === String ? "0" : 0;
                object.id = "";
                object.other = "";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message["public"] != null && message.hasOwnProperty("public"))
                object["public"] = message["public"];
            if (message.payload != null && message.hasOwnProperty("payload"))
                object.payload = message.payload;
            if (message.repo != null && message.hasOwnProperty("repo"))
                object.repo = $root.testdata.GithubArchiveRepo.toObject(message.repo, options);
            if (message.actor != null && message.hasOwnProperty("actor"))
                object.actor = $root.testdata.GithubArchiveEntity.toObject(message.actor, options);
            if (message.org != null && message.hasOwnProperty("org"))
                object.org = $root.testdata.GithubArchiveEntity.toObject(message.org, options);
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                if (typeof message.createdAt === "number")
                    object.createdAt = options.longs === String ? String(message.createdAt) : message.createdAt;
                else
                    object.createdAt = options.longs === String ? $util.Long.prototype.toString.call(message.createdAt) : options.longs === Number ? new $util.LongBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0).toNumber() : message.createdAt;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.other != null && message.hasOwnProperty("other"))
                object.other = message.other;
            return object;
        };

        /**
         * Converts this GithubArchiveMessage to JSON.
         * @function toJSON
         * @memberof testdata.GithubArchiveMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GithubArchiveMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GithubArchiveMessage
         * @function getTypeUrl
         * @memberof testdata.GithubArchiveMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GithubArchiveMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/testdata.GithubArchiveMessage";
        };

        return GithubArchiveMessage;
    })();

    /**
     * ExtEnum enum.
     * @name testdata.ExtEnum
     * @enum {number}
     * @property {number} UNDEFINED=0 UNDEFINED value
     * @property {number} THING=1 THING value
     * @property {number} OTHER_THING=2 OTHER_THING value
     */
    testdata.ExtEnum = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNDEFINED"] = 0;
        values[valuesById[1] = "THING"] = 1;
        values[valuesById[2] = "OTHER_THING"] = 2;
        return values;
    })();

    testdata.ExternalEnumMessage = (function() {

        /**
         * Properties of an ExternalEnumMessage.
         * @memberof testdata
         * @interface IExternalEnumMessage
         * @property {testdata.IEnumMsgA|null} [msgA] ExternalEnumMessage msgA
         * @property {testdata.IEnumMsgB|null} [msgB] ExternalEnumMessage msgB
         */

        /**
         * Constructs a new ExternalEnumMessage.
         * @memberof testdata
         * @classdesc Represents an ExternalEnumMessage.
         * @implements IExternalEnumMessage
         * @constructor
         * @param {testdata.IExternalEnumMessage=} [properties] Properties to set
         */
        function ExternalEnumMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ExternalEnumMessage msgA.
         * @member {testdata.IEnumMsgA|null|undefined} msgA
         * @memberof testdata.ExternalEnumMessage
         * @instance
         */
        ExternalEnumMessage.prototype.msgA = null;

        /**
         * ExternalEnumMessage msgB.
         * @member {testdata.IEnumMsgB|null|undefined} msgB
         * @memberof testdata.ExternalEnumMessage
         * @instance
         */
        ExternalEnumMessage.prototype.msgB = null;

        /**
         * Creates a new ExternalEnumMessage instance using the specified properties.
         * @function create
         * @memberof testdata.ExternalEnumMessage
         * @static
         * @param {testdata.IExternalEnumMessage=} [properties] Properties to set
         * @returns {testdata.ExternalEnumMessage} ExternalEnumMessage instance
         */
        ExternalEnumMessage.create = function create(properties) {
            return new ExternalEnumMessage(properties);
        };

        /**
         * Encodes the specified ExternalEnumMessage message. Does not implicitly {@link testdata.ExternalEnumMessage.verify|verify} messages.
         * @function encode
         * @memberof testdata.ExternalEnumMessage
         * @static
         * @param {testdata.IExternalEnumMessage} message ExternalEnumMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExternalEnumMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msgA != null && Object.hasOwnProperty.call(message, "msgA"))
                $root.testdata.EnumMsgA.encode(message.msgA, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.msgB != null && Object.hasOwnProperty.call(message, "msgB"))
                $root.testdata.EnumMsgB.encode(message.msgB, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ExternalEnumMessage message, length delimited. Does not implicitly {@link testdata.ExternalEnumMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof testdata.ExternalEnumMessage
         * @static
         * @param {testdata.IExternalEnumMessage} message ExternalEnumMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExternalEnumMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExternalEnumMessage message from the specified reader or buffer.
         * @function decode
         * @memberof testdata.ExternalEnumMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {testdata.ExternalEnumMessage} ExternalEnumMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExternalEnumMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.testdata.ExternalEnumMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.msgA = $root.testdata.EnumMsgA.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.msgB = $root.testdata.EnumMsgB.decode(reader, reader.uint32());
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
         * Decodes an ExternalEnumMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof testdata.ExternalEnumMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {testdata.ExternalEnumMessage} ExternalEnumMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExternalEnumMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExternalEnumMessage message.
         * @function verify
         * @memberof testdata.ExternalEnumMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExternalEnumMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msgA != null && message.hasOwnProperty("msgA")) {
                let error = $root.testdata.EnumMsgA.verify(message.msgA);
                if (error)
                    return "msgA." + error;
            }
            if (message.msgB != null && message.hasOwnProperty("msgB")) {
                let error = $root.testdata.EnumMsgB.verify(message.msgB);
                if (error)
                    return "msgB." + error;
            }
            return null;
        };

        /**
         * Creates an ExternalEnumMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof testdata.ExternalEnumMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {testdata.ExternalEnumMessage} ExternalEnumMessage
         */
        ExternalEnumMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.testdata.ExternalEnumMessage)
                return object;
            let message = new $root.testdata.ExternalEnumMessage();
            if (object.msgA != null) {
                if (typeof object.msgA !== "object")
                    throw TypeError(".testdata.ExternalEnumMessage.msgA: object expected");
                message.msgA = $root.testdata.EnumMsgA.fromObject(object.msgA);
            }
            if (object.msgB != null) {
                if (typeof object.msgB !== "object")
                    throw TypeError(".testdata.ExternalEnumMessage.msgB: object expected");
                message.msgB = $root.testdata.EnumMsgB.fromObject(object.msgB);
            }
            return message;
        };

        /**
         * Creates a plain object from an ExternalEnumMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof testdata.ExternalEnumMessage
         * @static
         * @param {testdata.ExternalEnumMessage} message ExternalEnumMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExternalEnumMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.msgA = null;
                object.msgB = null;
            }
            if (message.msgA != null && message.hasOwnProperty("msgA"))
                object.msgA = $root.testdata.EnumMsgA.toObject(message.msgA, options);
            if (message.msgB != null && message.hasOwnProperty("msgB"))
                object.msgB = $root.testdata.EnumMsgB.toObject(message.msgB, options);
            return object;
        };

        /**
         * Converts this ExternalEnumMessage to JSON.
         * @function toJSON
         * @memberof testdata.ExternalEnumMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExternalEnumMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ExternalEnumMessage
         * @function getTypeUrl
         * @memberof testdata.ExternalEnumMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ExternalEnumMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/testdata.ExternalEnumMessage";
        };

        return ExternalEnumMessage;
    })();

    testdata.EnumMsgA = (function() {

        /**
         * Properties of an EnumMsgA.
         * @memberof testdata
         * @interface IEnumMsgA
         * @property {string|null} [foo] EnumMsgA foo
         * @property {testdata.ExtEnum|null} [bar] EnumMsgA bar
         */

        /**
         * Constructs a new EnumMsgA.
         * @memberof testdata
         * @classdesc Represents an EnumMsgA.
         * @implements IEnumMsgA
         * @constructor
         * @param {testdata.IEnumMsgA=} [properties] Properties to set
         */
        function EnumMsgA(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnumMsgA foo.
         * @member {string} foo
         * @memberof testdata.EnumMsgA
         * @instance
         */
        EnumMsgA.prototype.foo = "";

        /**
         * EnumMsgA bar.
         * @member {testdata.ExtEnum} bar
         * @memberof testdata.EnumMsgA
         * @instance
         */
        EnumMsgA.prototype.bar = 0;

        /**
         * Creates a new EnumMsgA instance using the specified properties.
         * @function create
         * @memberof testdata.EnumMsgA
         * @static
         * @param {testdata.IEnumMsgA=} [properties] Properties to set
         * @returns {testdata.EnumMsgA} EnumMsgA instance
         */
        EnumMsgA.create = function create(properties) {
            return new EnumMsgA(properties);
        };

        /**
         * Encodes the specified EnumMsgA message. Does not implicitly {@link testdata.EnumMsgA.verify|verify} messages.
         * @function encode
         * @memberof testdata.EnumMsgA
         * @static
         * @param {testdata.IEnumMsgA} message EnumMsgA message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnumMsgA.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.foo != null && Object.hasOwnProperty.call(message, "foo"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.foo);
            if (message.bar != null && Object.hasOwnProperty.call(message, "bar"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.bar);
            return writer;
        };

        /**
         * Encodes the specified EnumMsgA message, length delimited. Does not implicitly {@link testdata.EnumMsgA.verify|verify} messages.
         * @function encodeDelimited
         * @memberof testdata.EnumMsgA
         * @static
         * @param {testdata.IEnumMsgA} message EnumMsgA message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnumMsgA.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnumMsgA message from the specified reader or buffer.
         * @function decode
         * @memberof testdata.EnumMsgA
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {testdata.EnumMsgA} EnumMsgA
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnumMsgA.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.testdata.EnumMsgA();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.foo = reader.string();
                        break;
                    }
                case 2: {
                        message.bar = reader.int32();
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
         * Decodes an EnumMsgA message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof testdata.EnumMsgA
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {testdata.EnumMsgA} EnumMsgA
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnumMsgA.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnumMsgA message.
         * @function verify
         * @memberof testdata.EnumMsgA
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnumMsgA.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.foo != null && message.hasOwnProperty("foo"))
                if (!$util.isString(message.foo))
                    return "foo: string expected";
            if (message.bar != null && message.hasOwnProperty("bar"))
                switch (message.bar) {
                default:
                    return "bar: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            return null;
        };

        /**
         * Creates an EnumMsgA message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof testdata.EnumMsgA
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {testdata.EnumMsgA} EnumMsgA
         */
        EnumMsgA.fromObject = function fromObject(object) {
            if (object instanceof $root.testdata.EnumMsgA)
                return object;
            let message = new $root.testdata.EnumMsgA();
            if (object.foo != null)
                message.foo = String(object.foo);
            switch (object.bar) {
            default:
                if (typeof object.bar === "number") {
                    message.bar = object.bar;
                    break;
                }
                break;
            case "UNDEFINED":
            case 0:
                message.bar = 0;
                break;
            case "THING":
            case 1:
                message.bar = 1;
                break;
            case "OTHER_THING":
            case 2:
                message.bar = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an EnumMsgA message. Also converts values to other types if specified.
         * @function toObject
         * @memberof testdata.EnumMsgA
         * @static
         * @param {testdata.EnumMsgA} message EnumMsgA
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnumMsgA.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.foo = "";
                object.bar = options.enums === String ? "UNDEFINED" : 0;
            }
            if (message.foo != null && message.hasOwnProperty("foo"))
                object.foo = message.foo;
            if (message.bar != null && message.hasOwnProperty("bar"))
                object.bar = options.enums === String ? $root.testdata.ExtEnum[message.bar] === undefined ? message.bar : $root.testdata.ExtEnum[message.bar] : message.bar;
            return object;
        };

        /**
         * Converts this EnumMsgA to JSON.
         * @function toJSON
         * @memberof testdata.EnumMsgA
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnumMsgA.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EnumMsgA
         * @function getTypeUrl
         * @memberof testdata.EnumMsgA
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EnumMsgA.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/testdata.EnumMsgA";
        };

        return EnumMsgA;
    })();

    testdata.EnumMsgB = (function() {

        /**
         * Properties of an EnumMsgB.
         * @memberof testdata
         * @interface IEnumMsgB
         * @property {testdata.ExtEnum|null} [baz] EnumMsgB baz
         */

        /**
         * Constructs a new EnumMsgB.
         * @memberof testdata
         * @classdesc Represents an EnumMsgB.
         * @implements IEnumMsgB
         * @constructor
         * @param {testdata.IEnumMsgB=} [properties] Properties to set
         */
        function EnumMsgB(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnumMsgB baz.
         * @member {testdata.ExtEnum} baz
         * @memberof testdata.EnumMsgB
         * @instance
         */
        EnumMsgB.prototype.baz = 0;

        /**
         * Creates a new EnumMsgB instance using the specified properties.
         * @function create
         * @memberof testdata.EnumMsgB
         * @static
         * @param {testdata.IEnumMsgB=} [properties] Properties to set
         * @returns {testdata.EnumMsgB} EnumMsgB instance
         */
        EnumMsgB.create = function create(properties) {
            return new EnumMsgB(properties);
        };

        /**
         * Encodes the specified EnumMsgB message. Does not implicitly {@link testdata.EnumMsgB.verify|verify} messages.
         * @function encode
         * @memberof testdata.EnumMsgB
         * @static
         * @param {testdata.IEnumMsgB} message EnumMsgB message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnumMsgB.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.baz != null && Object.hasOwnProperty.call(message, "baz"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.baz);
            return writer;
        };

        /**
         * Encodes the specified EnumMsgB message, length delimited. Does not implicitly {@link testdata.EnumMsgB.verify|verify} messages.
         * @function encodeDelimited
         * @memberof testdata.EnumMsgB
         * @static
         * @param {testdata.IEnumMsgB} message EnumMsgB message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnumMsgB.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnumMsgB message from the specified reader or buffer.
         * @function decode
         * @memberof testdata.EnumMsgB
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {testdata.EnumMsgB} EnumMsgB
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnumMsgB.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.testdata.EnumMsgB();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.baz = reader.int32();
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
         * Decodes an EnumMsgB message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof testdata.EnumMsgB
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {testdata.EnumMsgB} EnumMsgB
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnumMsgB.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnumMsgB message.
         * @function verify
         * @memberof testdata.EnumMsgB
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnumMsgB.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.baz != null && message.hasOwnProperty("baz"))
                switch (message.baz) {
                default:
                    return "baz: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            return null;
        };

        /**
         * Creates an EnumMsgB message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof testdata.EnumMsgB
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {testdata.EnumMsgB} EnumMsgB
         */
        EnumMsgB.fromObject = function fromObject(object) {
            if (object instanceof $root.testdata.EnumMsgB)
                return object;
            let message = new $root.testdata.EnumMsgB();
            switch (object.baz) {
            default:
                if (typeof object.baz === "number") {
                    message.baz = object.baz;
                    break;
                }
                break;
            case "UNDEFINED":
            case 0:
                message.baz = 0;
                break;
            case "THING":
            case 1:
                message.baz = 1;
                break;
            case "OTHER_THING":
            case 2:
                message.baz = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an EnumMsgB message. Also converts values to other types if specified.
         * @function toObject
         * @memberof testdata.EnumMsgB
         * @static
         * @param {testdata.EnumMsgB} message EnumMsgB
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnumMsgB.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.baz = options.enums === String ? "UNDEFINED" : 0;
            if (message.baz != null && message.hasOwnProperty("baz"))
                object.baz = options.enums === String ? $root.testdata.ExtEnum[message.baz] === undefined ? message.baz : $root.testdata.ExtEnum[message.baz] : message.baz;
            return object;
        };

        /**
         * Converts this EnumMsgB to JSON.
         * @function toJSON
         * @memberof testdata.EnumMsgB
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnumMsgB.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EnumMsgB
         * @function getTypeUrl
         * @memberof testdata.EnumMsgB
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EnumMsgB.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/testdata.EnumMsgB";
        };

        return EnumMsgB;
    })();

    return testdata;
})();

export { $root as default };
