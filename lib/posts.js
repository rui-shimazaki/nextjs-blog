// import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import $ from 'jquery';

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPostsData() {
  let res = await fetch(new URL(process.env.PAGES_API));
  const res2 = await res.json();

  await console.log('thisinfo');
  await console.log(res2);

  const allPostsData = await res2.map(data => {
    // id を取得
    const id = data.id.toString();
    const title = data.title.toString();
    const slug = data.slug.toString();

    // データを id と合わせる
    return {
      id,
      title,
      slug,
    }
  })

  return await allPostsData;

}

export async function getAllPostSlugs() {
  // https://jsonplaceholder.typicode.com/posts
  // const fileNames = fs.readdirSync(postsDirectory)

  // 以下のような配列を返します:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  // return fileNames.map(fileName => {
  //   return {
  //     params: {
  //       id: fileName.replace(/\.md$/, '')
  //     }
  //   }
  // })

  let res = await fetch(new URL(process.env.PAGES_API));
  // await console.log(res);
  const res2 = await res.json();
  // await console.log(res2);
  // let datas = [];

  // 事前ビルドしたいパスを指定
  const paths = await res2.map((post) => ({
    params: {
      // ファイル名と合わせる ※文字列指定
      slug: post.slug.toString(),
    },
  }))
  return await paths;
}

export async function getPostData(slug) {

  const id = await getIdFromSlug(slug);

  // idを元にpostDataを取得
  let url = await process.env.PAGES_API + `/${id}`;
  let res = await fetch(new URL(url));
  const res2 = await res.json();
  return await res2;
}

export async function getCustomFieldData(slug) {

  const id = await getIdFromSlug(slug);

  // idを元にcustomFieldDataを取得
  let url = process.env.CUSTOM_FIELD_API + `/${id}`;
  let res = await fetch(new URL(url));
  const res2 = await res.json();
  return await res2;
}

/**
 * slugを元にid情報を取得する関数
 * @param {slug} slug
 * @returns {id} id
 */
async function getIdFromSlug(slug) {
    const url_for_id = process.env.PAGES_API + `/?slug=${slug}`;
    const res_for_id = await fetch(new URL(url_for_id));
    const res2_for_id = await res_for_id.json();
    const id = await res2_for_id[0].id;
    return await id;
}