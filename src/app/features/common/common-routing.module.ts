import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { BestPageComponent } from './pages/best-page/best-page.component';
import { ContactUsPageComponent } from './pages/contact-us-page/contact-us-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { UniversityPlayersPageComponent } from './pages/university-players-page/university-players-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'login', component: LoginPageComponent },
  { path: 'secret-login', component: AdminLoginPageComponent },
  { path: 'sign-up', component: RegisterPageComponent },
  { path: 'contact-us', component: ContactUsPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'faq', component: FaqPageComponent },
  { path: 'start-page', component: StartPageComponent },
  { path: 'best/:type', component: BestPageComponent },
  { path: 'university/:UniversityId', component: UniversityPlayersPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule {}
