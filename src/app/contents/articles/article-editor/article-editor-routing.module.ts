import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleEditorComponent } from './article-editor.component';
import { AuthGuard } from '../../../guards/auth.guard';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create'
    },
    {
        path: 'create',
        component: ArticleEditorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'edit/:articleId',
        component: ArticleEditorComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleEditorRoutingModule { }
