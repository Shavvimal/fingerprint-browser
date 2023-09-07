"use client";
import { FingerprintFactory } from "./fingerprintFactory";

export let getBrowserFingerprint = (debug: boolean = false): string => {
  debug && console.time("getBrowserFingerprint");
  let fingerprint = FingerprintFactory.create(debug);
  debug && console.timeEnd("getBrowserFingerprint");
  return fingerprint.generateHash();
};

export let getBrowserFingerprintData = (debug: boolean = false): any => {
  let fingerprint = FingerprintFactory.create(debug);
  return fingerprint.browserData;
};
