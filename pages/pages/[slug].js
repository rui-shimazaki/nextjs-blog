import Layout from '../../components/layout'
import { getAllPageSlugs, getCustomFieldData, getPageData } from '../../lib/pages'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function Page({ PageData }) {

  var pc_css  = `<style>${PageData.acf.page_pc_css}</style>`;
  var sp_css  = `<style>${PageData.acf.page_sp_css}</style>`;
  var tmp_page_js = PageData.acf.page_js;
  var page_js = `<script>${tmp_page_js}</script>`

    return (
      <Layout>
      <Head>
        <title>{PageData.title.rendered}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{PageData.title.rendered}</h1>
        {/* <div className={utilStyles.lightText}>
          <Date dateString={PageData.date.rendered} />
        </div> */}
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <div dangerouslySetInnerHTML={{ __html: PageData.content.rendered }} />
        <div dangerouslySetInnerHTML={{ __html: pc_css }}></div>
        <div dangerouslySetInnerHTML={{ __html: page_js }}></div>
      </article>
    </Layout>
    )
  }

export async function getStaticPaths() {
    const paths = await getAllPageSlugs()
    console.log('拝見');
    console.log(paths);
    return {
      paths,
      fallback: false
    }
  }

  export async function getStaticProps({ params }) {
    // console.log("params");
    // console.log(params);
    const basicData = await getPageData(params.slug);
    const customFieldData = await getCustomFieldData(params.slug);
    const PageData = {...basicData, ...customFieldData};
    return {
      props: {
        PageData
      }
    }
  }

