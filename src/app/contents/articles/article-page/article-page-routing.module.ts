import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlePageComponent } from './article-page.component';
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Routes = [
    {
        path: ':articleId',
        component: ArticlePageComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlePageRoutingModule { }
