import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { emailValidator, emailPatternAsyncValidator } from '../../../../shared/validators/email-validator';
import { userNameAsyncValidator } from '../../../../shared/validators/user-name-validator';
import { passwordMatchValidator } from '../../../../shared/validators/password-match-validator';
import { User } from '../../../../shared/models/ui-models/user-model';
import { RegisterRequest } from '../../../../shared/models/ui-models/register-request-model';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, TranslateModule, ReactiveFormsModule, NgIf],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isMobile: boolean = false;
  registerForm: FormGroup; 
  isUserTermsModalOpen = false;
  isFairPlayTermsModalOpen = false;
  hasScrolledToBottomUser = false;
  hasScrolledToBottomFairPlay = false;
  isUserAgreementRead = false;
  isFairPlayAgreementRead = false;
  agreementType = "";
  private scrollListener: (() => void) | null = null;
  @ViewChild('userTermsContainer') userTermsContainer!: ElementRef;
  @ViewChild('fairPlayTermsContainer') fairPlayTermsContainer!: ElementRef;

  constructor(private fb: FormBuilder,  private translate: TranslateService, private renderer: Renderer2) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required], [userNameAsyncValidator]],
      email: ['', [Validators.required, emailValidator()], [emailPatternAsyncValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, passwordMatchValidator()]],
      gender: ['', [Validators.required]],
      userTerms: [false, [Validators.requiredTrue]],
      fairPlay: [false, [Validators.requiredTrue]]
    });   
  }
  
  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.checkIfMobile();
    });
    this.registerForm.get('userTerms')?.disable();
    this.registerForm.get('fairPlay')?.disable();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => {
      this.checkIfMobile();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.checkScroll(), 100);
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  onRegister(){
    this.registerForm.markAllAsTouched();
    const isFairPlayDisabled = this.registerForm.get('fairPlay')?.disabled;
    const isUserAgreementDisabled = this.registerForm.get('userTerms')?.disabled;
    !this.isFairPlayAgreementRead && this.registerForm.get('fairPlay')?.enable();
    !this.isUserAgreementRead && this.registerForm.get('userTerms')?.enable();

    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      const registerRequest: RegisterRequest = {
        userName: this.registerForm.get('userName')?.value,
        email: this.registerForm.get('email')?.value,
        gender: this.registerForm.get('gender')?.value,
        password: this.registerForm.get('password')?.value
      };
    }
    else{
      isFairPlayDisabled && this.registerForm.get('fairPlay')?.disable();
      isUserAgreementDisabled && this.registerForm.get('userTerms')?.disable();
    }
  }

  openTermsModal(event: Event, type: string) {
    this.agreementType = type;
    event.preventDefault();
    if(this.agreementType === 'user'){
      this.isUserTermsModalOpen = true;
    }
    else if(this.agreementType === 'fair-play'){
      this.isFairPlayTermsModalOpen = true;
    }

    setTimeout(() => {
      this.checkScroll();
      this.addScrollListener();
    }, 100);
  }

  closeTermsModal() {
    if(this.agreementType === 'user'){
      this.isUserTermsModalOpen = false;
      this.registerForm.get('userTerms')?.enable();
    }
    else if(this.agreementType === 'fair-play'){
      this.isFairPlayTermsModalOpen = false;
      this.registerForm.get('fairPlay')?.enable();
    }
    this.removeScrollListener();
  }

  checkScroll() {
    if(this.agreementType === 'user'){
      if (!this.userTermsContainer) return;
      const div = this.userTermsContainer.nativeElement;
      const scrollBottom = div.scrollTop + div.clientHeight;
      const tolerance = 10;
      this.hasScrolledToBottomUser = scrollBottom >= div.scrollHeight - tolerance;
    }
    else if(this.agreementType === 'fair-play'){
      if (!this.fairPlayTermsContainer) return;
      const div = this.fairPlayTermsContainer.nativeElement;
      const scrollBottom = div.scrollTop + div.clientHeight;
      const tolerance = 10;
      this.hasScrolledToBottomFairPlay = scrollBottom >= div.scrollHeight - tolerance;
    }
  }

  addScrollListener() {
    if(this.agreementType === 'user'){
      if (this.userTermsContainer) {
        this.renderer.listen(this.userTermsContainer.nativeElement, 'scroll', () => this.checkScroll());
      }
    }
    else if(this.agreementType === 'fair-play'){
      if (this.fairPlayTermsContainer) {
        this.renderer.listen(this.fairPlayTermsContainer.nativeElement, 'scroll', () => this.checkScroll());
      }
    }
  }

  removeScrollListener() {
    if (this.scrollListener) {
      this.scrollListener();
      this.scrollListener = null;
    }
  }
}
