import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Component } from '@angular/core';
declare var Swal:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	notas = [];
	nota:FormGroup;
	notaEdit:FormGroup;
	intento = false;
	intentoEdit = false;
	showEditar = false;
	Toast = Swal.mixin({
	  toast: true,
	  position: 'top-end',
	  showConfirmButton: false,
	  timer: 3000,
	  timerProgressBar: true,
	  onOpen: (toast) => {
	    toast.addEventListener('mouseenter', Swal.stopTimer)
	    toast.addEventListener('mouseleave', Swal.resumeTimer)
	  }
	})
	constructor(){
		this.nota= new FormGroup({
	        data:new FormControl(null,[Validators.required,Validators.minLength(1)]),
	        color:new FormControl(null,Validators.required),
	  	});
	  	this.notaEdit= new FormGroup({
	        data:new FormControl(null,[Validators.required,Validators.minLength(1)]),
	        color:new FormControl(null,Validators.required),
	  		index:new FormControl(null,Validators.required)
	  	});
	}
	agregar(){
		console.log(this.nota);
		this.intento = true;
		if(this.nota.valid) {
			this.notas.push(this.nota.value);
			this.nota.reset();
			this.intento = false;

			this.Toast.fire({
			  icon: 'success',
			  title: 'Nota agregada correctamente'
			})
		}
	}
	eliminar(i){
		this.notas.splice(i, 1);
		this.Toast.fire({
			  icon: 'success',
			  title: 'Nota eliminada correctamente'
			})
	}
	editar(i){
		console.log(i);
		this.showEditar = true;
		this.notaEdit.patchValue({
			data:this.notas[i].data,
			color:this.notas[i].color,
			index:i
		});		
	}
	update(){
		this.intentoEdit= true;
		console.log(this.notaEdit);
		if(this.notaEdit.valid) {
			this.notas[this.notaEdit.value.index] = {data:this.notaEdit.value.data, color:this.notaEdit.value.color};
			this.intentoEdit = false;
			this.showEditar= false;
			

			this.Toast.fire({
			  icon: 'success',
			  title: 'Nota actualizada correctamente'
			})
		}
	}
}
