import * as React from 'react'

import {SessionProvider} from 'next-auth/react'
import {Provider} from 'react-redux'
import CookieConsent from 'react-cookie-consent'

import RefreshTokenHandler from '../services/refreshTokenHandler'
import '../styles/globals.css'
import Header from '../components/header'
import '../styles/bootstrap/css/bootstrap-theme.min.css'
import '../styles/bootstrap/css/bootstrap.min.css'
import Head from 'next/head'
import store from '../redux/store'
import Footer from '../components/common/footer/footer'

import {AppProvider} from 'components/appProvider'
import {MailjetSignUp} from 'components'
import InfoBar from '../components/general/InfoBar'

function MyApp({Component, pageProps}) {
  const SUBSCRIPTION_STATE = 'subscriptionState'
  const SIGNED_UP = 'signedUp'

  const [interval, setInterval] = React.useState(0)
  const [showSubscription, setShowSubscription] = React.useState(false)

  React.useEffect(() => {
    const subscriptionState = localStorage.getItem(SUBSCRIPTION_STATE)

    if (!subscriptionState || subscriptionState !== SIGNED_UP) {
      setShowSubscription(true)
    }
  }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          content="width=device-width, initial-scale=1, user-scalable=1"
          name="viewport"
        />
        <link
          href="/android-chrome-192x192.png"
          rel="icon"
          sizes="192x192"
          target="_blank"
          type="image/png"
        />
        <link
          href="/android-chrome-384x384.png"
          rel="icon"
          sizes="384x384"
          target="_blank"
          type="image/png"
        />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
          target="_blank"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          target="_blank"
          type="image/png"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          target="_blank"
          type="image/png"
        />
        <link
          href="/favicon.ico"
          rel="icon"
          sizes="16x16 32x32"
          target="_blank"
          type="image/x-icon"
        />

        <link href="/site.webmanifest" rel="manifest" />
        <link color="#da532c" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <link href="https://use.typekit.net/kls3ash.css" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#000000" name="theme-color" />
        <meta content="@calypsosuncare" name="twitter:site"></meta>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        {/* <!-- Google Tag Manager --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WH5SJG');`,
          }}
        />
        {/* <!-- End Google Tag Manager --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <AppProvider>
        <SessionProvider refetchInterval={interval} session={pageProps.session}>
          <Provider store={store}>
            {/* <!-- Google Tag Manager (noscript) --> */}
            <noscript
              dangerouslySetInnerHTML={{
                __html: `
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5WH5SJG"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>`,
              }}
            />
            <Header />
            {showSubscription ? <MailjetSignUp /> : null}

            <InfoBar />
            <Component {...pageProps} />
            <CookieConsent
              containerClasses="cookie-css"
              contentClasses="cookie-text disableBlur"
              // buttonWrapperClasses="disableBlur"
              // buttonClasses="disableBlur bg-calypso"
              // onAccept={() => {
              //   alert("Accept was triggered by clicking the Accept button");
              // }}
            >
              <div className="cookie-background"> </div>
              We use cookies to ensure that we give you the best experience on
              our website.
            </CookieConsent>

            <Footer showSubscription={showSubscription} />
            <RefreshTokenHandler setInterval={setInterval} />
          </Provider>
        </SessionProvider>
      </AppProvider>
    </>
  )
}

export default MyApp
