import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { University } from '../../models/ui-models/university-model';
import { TranslateModule } from '@ngx-translate/core';
import { universityNameValidator} from '../../validators/university-name-validator';
import { leaderValidator} from '../../validators/leader-validator';

@Component({
  selector: 'app-universities-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, TranslateModule],
  templateUrl: './universities-page.component.html',
  styleUrl: './universities-page.component.css'
})
export class UniversitiesPageComponent {
  isAddClicked: boolean = false;
  addUniversityForm: FormGroup;
  universities: University[] = [];

  constructor(private fb: FormBuilder) {
    this.addUniversityForm = this.fb.group({
      name: ['', [Validators.required, universityNameValidator()]],
      leaderUserName: ['', [Validators.required, leaderValidator()]]
    });
  }

  onAdd(){
    this.addUniversityForm.markAllAsTouched();

    if (this.addUniversityForm.valid) {
      console.log(this.addUniversityForm.value);
    }
  }

  goToUniversityPage(id: number){
    
  }
}
