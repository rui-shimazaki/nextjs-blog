export default async(req, res) => {
    // let res = await fetch(new URL(process.env.MAIN_MENU_API));
    // console.log('res');
    // console.log(res);
    // const res2 = await res.json();
    // const tmpMenuData = res2.items;
    // console.log(tmpMenuData);
    // {tmpMenuData};
    // res.status(200).json({ res })
    res.status(200).json({ text: 'Hello' })
}