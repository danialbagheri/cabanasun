import * as React from 'react'

import App from 'next/app'
import Head from 'next/head'

import {SessionProvider} from 'next-auth/react'
import {Provider} from 'react-redux'
import CookieConsent from 'react-cookie-consent'

import store from '../redux/store'
import Header from 'components/header'
import {MailjetSignUp} from 'components'
import {getRetrieveMenu} from 'services'
import {Footer} from 'components/common/footer'
import InfoBar from 'components/general/InfoBar'
import {assetsEndPoints, getAssets} from 'utils'
import {AppProvider} from 'components/appProvider'
import RefreshTokenHandler from '../services/refreshTokenHandler'

import '../styles/globals.css'
import '../styles/bootstrap/css/bootstrap.min.css'
import '../styles/bootstrap/css/bootstrap-theme.min.css'

function MyApp({Component, pageProps}) {
  const navItems = pageProps?.navItems

  const [interval, setInterval] = React.useState(0)
  const [icons, setIcons] = React.useState({})

  const handleGetAssets = async () => {
    const response = await getAssets([assetsEndPoints.infoBar])

    if (response && typeof response === 'object') {
      setIcons({
        ...response,
      })
    }
  }

  React.useEffect(() => {
    handleGetAssets()
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
      <AppProvider icons={icons}>
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
            <Header navItems={navItems} />
            <MailjetSignUp />

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

            <Footer />
            <RefreshTokenHandler setInterval={setInterval} />
          </Provider>
        </SessionProvider>
      </AppProvider>
    </>
  )
}

export default MyApp

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext)

  try {
    const menu = await getRetrieveMenu()
    appProps.pageProps.navItems = menu.sub_menus
  } catch (err) {
    console.error(err)
  }

  return {...appProps}
}
