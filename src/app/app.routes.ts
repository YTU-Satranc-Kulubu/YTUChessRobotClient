import { Routes } from '@angular/router';
import { MainPageComponent } from './visitor-pages/main-page/main-page.component';
import { StartPageComponent } from './visitor-pages/start-page/start-page.component';
import { LoginPageComponent } from './visitor-pages/login-page/login-page.component';
import { RegisterPageComponent } from './visitor-pages/register-page/register-page.component';
import { AdminLoginPageComponent } from './admin-pages/admin-login-page/admin-login-page.component';
import { UserPageComponent } from './user-pages/user-page/user-page.component';
import { AdminPageComponent } from './admin-pages/admin-page/admin-page.component';
import { BestPageComponent } from './visitor-pages/best-page/best-page.component';
import { UniversityPlayersPageComponent } from './visitor-pages/university-players-page/university-players-page.component';
import { PlayUserPageComponent } from './user-pages/play-user-page/play-user-page.component';
import { PlayRobotPageComponent } from './user-pages/play-robot-page/play-robot-page.component';
import { ContactUsPageComponent } from './visitor-pages/contact-us-page/contact-us-page.component';
import { AboutPageComponent } from './visitor-pages/about-page/about-page.component';
import { FaqPageComponent } from './visitor-pages/faq-page/faq-page.component';
import { SendMailPageComponent } from './admin-pages/send-mail-page/send-mail-page.component';

export const routes: Routes = [
    // visitor-pages
    {path: '', component: MainPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'sign-up', component: RegisterPageComponent},
    {path: 'contact-us', component: ContactUsPageComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'faq', component: FaqPageComponent},
    {path: 'start-page', component: StartPageComponent},
    {path: 'best/:type', component: BestPageComponent},
    {path: 'university/:UniversityId', component: UniversityPlayersPageComponent},
    // user-pages
    {path: 'play-user/:GameId', component: PlayUserPageComponent},
    {path: 'play-robot/:GameId', component: PlayRobotPageComponent},
    {path: 'user-page/:UserId', component: UserPageComponent},
    // admin-pages
    {path: 'secret-login', component: AdminLoginPageComponent},
    {path: "secret-admin", component: AdminPageComponent},
    {path: "send-mail", component: SendMailPageComponent},
];
