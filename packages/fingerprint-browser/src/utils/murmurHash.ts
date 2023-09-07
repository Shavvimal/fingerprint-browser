const rotateLeft = (m: number, n: number): number => {
  // Gives `m` left rotated as a 32-bit int
  return (m << n) | (m >>> (32 - n));
};

export const murmurHash32 = (key: string): number => {
  // A TypeScript implementation of unsigned 32-bit MurmurHash3.
  // https://github.com/N8Brooks/murmur_hash_3
  // https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash3.cpp
  const C1 = 0xcc9e2d51;
  const C2 = 0x1b873593;
  const R1 = 15;
  const R2 = 13;
  const M = 5;
  const N = 0xe6546b64;
  const textEncoder = new TextEncoder();

  const bytes = textEncoder.encode(key);
  let hash = 0;

  const doubleWords = new Uint32Array(
    bytes.buffer,
    0,
    Math.floor(bytes.length / 4)
  );

  for (let i = 0; i < doubleWords.length; i++) {
    let k = doubleWords[i];
    k = Math.imul(k, C1);
    k = rotateLeft(k, R1);
    k = Math.imul(k, C2);
    hash ^= k;
    hash = rotateLeft(hash, R2);
    hash = Math.imul(hash, M) + N;
  }

  const remainingBytes = bytes.length % 4;
  const i = bytes.length - remainingBytes;
  let k = 0;
  switch (remainingBytes) {
    case 3:
      k |= bytes[i + 2] << 16;
    case 2:
      k |= bytes[i + 1] << 8;
    case 1:
      k |= bytes[i];

      k = Math.imul(k, C1);
      k = rotateLeft(k, R1);
      k = Math.imul(k, C2);

      hash ^= k;
  }

  hash ^= bytes.length;
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;

  return hash >>> 0;
};
