import { FullArticle } from '../models/article.interface';
import * as articlesList from './articles-list.json';

export const fullArticlesList: FullArticle[] = (articlesList as any).default;
