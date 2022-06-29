import crc32 from 'buffer-crc32';

const decimalFromString = (text: string) =>
  crc32(crc32(text)).readUInt32LE(0) / 4294967295;

export default decimalFromString;
