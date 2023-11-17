"use client";
import { murmurHash32 } from "@/utils/murmurHash";

class FingerprintBrowser implements FingerprintInterface {
  public debug: boolean;
  // fingerprint components
  public browserData: BrowserData;

  constructor(debug: boolean) {
    this.debug = debug;
    // Navigator
    this.browserData = {
      // Private Fns
      osString: this.getOs(this.debug),
      hasLocalStorageBoolean: this.hasLocalStorage(),
      hasSessionStorageBoolean: this.hasSessionStorage(),
      isCanvasSupportedBoolean: this.isCanvasSupported(),
      isIEBoolean: this.isIE(),
      canvasFingerprint: this.getCanvasFingerprint(),
      connectionString: this.connection(),
      cookieBoolean: this.cookie(),
      // 13ms
      fontSmoothingEnabled: this.getFontSmoothing(),
      fontsString: this.fonts(),
      // Navigator
      cookieEnabled: window.navigator.cookieEnabled,
      doNotTrack: window.navigator.doNotTrack !== undefined ? window.navigator.doNotTrack : 'unknown',
      hardwareConcurrency: window.navigator.hardwareConcurrency || 0,
      language: window.navigator.language,
      languages:  window.navigator.languages || [window.navigator.language],
      maxTouchPoints: window.navigator.maxTouchPoints || 0,
      userAgent: window.navigator.userAgent,
      pdfViewerEnabled: window.navigator.pdfViewerEnabled !== undefined ? window.navigator.pdfViewerEnabled : false,
      webdriver: window.navigator.webdriver !== undefined ? window.navigator.webdriver : false,
      // Screen
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      // Intl
      timezoneOffset: new Date().getTimezoneOffset(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      // Touch
      touchSupport: "ontouchstart" in window,
      // Device
      devicePixelRatio: window.devicePixelRatio || 1,
      orientation: screen.orientation ? screen.orientation.type : 'unknown',
      // IndexedDB
      indexedDB: !!window.indexedDB,
    };
  }

  private hasLocalStorage(): boolean {
    try {
      return !!window.localStorage;
    } catch (e) {
      return true;
    }
  }

  private hasSessionStorage(): boolean {
    try {
      return !!window.sessionStorage;
    } catch (e) {
      return true;
    }
  }

  private isCanvasSupported() {
    var elem = document.createElement("canvas");
    return !!(elem.getContext && elem.getContext("2d"));
  }

  private isIE() {
    if (navigator.appName === "Microsoft Internet Explorer") {
      return true;
    } else if (
      navigator.appName === "Netscape" &&
      /Trident/.test(navigator.userAgent)
    ) {
      return true;
    }
    return false;
  }

  private getCanvasFingerprint() {
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const text =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?";
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText(text, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(text, 4, 17);
    return canvas.toDataURL();
  }

  private connection(): string | undefined {
    var strOnError, strConnection, strOut;

    strOnError = undefined;
    strConnection = null;
    strOut = null;

    try {
      // only on android
      //@ts-ignore
      strConnection = navigator.connection.type;
      strOut = strConnection;
    } catch (err) {
      // return N/A if navigator.connection object does not apply to this device
      return strOnError;
    }
    return strOut;
  }

  private cookie(): boolean | undefined {
    var strOnError, bolCookieEnabled, bolOut;

    strOnError = undefined;
    bolCookieEnabled = null;
    bolOut = null;

    try {
      bolCookieEnabled = navigator.cookieEnabled ? true : false;

      //if not IE4+ nor NS6+
      if (typeof navigator.cookieEnabled === "undefined" && !bolCookieEnabled) {
        document.cookie = "testcookie";
        bolCookieEnabled =
          document.cookie.indexOf("testcookie") !== -1 ? true : false;
      }
      bolOut = bolCookieEnabled;
      return bolOut;
    } catch (err) {
      return strOnError;
    }
  }

  private getFontSmoothing(): boolean | undefined {
    var strOnError,
      strFontSmoothing,
      canvasNode,
      ctx,
      i,
      j,
      imageData,
      alpha,
      strOut;

    strOnError = undefined;
    strFontSmoothing = null;
    canvasNode = null;
    ctx = null;
    imageData = null;
    alpha = null;
    strOut = null;

    try {
      canvasNode = document.createElement("canvas") as HTMLCanvasElement;
      canvasNode.width = 35;
      canvasNode.height = 35;
      canvasNode.style.display = "none";
      document.body.appendChild(canvasNode);
      ctx = canvasNode.getContext("2d") as CanvasRenderingContext2D;
      ctx.textBaseline = "top";
      ctx.font = "32px Arial";
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.fillText("O", 0, 0);
      for (j = 8; j <= 32; j = j + 1) {
        for (i = 1; i <= 32; i = i + 1) {
          imageData = ctx.getImageData(i, j, 1, 1).data;
          alpha = imageData[3];
          if (alpha !== 255 && alpha !== 0) {
            strFontSmoothing = true; // font-smoothing must be on.
          }
        }
      }
      strOut = strFontSmoothing;
    } catch (err) {
      return strOnError;
    }

    strOut = strFontSmoothing ? true : undefined;
    return strOut;
  }

  private fonts(): string {
    var strOnError,
      style,
      fonts,
      count,
      template,
      fragment,
      divs,
      i,
      font,
      div,
      body,
      result,
      e;

    strOnError = "Error";
    style = null;
    fonts = null;
    font = null;
    count = 0;
    template = null;
    divs = null;
    e = null;
    div = null;
    body = null;
    i = 0;

    try {
      style =
        "position: absolute; visibility: hidden; display: block !important";
      fonts = [
        "Abadi MT Condensed Light",
        "Adobe Fangsong Std",
        "Adobe Hebrew",
        "Adobe Ming Std",
        "Agency FB",
        "Aharoni",
        "Andalus",
        "Angsana New",
        "AngsanaUPC",
        "Aparajita",
        "Arab",
        "Arabic Transparent",
        "Arabic Typesetting",
        "Arial Baltic",
        "Arial Black",
        "Arial CE",
        "Arial CYR",
        "Arial Greek",
        "Arial TUR",
        "Arial",
        "Batang",
        "BatangChe",
        "Bauhaus 93",
        "Bell MT",
        "Bitstream Vera Serif",
        "Bodoni MT",
        "Bookman Old Style",
        "Braggadocio",
        "Broadway",
        "Browallia New",
        "BrowalliaUPC",
        "Calibri Light",
        "Calibri",
        "Californian FB",
        "Cambria Math",
        "Cambria",
        "Candara",
        "Castellar",
        "Casual",
        "Centaur",
        "Century Gothic",
        "Chalkduster",
        "Colonna MT",
        "Comic Sans MS",
        "Consolas",
        "Constantia",
        "Copperplate Gothic Light",
        "Corbel",
        "Cordia New",
        "CordiaUPC",
        "Courier New Baltic",
        "Courier New CE",
        "Courier New CYR",
        "Courier New Greek",
        "Courier New TUR",
        "Courier New",
        "DFKai-SB",
        "DaunPenh",
        "David",
        "DejaVu LGC Sans Mono",
        "Desdemona",
        "DilleniaUPC",
        "DokChampa",
        "Dotum",
        "DotumChe",
        "Ebrima",
        "Engravers MT",
        "Eras Bold ITC",
        "Estrangelo Edessa",
        "EucrosiaUPC",
        "Euphemia",
        "Eurostile",
        "FangSong",
        "Forte",
        "FrankRuehl",
        "Franklin Gothic Heavy",
        "Franklin Gothic Medium",
        "FreesiaUPC",
        "French Script MT",
        "Gabriola",
        "Gautami",
        "Georgia",
        "Gigi",
        "Gisha",
        "Goudy Old Style",
        "Gulim",
        "GulimChe",
        "GungSeo",
        "Gungsuh",
        "GungsuhChe",
        "Haettenschweiler",
        "Harrington",
        "Hei S",
        "HeiT",
        "Heisei Kaku Gothic",
        "Hiragino Sans GB",
        "Impact",
        "Informal Roman",
        "IrisUPC",
        "Iskoola Pota",
        "JasmineUPC",
        "KacstOne",
        "KaiTi",
        "Kalinga",
        "Kartika",
        "Khmer UI",
        "Kino MT",
        "KodchiangUPC",
        "Kokila",
        "Kozuka Gothic Pr6N",
        "Lao UI",
        "Latha",
        "Leelawadee",
        "Levenim MT",
        "LilyUPC",
        "Lohit Gujarati",
        "Loma",
        "Lucida Bright",
        "Lucida Console",
        "Lucida Fax",
        "Lucida Sans Unicode",
        "MS Gothic",
        "MS Mincho",
        "MS PGothic",
        "MS PMincho",
        "MS Reference Sans Serif",
        "MS UI Gothic",
        "MV Boli",
        "Magneto",
        "Malgun Gothic",
        "Mangal",
        "Marlett",
        "Matura MT Script Capitals",
        "Meiryo UI",
        "Meiryo",
        "Menlo",
        "Microsoft Himalaya",
        "Microsoft JhengHei",
        "Microsoft New Tai Lue",
        "Microsoft PhagsPa",
        "Microsoft Sans Serif",
        "Microsoft Tai Le",
        "Microsoft Uighur",
        "Microsoft YaHei",
        "Microsoft Yi Baiti",
        "MingLiU",
        "MingLiU-ExtB",
        "MingLiU_HKSCS",
        "MingLiU_HKSCS-ExtB",
        "Miriam Fixed",
        "Miriam",
        "Mongolian Baiti",
        "MoolBoran",
        "NSimSun",
        "Narkisim",
        "News Gothic MT",
        "Niagara Solid",
        "Nyala",
        "PMingLiU",
        "PMingLiU-ExtB",
        "Palace Script MT",
        "Palatino Linotype",
        "Papyrus",
        "Perpetua",
        "Plantagenet Cherokee",
        "Playbill",
        "Prelude Bold",
        "Prelude Condensed Bold",
        "Prelude Condensed Medium",
        "Prelude Medium",
        "PreludeCompressedWGL Black",
        "PreludeCompressedWGL Bold",
        "PreludeCompressedWGL Light",
        "PreludeCompressedWGL Medium",
        "PreludeCondensedWGL Black",
        "PreludeCondensedWGL Bold",
        "PreludeCondensedWGL Light",
        "PreludeCondensedWGL Medium",
        "PreludeWGL Black",
        "PreludeWGL Bold",
        "PreludeWGL Light",
        "PreludeWGL Medium",
        "Raavi",
        "Rachana",
        "Rockwell",
        "Rod",
        "Sakkal Majalla",
        "Sawasdee",
        "Script MT Bold",
        "Segoe Print",
        "Segoe Script",
        "Segoe UI Light",
        "Segoe UI Semibold",
        "Segoe UI Symbol",
        "Segoe UI",
        "Shonar Bangla",
        "Showcard Gothic",
        "Shruti",
        "SimHei",
        "SimSun",
        "SimSun-ExtB",
        "Simplified Arabic Fixed",
        "Simplified Arabic",
        "Snap ITC",
        "Sylfaen",
        "Symbol",
        "Tahoma",
        "Times New Roman Baltic",
        "Times New Roman CE",
        "Times New Roman CYR",
        "Times New Roman Greek",
        "Times New Roman TUR",
        "Times New Roman",
        "TlwgMono",
        "Traditional Arabic",
        "Trebuchet MS",
        "Tunga",
        "Tw Cen MT Condensed Extra Bold",
        "Ubuntu",
        "Umpush",
        "Univers",
        "Utopia",
        "Utsaah",
        "Vani",
        "Verdana",
        "Vijaya",
        "Vladimir Script",
        "Vrinda",
        "Webdings",
        "Wide Latin",
        "Wingdings",
      ];
      count = fonts.length;
      template =
        "<b style=\"display:inline !important; width:auto !important; font:normal 10px/1 'X',sans-serif !important\">ww</b>" +
        "<b style=\"display:inline !important; width:auto !important; font:normal 10px/1 'X',monospace !important\">ww</b>";
      fragment = document.createDocumentFragment();
      divs = [];
      for (i = 0; i < count; i = i + 1) {
        font = fonts[i];
        div = document.createElement("div");
        font = font.replace(/['"<>]/g, "");
        div.innerHTML = template.replace(/X/g, font);
        div.style.cssText = style;
        fragment.appendChild(div);
        divs.push(div);
      }
      body = document.body;
      body.insertBefore(fragment, body.firstChild);
      result = [];
      for (i = 0; i < count; i = i + 1) {
        e = divs[i].getElementsByTagName("b");
        if (e[0].offsetWidth === e[1].offsetWidth) {
          result.push(fonts[i]);
        }
      }
      // do not combine these two loops, remove child will cause reflow
      // and induce severe performance hit
      for (i = 0; i < count; i = i + 1) {
        body.removeChild(divs[i]);
      }
      return result.join("|");
    } catch (err) {
      return strOnError;
    }
  }

  private getOs(debug: boolean = false): string {
    var strSep, strOnError, strUserAgent, strPlatform, strOS, strOSBits, strOut;

    strSep = "|";
    strOnError = "Error";
    strUserAgent = null;
    strPlatform = null;
    strOS = null;
    strOSBits = null;
    strOut = null;

    if (debug === false) {
      try {
        /* navigator.userAgent is supported by all major browsers */
        strUserAgent = navigator.userAgent.toLowerCase();
        /* navigator.platform is supported by all major browsers */
        strPlatform = navigator.platform.toLowerCase();
        return strUserAgent + strPlatform;
      } catch (err) {
        return strOnError;
      }
    }

    try {
      /* navigator.userAgent is supported by all major browsers */
      strUserAgent = navigator.userAgent.toLowerCase();
      /* navigator.platform is supported by all major browsers */
      strPlatform = navigator.platform.toLowerCase();
      if (strUserAgent.indexOf("windows nt 6.3") !== -1) {
        strOS = "Windows 8.1";
      } else if (strUserAgent.indexOf("windows nt 6.2") !== -1) {
        strOS = "Windows 8";
      } else if (strUserAgent.indexOf("windows nt 6.1") !== -1) {
        strOS = "Windows 7";
      } else if (strUserAgent.indexOf("windows nt 6.0") !== -1) {
        strOS = "Windows Vista/Windows Server 2008";
      } else if (strUserAgent.indexOf("windows nt 5.2") !== -1) {
        strOS = "Windows XP x64/Windows Server 2003";
      } else if (strUserAgent.indexOf("windows nt 5.1") !== -1) {
        strOS = "Windows XP";
      } else if (strUserAgent.indexOf("windows nt 5.01") !== -1) {
        strOS = "Windows 2000, Service Pack 1 (SP1)";
      } else if (strUserAgent.indexOf("windows xp") !== -1) {
        strOS = "Windows XP";
      } else if (strUserAgent.indexOf("windows 2000") !== -1) {
        strOS = "Windows 2000";
      } else if (strUserAgent.indexOf("windows nt 5.0") !== -1) {
        strOS = "Windows 2000";
      } else if (strUserAgent.indexOf("windows nt 4.0") !== -1) {
        strOS = "Windows NT 4.0";
      } else if (strUserAgent.indexOf("windows nt") !== -1) {
        strOS = "Windows NT 4.0";
      } else if (strUserAgent.indexOf("winnt4.0") !== -1) {
        strOS = "Windows NT 4.0";
      } else if (strUserAgent.indexOf("winnt") !== -1) {
        strOS = "Windows NT 4.0";
      } else if (strUserAgent.indexOf("windows me") !== -1) {
        strOS = "Windows ME";
      } else if (strUserAgent.indexOf("win 9x 4.90") !== -1) {
        strOS = "Windows ME";
      } else if (strUserAgent.indexOf("windows 98") !== -1) {
        strOS = "Windows 98";
      } else if (strUserAgent.indexOf("win98") !== -1) {
        strOS = "Windows 98";
      } else if (strUserAgent.indexOf("windows 95") !== -1) {
        strOS = "Windows 95";
      } else if (strUserAgent.indexOf("windows_95") !== -1) {
        strOS = "Windows 95";
      } else if (strUserAgent.indexOf("win95") !== -1) {
        strOS = "Windows 95";
      } else if (strUserAgent.indexOf("ce") !== -1) {
        strOS = "Windows CE";
      } else if (strUserAgent.indexOf("win16") !== -1) {
        strOS = "Windows 3.11";
      } else if (strUserAgent.indexOf("iemobile") !== -1) {
        strOS = "Windows Mobile";
      } else if (strUserAgent.indexOf("wm5 pie") !== -1) {
        strOS = "Windows Mobile";
      } else if (strUserAgent.indexOf("windows") !== -1) {
        strOS = "Windows (Unknown Version)";
      } else if (strUserAgent.indexOf("openbsd") !== -1) {
        strOS = "Open BSD";
      } else if (strUserAgent.indexOf("sunos") !== -1) {
        strOS = "Sun OS";
      } else if (strUserAgent.indexOf("ubuntu") !== -1) {
        strOS = "Ubuntu";
      } else if (strUserAgent.indexOf("ipad") !== -1) {
        strOS = "iOS (iPad)";
      } else if (strUserAgent.indexOf("ipod") !== -1) {
        strOS = "iOS (iTouch)";
      } else if (strUserAgent.indexOf("iphone") !== -1) {
        strOS = "iOS (iPhone)";
      } else if (strUserAgent.indexOf("mac os x beta") !== -1) {
        strOS = "Mac OSX Beta (Kodiak)";
      } else if (strUserAgent.indexOf("mac os x 10.0") !== -1) {
        strOS = "Mac OSX Cheetah";
      } else if (strUserAgent.indexOf("mac os x 10.1") !== -1) {
        strOS = "Mac OSX Puma";
      } else if (strUserAgent.indexOf("mac os x 10.2") !== -1) {
        strOS = "Mac OSX Jaguar";
      } else if (strUserAgent.indexOf("mac os x 10.3") !== -1) {
        strOS = "Mac OSX Panther";
      } else if (strUserAgent.indexOf("mac os x 10.4") !== -1) {
        strOS = "Mac OSX Tiger";
      } else if (strUserAgent.indexOf("mac os x 10.5") !== -1) {
        strOS = "Mac OSX Leopard";
      } else if (strUserAgent.indexOf("mac os x 10.6") !== -1) {
        strOS = "Mac OSX Snow Leopard";
      } else if (strUserAgent.indexOf("mac os x 10.7") !== -1) {
        strOS = "Mac OSX Lion";
      } else if (strUserAgent.indexOf("mac os x") !== -1) {
        strOS = "Mac OSX (Version Unknown)";
      } else if (strUserAgent.indexOf("mac_68000") !== -1) {
        strOS = "Mac OS Classic (68000)";
      } else if (strUserAgent.indexOf("68K") !== -1) {
        strOS = "Mac OS Classic (68000)";
      } else if (strUserAgent.indexOf("mac_powerpc") !== -1) {
        strOS = "Mac OS Classic (PowerPC)";
      } else if (strUserAgent.indexOf("ppc mac") !== -1) {
        strOS = "Mac OS Classic (PowerPC)";
      } else if (strUserAgent.indexOf("macintosh") !== -1) {
        strOS = "Mac OS Classic";
      } else if (strUserAgent.indexOf("googletv") !== -1) {
        strOS = "Android (GoogleTV)";
      } else if (strUserAgent.indexOf("xoom") !== -1) {
        strOS = "Android (Xoom)";
      } else if (strUserAgent.indexOf("htc_flyer") !== -1) {
        strOS = "Android (HTC Flyer)";
      } else if (strUserAgent.indexOf("android") !== -1) {
        strOS = "Android";
      } else if (strUserAgent.indexOf("symbian") !== -1) {
        strOS = "Symbian";
      } else if (strUserAgent.indexOf("series60") !== -1) {
        strOS = "Symbian (Series 60)";
      } else if (strUserAgent.indexOf("series70") !== -1) {
        strOS = "Symbian (Series 70)";
      } else if (strUserAgent.indexOf("series80") !== -1) {
        strOS = "Symbian (Series 80)";
      } else if (strUserAgent.indexOf("series90") !== -1) {
        strOS = "Symbian (Series 90)";
      } else if (strUserAgent.indexOf("x11") !== -1) {
        strOS = "UNIX";
      } else if (strUserAgent.indexOf("nix") !== -1) {
        strOS = "UNIX";
      } else if (strUserAgent.indexOf("linux") !== -1) {
        strOS = "Linux";
      } else if (strUserAgent.indexOf("qnx") !== -1) {
        strOS = "QNX";
      } else if (strUserAgent.indexOf("os/2") !== -1) {
        strOS = "IBM OS/2";
      } else if (strUserAgent.indexOf("beos") !== -1) {
        strOS = "BeOS";
      } else if (strUserAgent.indexOf("blackberry95") !== -1) {
        strOS = "Blackberry (Storm 1/2)";
      } else if (strUserAgent.indexOf("blackberry97") !== -1) {
        strOS = "Blackberry (Bold)";
      } else if (strUserAgent.indexOf("blackberry96") !== -1) {
        strOS = "Blackberry (Tour)";
      } else if (strUserAgent.indexOf("blackberry89") !== -1) {
        strOS = "Blackberry (Curve 2)";
      } else if (strUserAgent.indexOf("blackberry98") !== -1) {
        strOS = "Blackberry (Torch)";
      } else if (strUserAgent.indexOf("playbook") !== -1) {
        strOS = "Blackberry (Playbook)";
      } else if (strUserAgent.indexOf("wnd.rim") !== -1) {
        strOS = "Blackberry (IE/FF Emulator)";
      } else if (strUserAgent.indexOf("blackberry") !== -1) {
        strOS = "Blackberry";
      } else if (strUserAgent.indexOf("palm") !== -1) {
        strOS = "Palm OS";
      } else if (strUserAgent.indexOf("webos") !== -1) {
        strOS = "WebOS";
      } else if (strUserAgent.indexOf("hpwos") !== -1) {
        strOS = "WebOS (HP)";
      } else if (strUserAgent.indexOf("blazer") !== -1) {
        strOS = "Palm OS (Blazer)";
      } else if (strUserAgent.indexOf("xiino") !== -1) {
        strOS = "Palm OS (Xiino)";
      } else if (strUserAgent.indexOf("kindle") !== -1) {
        strOS = "Kindle";
      } else if (strUserAgent.indexOf("wii") !== -1) {
        strOS = "Nintendo (Wii)";
      } else if (strUserAgent.indexOf("nintendo ds") !== -1) {
        strOS = "Nintendo (DS)";
      } else if (strUserAgent.indexOf("playstation 3") !== -1) {
        strOS = "Sony (Playstation Console)";
      } else if (strUserAgent.indexOf("playstation portable") !== -1) {
        strOS = "Sony (Playstation Portable)";
      } else if (strUserAgent.indexOf("webtv") !== -1) {
        strOS = "MSN TV (WebTV)";
      } else if (strUserAgent.indexOf("inferno") !== -1) {
        strOS = "Inferno";
      } else {
        strOS = "Unknown";
      }
      if (strPlatform.indexOf("x64") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("wow64") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("win64") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("win32") !== -1) {
        strOSBits = "32 bits";
      } else if (strPlatform.indexOf("x64") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("x32") !== -1) {
        strOSBits = "32 bits";
      } else if (strPlatform.indexOf("x86") !== -1) {
        strOSBits = "32 bits*";
      } else if (strPlatform.indexOf("ppc") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("alpha") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("68k") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("iphone") !== -1) {
        strOSBits = "32 bits";
      } else if (strPlatform.indexOf("android") !== -1) {
        strOSBits = "32 bits";
      } else {
        strOSBits = "Unknown";
      }
      strOut = strOS + strSep + strOSBits;
      return strOut;
    } catch (err) {
      return strOnError;
    }
  }

  public generateHash(): string {
    const dataString = JSON.stringify(this.browserData, null, 4);
    let hash = murmurHash32(dataString).toString();
    return hash;
  }
}

let fingerprintBrowser: FingerprintBrowser;

// The FingerprintFactory is responsible for creating and returning a single instance of the FingerprintBrowser class
// Implementing the singleton pattern
export class FingerprintFactory {
  public static create(debug: boolean): FingerprintBrowser {
    if (!fingerprintBrowser) {
      fingerprintBrowser = new FingerprintBrowser(debug);
    }
    return fingerprintBrowser;
  }
}
