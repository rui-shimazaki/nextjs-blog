import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPagesData } from '../lib/pages'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allPagesData }) {
  return (
    <Layout home>
      <Head>…</Head>
      <section className={utilStyles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPagesData.map(({ id, title, slug }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/page/${slug}`}>
              <a>{title}</a>
            </Link>
            <br />
            {/* <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small> */}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPagesData = await getSortedPagesData()
  return await {
    props: {
      allPagesData
    }
  }
}