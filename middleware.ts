import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.get("__aT")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname === "/quotation" && !request.nextUrl.search) {
    return NextResponse.redirect(new URL("/tickets", request.url));
  }
}

export const config = {
  //matcher: ["/((?!login).*)"], //'/((?!api|_next/static|favicon.ico).*)',
  matcher: ["/", "/users", "/tickets", "/quotation"],
};

/* {
  cookies: {
    rxVisitor: 'rxVisitor=1655104126631FLB5IGNJFQ378KD1RNEDPQRE2N2I7FOP; Path=/',
    dtSa: 'dtSa=-; Path=/',
    dtLatC: 'dtLatC=5; Path=/',
    rxvt: 'rxvt=1656403798772%7C1656401993563; Path=/',
    notice_preferences: 'notice_preferences=3%3A; Path=/',
    TAconsentID: 'TAconsentID=0a3c2728-95d1-45be-87f8-813b8fdc2b57; Path=/',
    notice_gdpr_prefs: 'notice_gdpr_prefs=0%7C1%7C2%7C3%3A; Path=/',
    cmapi_gtm_bl: 'cmapi_gtm_bl=; Path=/',
    cmapi_cookie_privacy: 'cmapi_cookie_privacy=permit_1%7C2%7C3%7C4; Path=/',
    _ga: '_ga=GA1.1.215633758.1656402001; Path=/',
    dtCookie: 'dtCookie=v_4_srv_4_sn_CQ2KAL94KLVRJJ2JBVPM0QMPAQHJCJVQ_app-3Aef60df760a8bbaec_1_ol_0_perc_100000_mul_1; Path=/',
    AMCVS_0AA54673527831890A490D45%40AdobeOrg: 'AMCVS_0AA54673527831890A490D45%40AdobeOrg=1; Path=/',
    AMCV_0AA54673527831890A490D45%40AdobeOrg: 'AMCV_0AA54673527831890A490D45%40AdobeOrg=1176715910%7CMCIDTS%7C19172%7CvVersion%7C5.4.0%7CMCMID%7C51207590007129747133499129842697654655%7CMCAAMLH-1657006801%7C6%7CMCAAMB-1657006801%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1656409201s%7CNONE; Path=/',
    AMCVS_20E5776A5244554D0A490D44%40AdobeOrg: 'AMCVS_20E5776A5244554D0A490D44%40AdobeOrg=1; Path=/',
    s_cc: 's_cc=true; Path=/',
    AMCV_20E5776A5244554D0A490D44%40AdobeOrg: 'AMCV_20E5776A5244554D0A490D44%40AdobeOrg=1176715910%7CMCMID%7C54586491447997481454350190656137764919%7CMCAAMLH-1657006801%7C6%7CMCAAMB-1657006801%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1656409202s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C5.4.0; Path=/',
    s_sq: 's_sq=eecoukdev%3D%2526c.%2526a.%2526activitymap.%2526page%253Dlocalhost%2526link%253DContinue%2526region%253D__next%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dlocalhost%2526pidt%253D1%2526oid%253Dfunctionnoop%252528%252529%25257B%25257D%2526oidt%253D2%2526ot%253DBUTTON; Path=/',
    dtPC: 'dtPC=4%24401993560_549h-vOSIRKJUMVOHWMWUHCKUBRAAKUCVGBCMF-0e0; Path=/',
    _ga_YEXV92BLZ6: '_ga_YEXV92BLZ6=GS1.1.1656402001.1.1.1656402012.49; Path=/',
    __aT: '__aT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJNdXNhIiwibGFzdE5hbWUiOiJNdWxpcm8iLCJ1c2VybmFtZSI6Im1tdWxpcm8iLCJkb21haW4iOiJGLkwuTyIsImlhdCI6MTY2OTY1ODY4NywiZXhwIjoxNjY5NjYwNDg3fQ.D6I5mdnDbz6VUb3jWVG1j5tpqLWbJ2pvftvlcybXBBY; Path=/'
  },
  geo: {},
  ip: undefined,
  nextUrl: {
    href: 'http://localhost:3000/users',
    origin: 'http://localhost:3000',
    protocol: 'http:',
    username: '',
    password: '',
    host: 'localhost:3000',
    hostname: 'localhost',
    port: '3000',
    pathname: '/users',
    search: '',
    searchParams: URLSearchParams {  },
    hash: ''
  },
  url: 'http://localhost:3000/users',
  bodyUsed: false,
  cache: 'default',
  credentials: 'same-origin',
  destination: '',
  headers: {
    accept: '/',
    accept-encoding: 'gzip, deflate, br',
    accept-language: 'en-US,en;q=0.9',
    connection: 'keep-alive',
    cookie: 'rxVisitor=1655104126631FLB5IGNJFQ378KD1RNEDPQRE2N2I7FOP; dtSa=-; dtLatC=5; rxvt=1656403798772|1656401993563; notice_preferences=3:; TAconsentID=0a3c2728-95d1-45be-87f8-813b8fdc2b57; notice_gdpr_prefs=0|1|2|3:; cmapi_gtm_bl=; cmapi_cookie_privacy=permit_1|2|3|4; _ga=GA1.1.215633758.1656402001; dtCookie=v_4_srv_4_sn_CQ2KAL94KLVRJJ2JBVPM0QMPAQHJCJVQ_app-3Aef60df760a8bbaec_1_ol_0_perc_100000_mul_1; AMCVS_0AA54673527831890A490D45%40AdobeOrg=1; AMCV_0AA54673527831890A490D45%40AdobeOrg=1176715910%7CMCIDTS%7C19172%7CvVersion%7C5.4.0%7CMCMID%7C51207590007129747133499129842697654655%7CMCAAMLH-1657006801%7C6%7CMCAAMB-1657006801%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1656409201s%7CNONE; AMCVS_20E5776A5244554D0A490D44%40AdobeOrg=1; s_cc=true; AMCV_20E5776A5244554D0A490D44%40AdobeOrg=1176715910%7CMCMID%7C54586491447997481454350190656137764919%7CMCAAMLH-1657006801%7C6%7CMCAAMB-1657006801%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1656409202s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C5.4.0; s_sq=eecoukdev%3D%2526c.%2526a.%2526activitymap.%2526page%253Dlocalhost%2526link%253DContinue%2526region%253D__next%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dlocalhost%2526pidt%253D1%2526oid%253Dfunctionnoop%252528%252529%25257B%25257D%2526oidt%253D2%2526ot%253DBUTTON; dtPC=4$401993560_549h-vOSIRKJUMVOHWMWUHCKUBRAAKUCVGBCMF-0e0; _ga_YEXV92BLZ6=GS1.1.1656402001.1.1.1656402012.49; __aT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJNdXNhIiwibGFzdE5hbWUiOiJNdWxpcm8iLCJ1c2VybmFtZSI6Im1tdWxpcm8iLCJkb21haW4iOiJGLkwuTyIsImlhdCI6MTY2OTY1ODY4NywiZXhwIjoxNjY5NjYwNDg3fQ.D6I5mdnDbz6VUb3jWVG1j5tpqLWbJ2pvftvlcybXBBY',
    host: 'localhost:3000',
    referer: 'http://localhost:3000/tickets',
    sec-ch-ua: '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
    sec-ch-ua-mobile: '?0',
    sec-ch-ua-platform: '"macOS"',
    sec-fetch-dest: 'empty',
    sec-fetch-mode: 'cors',
    sec-fetch-site: 'same-origin',
    user-agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    x-nextjs-data: '1'
  },
  integrity: '',
  keepalive: false,
  method: 'GET',
  mode: 'cors',
  redirect: 'follow',
  referrer: 'about:client',
  referrerPolicy: '',
  signal: AbortSignal {
    [Symbol(kAborted)]: false,
    [Symbol(kReason)]: undefined,
    [Symbol(kOnabort)]: undefined,
    [Symbol(realm)]: { settingsObject: {} }
  }
} */
