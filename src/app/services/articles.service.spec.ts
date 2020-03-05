import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticlesService } from './articles.service';
import { ApiService } from './api.service';
import { articleBuilder, articlesListBuilder, customArticleBuilder } from '../common/mocks/article.mock';
import { ArticleFormValue } from '../store/article/article.model';


describe('ArticlesService', () => {
    let articlesService: ArticlesService;
    let httpMock: HttpTestingController;
    const url = 'http://internship.zazmic.com/';

    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ArticlesService, ApiService]
    }));

    beforeEach(() => {
        articlesService = TestBed.get(ArticlesService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(articlesService).toBeTruthy();
    });

    describe('test articles list retrieval', () => {
        const paramsObj = {page: 0};
        const mockArticles = articlesListBuilder(2);
        const mockParams = ApiService.prepareParams(paramsObj);
        const articlesUrl = 'posts?page=0';

        it('should retrieve all articles', () => {
            articlesService.getArticles(paramsObj).subscribe((response) => {
                expect(response).toHaveLength(2);
                expect(response[0]).toHaveProperty('id', mockArticles[0].id);
            });

            const mockReq = httpMock.expectOne(ApiService.getEndpoint(articlesUrl));

            expect(mockReq.request.method).toEqual('GET');
            expect(mockReq.request.params).toEqual(mockParams);

            mockReq.flush(mockArticles);
        });

        it('should return an error if articles retrieval fails', () => {
            articlesService.getArticles(paramsObj).subscribe(
                () => fail('The articles retrieval operation should have failed'),
                (error) => expect(error.status).toBe(500)
            );

            const mockReq = httpMock.expectOne(ApiService.getEndpoint(articlesUrl));

            expect(mockReq.request.method).toEqual('GET');
            expect(mockReq.request.params).toEqual(mockParams);

            mockReq.flush('Failed to retrieve articles list', {
                status: 500,
                statusText: 'Internal Server Error'
            });
        });
    });

    it('should retrieve article by id', () => {
        const mockArticle = articleBuilder();

        articlesService.getArticleById(mockArticle.id).subscribe((response) => {
            expect(response).toHaveProperty('id', mockArticle.id);
        });

        const mockReq = httpMock.expectOne(ApiService.getEndpoint(`posts/${mockArticle.id}`));

        expect(mockReq.request.method).toEqual('GET');

        mockReq.flush(mockArticle);
    });

    it('should create article', () => {
        const mockFormValue: ArticleFormValue = {
            title: 'test',
            text: 'test',
            description: 'test',
            image: 'https://picsum.photos/640/480',
            tags: [0, 1, 2, 3]
        };
        const mockArticle = customArticleBuilder({title: mockFormValue.title})();

        articlesService.createArticle(mockFormValue).subscribe((response) => {
            expect(response).toHaveProperty('title', mockFormValue.title);
        });

        const mockReq = httpMock.expectOne(ApiService.getEndpoint('posts'));

        expect(mockReq.request.method).toEqual('POST');
        expect(mockReq.request.body).toEqual(mockFormValue);

        mockReq.flush(mockArticle);
    });

    it('should update article by id', () => {
        const patch = {title: 'test'};
        const mockArticle = customArticleBuilder({title: patch.title})();

        articlesService.updateArticle(mockArticle.id, patch).subscribe((response) => {
            expect(response).toHaveProperty('id', mockArticle.id);
            expect(response).toHaveProperty('title', patch.title);
        });

        const mockReq = httpMock.expectOne(ApiService.getEndpoint(`posts/${mockArticle.id}`));

        expect(mockReq.request.method).toEqual('PUT');
        expect(mockReq.request.body).toEqual({title: 'test'});

        mockReq.flush(mockArticle);
    });

    it('should delete article by id', () => {
        const mockArticle = articleBuilder();
        const mockResponse = {
            message: 'Post deleted from database!',
            id: mockArticle.id
        };

        articlesService.deleteArticle(mockArticle.id).subscribe((response) => {
            expect(response).toHaveProperty('message', mockResponse.message);
            expect(response).toHaveProperty('id', mockResponse.id);
        });

        const mockReq = httpMock.expectOne(ApiService.getEndpoint(`posts/${mockArticle.id}`));

        mockReq.flush(mockResponse);

        expect(mockReq.request.method).toEqual('DELETE');
    });

    afterEach(() => {
        httpMock.verify();
    });
});
