import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayRobotPageComponent } from './pages/play-robot-page/play-robot-page.component';
import { PlayUserPageComponent } from './pages/play-user-page/play-user-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';

const routes: Routes = [
  { path: '', component: UserPageComponent },
  { path: 'play-user/:GameId', component: PlayUserPageComponent },
  { path: 'play-robot/:GameId', component: PlayRobotPageComponent },
  { path: ':UserId', component: UserDetailsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
