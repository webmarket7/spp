export interface ArticleParams {
    page: number;
    withComments?: 0 | 1;
    withAuthorIds?: 0 | 1;
    tags?: string;
    authorId?: string;
}
