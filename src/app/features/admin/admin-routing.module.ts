import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ClubsPageComponent } from './pages/clubs-page/clubs-page.component';
import { SendMailPageComponent } from './pages/send-mail-page/send-mail-page.component';
import { UniversitiesPageComponent } from './pages/universities-page/universities-page.component';

const routes: Routes = [
  { path: '', component: AdminPageComponent },
  { path: 'send-mail', component: SendMailPageComponent },
  { path: 'universities', component: UniversitiesPageComponent },
  { path: 'clubs', component: ClubsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
