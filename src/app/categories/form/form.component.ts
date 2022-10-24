import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'categoty-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  categoryForm = new FormGroup({
    id: new FormGroup(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log("submit on form.component.ts", this.categoryForm.value)
  }

}
