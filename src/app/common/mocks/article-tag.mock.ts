import { build, fake, incrementingId } from 'test-data-bot';

export const ArticleTagBuilder = build('ArticleTag').fields({
    seq: incrementingId(),
    author: fake(f => f.random.alphaNumeric(24)),
    createdAt: new Date(),
    name: fake(f => f.lorem.word())
});

export const articleTagsListBuilder = (count: number) => {
    return new Array(count).fill(0).map(_ => ArticleTagBuilder());
};
