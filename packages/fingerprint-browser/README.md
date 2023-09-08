# Fingerprint Browser

This is a 0 dependency package that exports a single, fast and synchronous function which computes a browser fingerprint, without requiring any permission to the user, designed to be used in NextJs.

## What is a Device Fingerprint?

Many techniques are used when generating a highly accurate browser fingerprint, which gathers information about the user to distinguish them from millions of others online.

Also known as online fingerprinting, browser fingerprinting is a tracking and identification method websites use to associate individual browsing sessions with one site visitor. Using Javascript, a plethora of data can be collected about a user’s web browser and device. When you stitch these pieces of information together, they reveal a unique combination of information that forms every user’s own ‘digital fingerprint.’’ The browser fingerprint is traceable across browsing sessions, even when the user enters incognito browsing or uses a VPN to access a site.

Browser fingerprinting is one way to stop fraudsters from attempting to hack or spam website owners by accurately identifying site users. Browser fingerprinting is more difficult to circumvent than cookies, as a user’s fingerprint does not change between incognito browsing sessions or clearing browser data. A browser fingerprinting script must use various data (called signals) gathering techniques, which vary between visitors, to generate an accurate enough (called entropy) fingerprint for each distinct web visitor. For example, while many visitors to a website may have the same model of iPhone, the software and drivers installed, geolocation, browser and OS version, and even minute variances in the hardware could be different.Each browser fingerprinting technique can gather one or more of these signals that aim to identify these minor variances between users.

# What information is gathered?

Browser fingerprinting can gather a lot of information from a browser: the user’s device model, its operating system, its browser version, user timezone, preferred language settings, ad blocker used, screen resolution, and all the granular tech specs of his CPU, graphics card, and so on.

The data this package uses is:

```TypeScript
interface BrowserData {
  osString: string;
  languages: readonly string[];
  userAgent: string;
  cookieEnabled: boolean;
  doNotTrack: string | null;
  hardwareConcurrency: number;
  language: string;
  maxTouchPoints: number;
  pdfViewerEnabled: boolean;
  webdriver: boolean;
  width: number;
  height: number;
  colorDepth: number;
  pixelDepth: number;
  timezoneOffset: number;
  timezone: string;
  touchSupport: boolean;
  devicePixelRatio: number;
  orientation: string;
  indexedDB: boolean;
  hasLocalStorageBoolean: boolean;
  hasSessionStorageBoolean: boolean;
  isCanvasSupportedBoolean: boolean;
  isIEBoolean: boolean;
  canvasFingerprint: string;
  connectionString: string | undefined;
  cookieBoolean: boolean | undefined;
  fontSmoothingEnabled: boolean | undefined;
  fontsString: string;
}
```

# How to use

To avoid the hydration errors we ge when using checks like `typeof window !== 'undefined'` in the logic, to use the functions, use the following approach:

```TypeScript
  const [browserFingerprint, setBrowserFingerprint] = useState("");
  useEffect(() => {
    setBrowserFingerprint(fingerprintBrowser());
  }, []);
```

hooks aren’t run when doing server-side rendering. Wrapping the usage of window inside a useEffect that is triggered on mount means the server will never execute it and the client will execute it after hydration.

## Special Thanks

Special thanks to:

- `Valentin Vasilyev` for the original fingerprintjs slightly modified
- `@damianobarbati` for `get-browser-fingerprint` which provided some inspiration
- `@N8Brooks` for the implementation of unsigned 32-bit MurmurHash3
- Open Source Device Fingerprinting by Dark Wave Tech for the various identity functions
- davealger on CodePen

## Contributing

Feel free to contribute.
