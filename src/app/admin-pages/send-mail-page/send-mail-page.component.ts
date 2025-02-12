import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-mail-page',
  standalone: true,
  imports: [TranslateModule, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './send-mail-page.component.html',
  styleUrl: './send-mail-page.component.css'
})
export class SendMailPageComponent {
  mailForm: FormGroup;
  userNames: string[] = ['AMD-1', 'AMD-2'];

  constructor(private fb: FormBuilder) {
    this.mailForm = this.fb.group({
      receiver: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });   
  }

  onSubmit(){
    
  }
}
