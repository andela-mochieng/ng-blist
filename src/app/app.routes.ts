import { provideRouter, RouterConfig } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { RegisterComponent } from './auth/register/register.component';
import { BucketlistComponent } from './bucketlist/bucketlist.component';


const routes: RouterConfig = [
    {path: '', redirectTo: 'signin'},
    {path:'register' , component: RegisterComponent},
    {path: 'bucket', component: BucketlistComponent},
    {path: 'signin', component: SigninComponent},

];

export const AppRouterProviders = [
  provideRouter(routes)
];
