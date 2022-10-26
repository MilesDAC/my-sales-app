import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Category } from '../category.dto'

@Component({
  selector: 'categoty-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Output() back = new EventEmitter();

  @Output() save = new EventEmitter<Category>();
  
  categoryForm = new FormGroup({
    id: new FormGroup(0),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    console.log("submit on form.component.ts", this.categoryForm.value)
    this.save.emit(this.categoryForm.value as Category);
  }

  onBack(){
    this.back.emit();
  }

}
