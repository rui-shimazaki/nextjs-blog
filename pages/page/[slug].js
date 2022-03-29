import Layout from '../../components/layout'
import { getAllPageSlugs, getCustomFieldData, getPageData } from '../../lib/pages'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function Page({ pageData }) {

  var pc_css  = `<style>${pageData.acf.page_pc_css}</style>`;
  var sp_css  = `<style>${pageData.acf.page_sp_css}</style>`;
  var tmp_page_js = pageData.acf.page_js;
  var page_js = `<script>${tmp_page_js}</script>`

    return (
      <Layout>
      <Head>
        <title>{pageData.title.rendered}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{pageData.title.rendered}</h1>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
        <div dangerouslySetInnerHTML={{ __html: pc_css }}></div>
        <div dangerouslySetInnerHTML={{ __html: page_js }}></div>
      </article>
    </Layout>
    )
  }

export async function getStaticPaths() {
    const paths = await getAllPageSlugs()
    return {
      paths,
      fallback: false
    }
  }

  export async function getStaticProps({ params }) {
    const basicData = await getPageData(params.slug);
    const customFieldData = await getCustomFieldData(params.slug);
    const pageData = await {...basicData, ...customFieldData};
    return {
      props: {
        pageData
      }
    }
  }

