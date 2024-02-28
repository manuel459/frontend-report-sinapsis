import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaniaTsService } from '../services/campania.ts.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campania.ts',
  templateUrl: './campania.ts.component.html',
  styleUrls: ['./campania.ts.component.css']
})
export class CampaniaTsComponent implements OnInit {
  public formulario: FormGroup | any;
  constructor(public dialogRef: MatDialogRef<CampaniaTsComponent>, private fb: FormBuilder,public campaniaServices: CampaniaTsService) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      idUsuario: [1, [Validators.required]],
      fechaHoraProgramacion: ['', Validators.required],
      estado: [1]
    });
   }

  ngOnInit(): void {
  }


  insertCampania(){
    console.log(this.formulario)
    this.campaniaServices.insertCampania(this.formulario.value).subscribe(response => {
      if (response.succest){
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.dialogRef.close()
      }
      else{
            Swal.fire({
            icon: 'error',
            title: response.message,
            html: response.body,
          })
        
      }
    })
  }

  get registerFormControl() {
    return this.formulario.controls;
  }

  close(){
    this.dialogRef.close()
  }

}
