import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { StartPageComponent } from './start-page/start-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'start-page', component: StartPageComponent},
    {path: 'play/:GameId', component: GamePageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'sign-up', component: RegisterPageComponent}
];
