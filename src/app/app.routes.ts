import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { StartPageComponent } from './start-page/start-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AdminLoginPageComponent } from './admin-login-page/admin-login-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BestPageComponent } from './best-page/best-page.component';
import { UniversityPlayersPageComponent } from './university-players-page/university-players-page.component';

export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'start-page', component: StartPageComponent},
    {path: 'play/:GameId', component: GamePageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'sign-up', component: RegisterPageComponent},
    {path: 'secret-login', component: AdminLoginPageComponent},
    {path: "secret-statistics", component: AdminPageComponent},
    {path: 'user-page/:UserId', component: UserPageComponent},
    {path: 'best-players', component: BestPageComponent},
    {path: 'university/:UniversityId', component: UniversityPlayersPageComponent}
];
