import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { StartPageComponent } from './start-page/start-page.component';
export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'start-page', component: StartPageComponent}
];
