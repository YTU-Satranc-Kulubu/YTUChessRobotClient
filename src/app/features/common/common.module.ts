import { NgModule } from '@angular/core';
import { CommonModule as angularCommon } from '@angular/common';
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
import { CommonRoutingModule } from './common-routing.module';

@NgModule({
  imports: [angularCommon, CommonRoutingModule, AboutPageComponent, AdminLoginPageComponent, BestPageComponent, ContactUsPageComponent, FaqPageComponent, LoginPageComponent, MainPageComponent, RegisterPageComponent, UniversityPlayersPageComponent, StartPageComponent]
})
export class CommonModule {}
