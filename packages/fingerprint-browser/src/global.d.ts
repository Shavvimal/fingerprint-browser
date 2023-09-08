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

interface FingerprintInterface {
  debug: boolean;
  browserData: BrowserData;
  generateHash(): string;
}
