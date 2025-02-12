import { Routes } from '@angular/router';
import { MainPageComponent } from './user-pages/main-page/main-page.component';
import { StartPageComponent } from './user-pages/start-page/start-page.component';
import { LoginPageComponent } from './user-pages/login-page/login-page.component';
import { RegisterPageComponent } from './user-pages/register-page/register-page.component';
import { AdminLoginPageComponent } from './admin-pages/admin-login-page/admin-login-page.component';
import { UserPageComponent } from './user-pages/user-page/user-page.component';
import { AdminPageComponent } from './admin-pages/admin-page/admin-page.component';
import { BestPageComponent } from './user-pages/best-page/best-page.component';
import { UniversityPlayersPageComponent } from './user-pages/university-players-page/university-players-page.component';
import { PlayUserPageComponent } from './user-pages/play-user-page/play-user-page.component';
import { PlayRobotPageComponent } from './user-pages/play-robot-page/play-robot-page.component';
import { ContactUsPageComponent } from './user-pages/contact-us-page/contact-us-page.component';
import { AboutPageComponent } from './user-pages/about-page/about-page.component';
import { FaqPageComponent } from './user-pages/faq-page/faq-page.component';

export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'start-page', component: StartPageComponent},
    {path: 'play-user/:GameId', component: PlayUserPageComponent},
    {path: 'play-robot/:GameId', component: PlayRobotPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'sign-up', component: RegisterPageComponent},
    {path: 'secret-login', component: AdminLoginPageComponent},
    {path: "secret-admin", component: AdminPageComponent},
    {path: 'user-page/:UserId', component: UserPageComponent},
    {path: 'best/:type', component: BestPageComponent},
    {path: 'university/:UniversityId', component: UniversityPlayersPageComponent},
    {path: 'contact-us', component: ContactUsPageComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'faq', component: FaqPageComponent}
];
