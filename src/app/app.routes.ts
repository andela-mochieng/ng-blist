import { provideRouter, RouterConfig } from '@angular/router';
import { SigninComponent } from './auth/signin';
import { RegisterComponent } from './auth/register';
import { IndexComponent } from './index/index.component';
import { BucketlistComponent } from './bucketlist/bucketlist.component';

const routes: RouterConfig = [
    {path: 'bucket', component:BucketlistComponent},
    {path: 'signin', component: SigninComponent},
    {path: '', component: IndexComponent},
    {path:'register' , component: RegisterComponent}
];

export const AppRouterProviders = [
  provideRouter(routes)
];
