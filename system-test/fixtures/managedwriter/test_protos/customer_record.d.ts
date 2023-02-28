import * as $protobuf from 'protobufjs';
import Long = require('long');
/** Namespace customer_record. */
export namespace customer_record {
  /** Properties of a CustomerRecord. */
  interface ICustomerRecord {
    /** CustomerRecord customerName */
    customerName?: string | null;

    /** CustomerRecord rowNum */
    rowNum: number | Long;
  }

  /** Represents a CustomerRecord. */
  class CustomerRecord implements ICustomerRecord {
    /**
     * Constructs a new CustomerRecord.
     * @param [properties] Properties to set
     */
    constructor(properties?: customer_record.ICustomerRecord);

    /** CustomerRecord customerName. */
    public customerName: string;

    /** CustomerRecord rowNum. */
    public rowNum: number | Long;

    /**
     * Creates a new CustomerRecord instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CustomerRecord instance
     */
    public static create(
      properties?: customer_record.ICustomerRecord
    ): customer_record.CustomerRecord;

    /**
     * Encodes the specified CustomerRecord message. Does not implicitly {@link customer_record.CustomerRecord.verify|verify} messages.
     * @param message CustomerRecord message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: customer_record.ICustomerRecord,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified CustomerRecord message, length delimited. Does not implicitly {@link customer_record.CustomerRecord.verify|verify} messages.
     * @param message CustomerRecord message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: customer_record.ICustomerRecord,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a CustomerRecord message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CustomerRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): customer_record.CustomerRecord;

    /**
     * Decodes a CustomerRecord message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CustomerRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): customer_record.CustomerRecord;

    /**
     * Verifies a CustomerRecord message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: {[k: string]: any}): string | null;

    /**
     * Creates a CustomerRecord message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CustomerRecord
     */
    public static fromObject(object: {
      [k: string]: any;
    }): customer_record.CustomerRecord;

    /**
     * Creates a plain object from a CustomerRecord message. Also converts values to other types if specified.
     * @param message CustomerRecord
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: customer_record.CustomerRecord,
      options?: $protobuf.IConversionOptions
    ): {[k: string]: any};

    /**
     * Converts this CustomerRecord to JSON.
     * @returns JSON object
     */
    public toJSON(): {[k: string]: any};

    /**
     * Gets the default type url for CustomerRecord
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }
}
