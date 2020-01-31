import { fullArticlesList } from './article.mock';
import { FullArticle } from '../models/article.interface';
import { uniqBy } from 'lodash';

export const articleAuthorsMock = uniqBy(fullArticlesList.map((article: FullArticle) => {
    return article.articleAuthor;
}), 'id');
