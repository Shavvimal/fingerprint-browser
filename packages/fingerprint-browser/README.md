# Fingerprint Browser

## What is a Device Fingerprint?

Identification of visitors crucial to most web sites, either to provide content or track miscreants. The most common mechanism to track users is a simple cookie file. As browsers have evolved many have made tracking with this method problematic (e.g. by activating the “incognito” mode in web browsers). Cookies also fail to identify a user who uses several different web browsers on the same device. This led to the development of the device fingerprint — a unique user identifier which does not change between successive sessions and which does not depend on the selected web browser.

A device fingerprint is known by many names including a machine fingerprint, browser fingerprint, device print, user fingerprint and others. It is composed of information collected about an online computing device for the purpose of unique identification of the device on subsequent visits. A device fingerprint can fully or partially identify individual users or devices even when cookies and other tracking data is turned off.

Basic web browser information has long been collected by web analytics services in an effort to accurately measure real human web traffic and discount various forms of click fraud. With the assistance of client-side scripting languages, the collection of much more esoteric parameters is possible. Device fingerprints have proven useful in the detection and prevention of online identity theft and credit card fraud.

The Darkwave Technologies device fingerprint project was created to develop highly reliable code to make it simpler for developers to create a device fingerprint system for use in online fraud prevention and the prevention of general malicious behavior.

# To avoid Hydration Errors

To avoid the hydration errors we ge when using checks like `typeof window !== 'undefined'` in the logic, use the following approach:

```TypeScript
  const [browserFingerprint, setBrowserFingerprint] = useState("");
  useEffect(() => {
    setBrowserFingerprint(fingerprintBrowser());
  }, []);
```

hooks aren’t run when doing server-side rendering. Wrapping the usage of window inside a useEffect that is triggered on mount means the server will never execute it and the client will execute it after hydration.

## Create a Typescript and React Module

- How to Create a Typescript and React Module: https://www.pluralsight.com/guides/react-typescript-module-create
- https://medium.com/weekly-webtips/how-to-build-a-react-library-with-typescript-d0f08a1f517e

# Fingerprint TS

Based on get-browser-fingerprint by @damianobarbati

Zero dependencies package exporting a single, fast (<15ms) and synchronous function which computes a browser fingerprint, without requiring any permission to the user.

This is a javascript only way to fingerprint a user with better than 90% accuracy in as few bytes as possible and no cookie storage!

Special thanks to Valentin Vasilyev for the original fingerprintjs slightly modified and to Open Source Device Fingerprinting by Dark Wave Tech for the various identity functions

Be careful: the strongest discriminating factor is canvas token which can't be computed on old devices (eg: iPhone 6), deal accordingly ⚠️

Special thanks to Valentin Vasilyev for the original fingerprintjs slightly modified and to Open Source Device Fingerprinting by Dark Wave Tech for the various identity functions

Refs:

- https://github.com/damianobarbati/get-browser-fingerprint
- https://codepen.io/run-time/pen/XJNXWV

# get-browser-fingerprint

Zero dependencies package exporting a single, fast (<15ms) and synchronous function which computes a browser fingerprint, without requiring any permission to the user.

## Usage

Get browser fingerprint:

```js
import getBrowserFingerprint from "get-browser-fingerprint";
const fingerprint = getBrowserFingerprint();
console.log(fingerprint);
```

Options available:

- `hardwareOnly` (default `false`): leverage only hardware info about device
- `enableWebgl` (default `false`): enable webgl renderer, ~4x times slower but adds another deadly powerful hardware detection layer on top of canvas
- `debug`: log data used to generate fingerprint to console and add canvas/webgl canvas to body to see rendered image (default `false`)

⚠️ Be careful: the strongest discriminating factor is canvas token which can't be computed on old devices (eg: iPhone 6), deal accordingly ⚠️

## Development

To test locally:

```sh
nvm install
yarn install
yarn test
```

To run example locally:

```sh
yarn http-server src -o -c-1 -p 80
```
