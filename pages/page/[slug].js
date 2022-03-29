import Layout from '../../components/layout'
import { getAllPostSlugs, getCustomFieldData, getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {

  var pc_css  = `<style>${postData.acf.page_pc_css}</style>`;
  var sp_css  = `<style>${postData.acf.page_sp_css}</style>`;
  var tmp_page_js = postData.acf.page_js;
  var page_js = `<script>${tmp_page_js}</script>`

    return (
      <Layout>
      <Head>
        <title>{postData.title.rendered}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title.rendered}</h1>
        {/* <div className={utilStyles.lightText}>
          <Date dateString={postData.date.rendered} />
        </div> */}
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <div dangerouslySetInnerHTML={{ __html: postData.content.rendered }} />
        <div dangerouslySetInnerHTML={{ __html: pc_css }}></div>
        <div dangerouslySetInnerHTML={{ __html: page_js }}></div>
      </article>
    </Layout>
    )
  }

export async function getStaticPaths() {
    const paths = await getAllPostSlugs()
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
    const basicData = await getPostData(params.slug);
    const customFieldData = await getCustomFieldData(params.slug);
    const postData = await {...basicData, ...customFieldData};
    // await console.log('postDataをチェック');
    // await console.log(postData);
    return {
      props: {
        postData
      }
    }
  }

