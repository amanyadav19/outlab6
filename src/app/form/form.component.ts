import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, EmailValidator} from '@angular/forms';
import { FormService, form_data } from '../form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  fdata: form_data;
  success: number=0;
  fail: number=0;
	profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
    feedback: ['', Validators.required],
    comment: [''],
  });
  constructor(private fb: FormBuilder, private formService: FormService) { }

  clear() {
    this.profileForm.setValue({name: '',
    email: '',
    feedback: '',
    comment: ''})
  }

  ngOnInit(): void {
  	this.clear();
  	this.getInitialValues();
  }
  updateProfile() {
  this.profileForm.patchValue({
  	name: this.fdata.name,
  	email: this.fdata.email,
  	feedback: this.fdata.feedback,
  	comment: this.fdata.comment
  });
  }
  onSubmit(){
  	this.formService.postData(this.profileForm.value)
  	.subscribe(
  		data => this.raisePopup("success"),
      errors => this.raisePopup("fail")
    );
  }

  getInitialValues(): void {
  	this.formService.getInitialData()
      .subscribe((data: form_data) => {this.fdata = { ...data};
      this.updateProfile();
      });
  }
  raisePopup(s: string) {
  	if(s=="success") {
  		this.clear();
  		this.success=1;
  		setTimeout(function() {
       this.success=0;
   		}.bind(this), 2000);
  	}
  	else {
  		this.fail=1;
  		setTimeout(function() {
       this.fail=0;
   		}.bind(this), 2000);
  	}
  }
}
