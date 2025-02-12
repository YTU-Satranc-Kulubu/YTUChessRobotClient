import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../models/ui-models/user-model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, NgIf],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  isMobile: boolean = false;
  updateForm: FormGroup; 

  constructor(private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', [Validators.required]]
    });   
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.checkIfMobile();
    });

    this.updateForm.patchValue({
      userName: "AMD",
      email: "mahir.demirelli@std.yildiz.edu.tr",
      gender: "male"
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => {
      this.checkIfMobile();
    });
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  onUpdate(){
    this.updateForm.markAllAsTouched();
    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
    }
  }
  
  onDelete(){
    
  }
}
