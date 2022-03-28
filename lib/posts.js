import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import $ from 'jquery';

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPostsData() {
  // // posts　配下のファイル名を取得する
  // const fileNames = fs.readdirSync(postsDirectory)
  // const allPostsData = fileNames.map(fileName => {
  //   // id を取得するためにファイル名から ".md" を削除する
  //   const id = fileName.replace(/\.md$/, '')

  //   // マークダウンファイルを文字列として読み取る
  //   const fullPath = path.join(postsDirectory, fileName)
  //   const fileContents = fs.readFileSync(fullPath, 'utf8')

  //   // 投稿のメタデータ部分を解析するために gray-matter を使う
  //   const matterResult = matter(fileContents)

  //   // データを id と合わせる
  //   return {
  //     id,
  //     ...matterResult.data
  //   }
  // })
  // // 投稿を日付でソートする
  // return allPostsData.sort((a, b) => {
  //   if (a.date < b.date) {
  //     return 1
  //   } else {
  //     return -1
  //   }
  // })

    let res = await fetch(new URL(process.env.PAGES_API));
    const res2 = await res.json();

    // await console.log('res2');
    // await console.log(res2);

    const allPostsData = await res2.map(data => {
      // id を取得
      const id = data.id.toString();
      const title = data.title.toString();

      // データを id と合わせる
      return {
        id,
        title
      }
    })

    return await allPostsData;

}

export async function getAllPostIds() {
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
      id: post.id.toString(),
    },
  }))

  // await console.log('paths');
  // await console.log(paths);
  return await paths;
}

export async function getPostData(id) {
  let url = process.env.PAGES_API + `/${id}`;
  // await console.log('url');
  // await console.log(url);
  let res = await fetch(new URL(url));
  // await console.log('res');
  // await console.log(res);
  const res2 = await res.json();
  // await console.log('res2');
  // await console.log(res2);

  return await res2;

}

export async function getCustomFieldData(id) {
  await console.log('urltest');
  await console.log(process.env.CUSTOM_FIELD_API);
  let url = process.env.CUSTOM_FIELD_API + `/${id}`;
  await console.log('url');
  await console.log(url);
  let res = await fetch(new URL(url));
  // await console.log('res');
  // await console.log(res);
  const res2 = await res.json();
  await console.log('res2');
  await console.log(res2);

  return await res2;

}