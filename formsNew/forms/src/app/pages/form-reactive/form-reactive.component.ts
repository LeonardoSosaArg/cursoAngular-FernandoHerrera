import { Component, OnInit, inject } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.scss'],
})
export class FormReactiveComponent implements OnInit {
  fb = inject(FormBuilder);
  form: FormGroup;
  isEdit: boolean = false;

  constructor() {
    this.createForm();
    this.loadObjectToEdit();
  }

  ngOnInit(): void {}

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        number: [''],
      }),
      // lawes: this.fb.array([
      //   this.fb.control({
      //     law: ['', [Validators.required]],
      //     articles: this.fb.array([
      //       []
      //     ]),
      //   }),
      // ]),
      law: ['', [Validators.required]],
      articles: this.fb.array([
        []
      ]),
    });
  }

  loadObjectToEdit() {
    if (this.isEdit) {
      this.form.setValue({
        name: 'Leopoldo',
        lastname: 'Sosa',
        email: 'leos@hotmail.com',
        address: {
          street: 'Cochabamba',
          number: '1346',
        },
      });
    }
  }

  onSave() {
    console.log('Formulario válido: ', this.form.valid);
    console.log(this.form);

    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        //SI EL CONTROL DENTRO DEL FORM ES UN FORMGROUP
        if (control instanceof FormGroup) {
          console.log('entro instanceof');
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else control.markAsTouched();
      });
    }

    //RESET DEL FORM AL ENVIAR DATA CORRECTA
    this.form.reset();
  }

  deleteArticle() {}

  addArticle() {}

  addLaw(){

  }

  //GET DEL FORM ARRAY
  get articlesArray() {
    return this.form.get('articles') as FormArray;
  }

  get lawInvalid() {
    return this.form.get('law')!.invalid! && this.form.get('law')!.touched;
  }

  get nameInvalid() {
    return this.form.get('name')!.invalid! && this.form.get('name')!.touched;
  }

  get lastNameInvalid() {
    return (
      this.form.get('lastname')!.invalid! && this.form.get('lastname')!.touched
    );
  }

  get emailInvalid() {
    return this.form.get('email')!.invalid! && this.form.get('email')!.touched;
  }

  get streetInvalid() {
    return (
      this.form.get('address.street')!.invalid! &&
      this.form.get('address.street')!.touched
    );
  }
}
