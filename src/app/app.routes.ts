import { provideRouter, RouterConfig } from '@angular/router';
import { SigninComponent } from './auth/signin';
import { RegisterComponent } from './auth/register';
import { BucketlistComponent } from './bucketlist/bucketlist.component';

const routes: RouterConfig = [
    {path: '', component:BucketlistComponent},
    {path: 'signin', component: SigninComponent},
    {path:'register' , component: RegisterComponent}
];

export const AppRouterProviders = [
  provideRouter(routes)
];
