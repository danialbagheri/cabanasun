import * as React from 'react'

import Head from 'next/head'

import {BestSellerSlider, HomeSlider, Trending} from 'components'

import {getCollectionBanner, getTrendingUrls} from 'services'
import {AppContext} from '../components/appProvider/AppProvider'

import {useAuthFetch} from 'components/customHooks'
import {getFavoriteVariantsHandler} from 'utils'

function Home(props) {
  const {trendingItems, homepageBanner} = props
  const [, setAppState] = React.useContext(AppContext)
  const authFetchHandler = useAuthFetch()

  React.useEffect(() => {
    //Get user favorite products
    getFavoriteVariantsHandler({setAppState, authFetchHandler})
  }, [])

  return (
    <div>
      <Head>
        {/* ------------------------ ***Main Page Meta Data*** ----------------------- */}
        <title>Cabana</title>
        <meta content="Cabana" name="description" />
        <meta
          name="twitter:card"
          value="Calypso sun are suitable for the whole family and protect all skin types from the harmful effects of both UVA and UVB rays. Try Calypso Once a Day sunscreen, aftersun products or new range of Calypso hand sanitisers."
        />

        <meta content="Cabana" property="og:title" />

        <meta content="article" property="og:type" />
        {/* <meta content="https://www.calypsosun.com/" property="og:url" /> */}
        <meta
          content="https://www.cabanasun.co.uk/images/untitled-1-u3160-fr.png?crc=194974193"
          property="og:image"
        />
        <meta content="Cabana" property="og:description" />
        {/* -------------------------------------------------------------------------- */}
      </Head>

      <main>
        <section className="top-0">
          <HomeSlider banner={homepageBanner} />
          <Trending items={trendingItems} />
          <HomeSlider />
          <BestSellerSlider />
          {/* <StaySafe /> */}
          {/* <AsSeen /> */}
          {/* <BlogSlider /> */}
          {/* <Instagram /> */}
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const promises = [getTrendingUrls(), getCollectionBanner('homepage')]
  const results = await Promise.allSettled(promises)
  const initialProps = {
    trendingItems:
      results[0]?.status === 'fulfilled' ? results[0].value.items : [],
    homepageBanner:
      results[1]?.status === 'fulfilled' ? results[1].value.results : [],
  }

  return {
    props: {...initialProps},
    revalidate: 120,
  }
}

export default Home
