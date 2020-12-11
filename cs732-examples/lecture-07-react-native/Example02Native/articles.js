
export function loadArticleIds() {
    return fetch('https://trex-sandwich.com/ajax/articles')
        .then(response => response.json())
        .then(articles => articles.map(a => a.id));
}

export function loadArticle(id) {
    return fetch(`https://trex-sandwich.com/ajax/articles?id=${id}`)
        .then(response => response.json());
}

export async function loadAllArticles() {
    const ids = await loadArticleIds();
    return await Promise.all(ids.map(id => loadArticle(id)));
}

export async function loadAllArticlesInRandomOrder() {
    const articles = await loadAllArticles();

    for (let i = articles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = articles[i];
        articles[i] = articles[j];
        articles[j] = temp;
    }

    return articles;

}