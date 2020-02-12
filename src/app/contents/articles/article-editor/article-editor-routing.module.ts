import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleEditorComponent } from './article-editor.component';
import { AuthGuard } from '../../../guards/auth.guard';


const routes: Routes = [
    {
        path: 'create',
        component: ArticleEditorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'edit/:articleId',
        component: ArticleEditorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleEditorRoutingModule { }
