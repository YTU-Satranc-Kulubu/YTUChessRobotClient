import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ClubsPageComponent } from './pages/clubs-page/clubs-page.component';
import { SendMailPageComponent } from './pages/send-mail-page/send-mail-page.component';
import { UniversitiesPageComponent } from './pages/universities-page/universities-page.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, AdminPageComponent, ClubsPageComponent, SendMailPageComponent, UniversitiesPageComponent]
})
export class AdminModule {}
