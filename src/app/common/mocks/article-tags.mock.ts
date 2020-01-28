import { fullArticlesList } from './article.mock';
import { FullArticle } from '../models/article.interface';
import { flatten, uniqBy } from 'lodash';

export const articleTagsMock = uniqBy(flatten(fullArticlesList.map((article: FullArticle) => {
    return article.articleTags;
})), 'seq');
