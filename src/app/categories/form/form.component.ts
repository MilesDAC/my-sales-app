import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Category } from '../category.dto'

@Component({
  selector: 'categoty-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Output() back = new EventEmitter();

  @Output() save = new EventEmitter<Category>();
  
  @Input() loading: Boolean = false;

  @Input() set category(category:Category){
    this.categoryForm.setValue(category);
    this.categoryForm.value.id = category.id;
    console.log("input data", this.categoryForm.value)
  } 
  
  /* categoryForm = new FormGroup({
    id: new FormGroup(0),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('')
  }) */
  //FORM BUILDER IS A NICER WAY TO MAKE FORMS FROM ANGULAR
  categoryForm = this.fb.group(
    {
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    }
  )

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    console.log("submit on form.component.ts", this.categoryForm.value)
    //THROWS ERROR : ID IS NULL ON SUBMIT !!!
    //CIRCUMVVENT ERROR : SET 'categoryForm.value.id' TO AN INT
    //this.categoryForm.value.id = (0);
    this.save.emit(this.categoryForm.value as Category);
  }
  onBack(){
    this.back.emit();
  }

}
