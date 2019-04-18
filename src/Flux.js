const FLUX = {
    frontend: [
        'https://www.youtube.com/feeds/videos.xml?channel_id=UCj_iGliGCkLcHSZ8eqVNPDQ',
        'https://www.codeur.com/blog/feed/',
        'https://feeds.feedburner.com/Grafikart',
        'https://www.alsacreations.com/rss/actualites.xml',
        'https://medium.freecodecamp.org/feed',
        'https://news.humancoders.com/items/feed.rss',
        'https://korben.info/category/infos/developpement/?feed=rss',
        'https://www.lafermeduweb.net/search-rss.xml?search_veille%5Bsorting%5D=publishedAt-desc&search_veille%5BnbPerPages%5D=10&search_veille%5BdateInterval%5D=&search_veille%5Bauthor%5D=&search_veille%5Blang%5D=all&search_veille%5Bsearch%5D=javascript',
        'https://stackoverflow.com/feeds/tag?tagnames=javascript&sort=newest',
        'https://hn.algolia.com/latest.atom',
    ],
    youtube : [
        'https://www.youtube.com/feeds/videos.xml?channel_id=UCj_iGliGCkLcHSZ8eqVNPDQ'
    ],
};

export const API = {
    url: 'https://api.rss2json.com/v1/api.json?rss_url=',
    key: '&api_key=jlnbzevd1d5rwe7egbxrjfwxkpgdh8lpfyusedik'
}

export default FLUX;