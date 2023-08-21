import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../form-reactive/services/validators.service';

interface Ordenancis {
  id?: any;
  laws: Law[];
}

interface Articles {
  description: string;
}

interface Law {
  description: string;
  articles: Articles[];
}

@Component({
  selector: 'app-form-modificable',
  templateUrl: './form-modificable.component.html',
  styleUrls: ['./form-modificable.component.scss'],
})
export class FormModificableComponent implements OnInit {
  fb = inject(FormBuilder);
  validatorService = inject(ValidatorsService);
  formLaw: FormGroup;
  formulariosLaws: FormGroup[] = [];
  ordenanza: Ordenancis;
  ordenanzas: Ordenancis[];
  formOrdenanza: FormGroup;
  formOrdenanzas: FormGroup[] = [];

  constructor() {
    this.createFormOrdenanzas();
  }

  ngOnInit(): void {}

  createFormOrdenanzas() {
    this.formOrdenanza = this.fb.group({
      law: ['', [Validators.required]],
      articles: this.fb.array([
        this.fb.group({
          description: ['', [Validators.required]],
        }),
      ]),
    });
    this.formOrdenanzas.push(this.formOrdenanza);
  }

  addArticulo(j: number) {
    const articleFormGroup = this.fb.group({
      description: ['', [Validators.required]],
    });
    this.articulosArray(j).push(articleFormGroup);
  }

  deleteArticulo(index: number, j: number) {
    this.articulosArray(j).removeAt(index);
  }

  addLey() {
    const newFormLaw = this.fb.group({
      law: ['', [Validators.required]],
      articles: this.fb.array([
        this.fb.group({
          description: ['', [Validators.required]],
        }),
      ]),
    });

    this.formOrdenanzas.push(newFormLaw);
  }


  onSaveLaws() {
    this.formOrdenanzas.forEach((form) => {
      this.ordenanza = form.value;
      console.log('ordenanza:', form.value);
    });

    const valuesArray = this.formOrdenanzas.map((form) => form.value);
    this.ordenanzas = valuesArray;
    console.log('ordenanzas', this.ordenanzas)


  }



  //GET DEL FORM ARRAY
  get articlesArray() {
    var array: any = [];
    this.formulariosLaws.forEach((form) => {
      array = form.get('articles') as FormArray;
    });
    return array;
  }

   articulosArray(index: number) {
    const form = this.formOrdenanzas[index];
    return form.get('articles') as FormArray;
    //return this.formOrdenanza.get('articles') as FormArray;
  }

  lawInvalid(index: number) {
    const form = this.formOrdenanzas[index];
    return (
      form.get('law')!.invalid! &&
      form.get('law')!.touched
    );
  }
}
