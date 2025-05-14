import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../components/card/card.component';

interface ContactInfo {
  icon: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  loading = false;
  success = false;
  error = false;

  contactInfo: ContactInfo[] = [
    {
      icon: 'bi-envelope-fill',
      title: 'Email',
      content: 'nabil.m.sleiman@gmail.com'
    },
    {
      icon: 'bi-geo-alt-fill',
      title: 'Localisation',
      content: 'Toulouse, France'
    },
    {
      icon: 'bi-telephone-fill',
      title: 'Téléphone',
      content: '+33 6 12 34 56 78'
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;
    

    setTimeout(() => {
      this.loading = false;
      this.success = true;
      this.contactForm.reset();
      this.submitted = false;
      setTimeout(() => this.success = false, 5000);
    }, 1500);
  }
}
