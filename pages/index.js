import Head from 'next/head'

import {BestSeller, HomeSlider, Trending} from 'components'

import {
  getBestSellerResults,
  getCollectionBanner,
  getTrendingUrls,
} from 'services'

function Home({slides, isLoaded, trending, bestseller, secondarySlides}) {
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
          <HomeSlider isLoaded={isLoaded} slides={slides} />

          <Trending trending={trending} />
          {secondarySlides ? (
            <HomeSlider isLoaded={isLoaded} second slides={secondarySlides} />
          ) : null}
          <BestSeller bestseller={bestseller} />
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
  const props = {
    slides: [],
    secondarySlides: [],
    isLoaded: false,
    trending: [],
    bestseller: {},
  }
  const promises = [
    getCollectionBanner('homepage'),
    getCollectionBanner('secondary'),
    getTrendingUrls(),
    getBestSellerResults(),
  ]
  const results = await Promise.allSettled(promises)

  results.forEach((res, i) => {
    if (res.status === 'fulfilled') {
      switch (i) {
        case 0:
          props.slides = res.value.results
          break
        case 1:
          props.secondarySlides = res.value.results
          break
        case 2:
          props.trending = res.value.items
          break
        case 3:
          props.bestseller = res.value
          break
      }
    }
  })

  return {
    props: {...props, isLoaded: true},
    revalidate: 120, // will be passed to the page component as props
  }
}

export default Home
