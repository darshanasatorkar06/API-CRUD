import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import{MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  userForm !: FormGroup
  actionBtn: string = "save"

  constructor(private formBuilder:FormBuilder, private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData :any,

    private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName:[''],
      email:['']
    });

    if(this.editData){
      this.actionBtn = 'Update'
      this.userForm.controls['firstName'].setValue(this.editData.firstName)
      this.userForm.controls['lastName'].setValue(this.editData.lastName)
      this.userForm.controls['email'].setValue(this.editData.email)
    }
  }

  submit(){
   if(!this.editData){
    if(this.userForm.valid){
      this.api.postUser(this.userForm.value)
      .subscribe({
        next:(res)=>{
          console.log("user added",this.userForm.value)
          alert("user added successfully")
          this.userForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("erroe while adding user")
        }
  
      })
     }
   }
   else{
    this.updateUser()
   }
  }
  updateUser(){
    this.api.putUser(this.userForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        console.log("updated data", this.userForm.value)
        alert("Data updated successfully")
        this.userForm.reset();
        this.dialogRef.close('Updated')
      },
      error:()=>{
        alert(" Error while updating the data")
      }

    })
    

}
}
