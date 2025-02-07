import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us-page.component.html',
  styleUrl: './contact-us-page.component.css'
})
export class ContactUsPageComponent {
  contactForm: FormGroup;
  subjects = ['Genel Soru', 'Destek', 'Geri Bildirim', 'Şikayet'];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
      alert('Mesajınız başarıyla gönderildi!');
      this.contactForm.reset();
    } else {
      alert('Lütfen tüm alanları eksiksiz doldurun.');
    }
  }
}
