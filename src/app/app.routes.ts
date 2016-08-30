import { provideRouter, RouterConfig } from '@angular/router';
import { SigninComponent } from './auth/signin';
import { RegisterComponent } from './auth/register';
import { BucketlistComponent } from './bucketlist/bucketlist.component';

const routes: RouterConfig = [
    {path: '', redirectTo: 'bucket'},
    {path:'register' , component: RegisterComponent},
    {path: 'bucket', component: BucketlistComponent},
    {path: 'signin', component: SigninComponent},

];

export const AppRouterProviders = [
  provideRouter(routes)
];
