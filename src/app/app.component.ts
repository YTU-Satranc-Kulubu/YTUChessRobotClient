import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, NavbarComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'YTU Chess Robot';
}
