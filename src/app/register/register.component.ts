import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  today: string = '';
  id: string = '';
  availability = true;

  constructor(private service: ProductsService) {
    this.registrationForm = new FormGroup({
      'id': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]),
      'name': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      'description': new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
      'logo': new FormControl(null, Validators.required),
      'date_release': new FormControl(null, Validators.required),
      'date_revision': new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];

    this.registrationForm.get('date_release')?.valueChanges.subscribe(value => {
      if (value) {
        const revisionDate = new Date(value);
        revisionDate.setFullYear(revisionDate.getFullYear() + 1);
        this.registrationForm.get('date_revision')?.setValue(revisionDate.toISOString().split('T')[0]);
      }
    });

    this.registrationForm.get('id')?.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(term => {
      this.id = term;
      this.checkAvailability(this.id);
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.service.postProduct(this.registrationForm.value).subscribe({
      next: (response) => console.log('Product posted successfully:', response),
      error: (error) => console.error('Error posting product:', error)
    });
    this.registrationForm.reset();
  }

  onReset() {
    this.registrationForm.reset();
  }

  checkAvailability(id: string) {
    this.service.availableId(id).subscribe(isAvailable => {
      this.availability = isAvailable;
    });
  }

}
