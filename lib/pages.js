// import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import $ from 'jquery';

// const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPagesData() {
  let res = await fetch(new URL(process.env.PAGES_API));
  const res2 = await res.json();

  const allPagesData = await res2.map(data => {
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

  return await allPagesData;

}

/**
 * apiを使用してslug一覧を取得するための関数
 * @param {}
 * @returns {paths} params:slugのオブジェクト
 */
export async function getAllPageSlugs() {

  let res = await fetch(new URL(process.env.PAGES_API));
  const res2 = await res.json();

  // 事前ビルドしたいパスを指定
  const paths = await res2.map((page) => ({
    params: {
      // ファイル名と合わせる ※文字列指定
      slug: page.slug.toString(),
    },
  }))
  return await paths;
}

/**
 * slugを元に該当のPageDataを取得する関数
 * @param {slug} wordpress記事のslug
 * @returns {res2} pageのAPIData
 */
export async function getPageData(slug) {
  const id = await getIdFromSlug(slug);

  // idを元にPageDataを取得
  let url = await process.env.PAGES_API + `/${id}`;
  let res = await fetch(new URL(url));
  const res2 = await res.json();
  return await res2;
}

/**
 * slugを元に該当のcustomFieldDataを取得する関数
 * @param {slug} wordpress記事のslug
 * @returns {res2} customFieldのAPIData
 */
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
 * @param {slug} wordpress記事のslug
 * @returns {id} wordpress記事のid
 */
async function getIdFromSlug(slug) {
    const url_for_id = process.env.PAGES_API + `/?slug=${slug}`;
    const res_for_id = await fetch(new URL(url_for_id));
    const res2_for_id = await res_for_id.json();
    const id = await res2_for_id[0].id;
    return await id;
}