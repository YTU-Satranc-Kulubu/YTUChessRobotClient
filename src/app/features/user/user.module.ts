import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayRobotPageComponent } from './pages/play-robot-page/play-robot-page.component';
import { PlayUserPageComponent } from './pages/play-user-page/play-user-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [CommonModule, UserRoutingModule, PlayRobotPageComponent, PlayUserPageComponent, UserPageComponent, UserDetailsPageComponent]
})
export class UserModule {}
