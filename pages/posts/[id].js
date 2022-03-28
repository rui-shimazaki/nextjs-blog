import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
    return (
      <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
    )
  }

export async function getStaticPaths() {
    const paths = await getAllPostIds()
    console.log('拝見');
    console.log(paths);
    return {
      paths,
      fallback: false
    }
  }

  export async function getStaticProps({ params }) {
    console.log("params");
    console.log(params);
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }

