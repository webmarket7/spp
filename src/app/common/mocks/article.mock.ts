import { build, fake, sequence } from 'test-data-bot';
import { Article } from '../../store/article/article.model';

export const articleBuilder = build('Article').fields({
    id: fake(f => f.random.alphaNumeric(24)),
    articleAuthor: fake(f => f.random.alphaNumeric(24)),
    title: fake(f => f.lorem.words(5, 10)),
    description: fake(f => f.lorem.paragraph()),
    text: fake(f => f.lorem.paragraphs(1, 3)),
    articleTags: [0, 1, 2, 3, 4, 5],
    image: sequence(x => `https://picsum.photos/640/480?random=${x}`),
    reactionsCounts: {
        likes: fake(f => f.random.number(100)),
        stars: fake(f => f.random.number(100)),
    },
    createdAt: fake(f => f.date.recent()),
    updatedAt: fake(f => f.date.recent())
});

export const customArticleBuilder = (patch: Partial<Article>) => {
    return build('Article')
        .fields({
            id: fake(f => f.random.alphaNumeric(24)),
            articleAuthor: fake(f => f.random.alphaNumeric(24)),
            title: fake(f => f.lorem.words(5, 10)),
            description: fake(f => f.lorem.paragraph()),
            text: fake(f => f.lorem.paragraphs(1, 3)),
            articleTags: [0, 1, 2, 3, 4, 5],
            image: sequence(x => `https://picsum.photos/640/480?random=${x}`),
            reactionsCounts: {
                likes: fake(f => f.random.number(100)),
                stars: fake(f => f.random.number(100)),
            },
            createdAt: fake(f => f.date.recent()),
            updatedAt: fake(f => f.date.recent())
        })
        .map((article: Article) => ({...article, ...patch}));
};

export const articlesListBuilder = (count: number) => {
    return new Array(count).fill(0).map(_ => articleBuilder());
};
