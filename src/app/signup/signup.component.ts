import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth/auth.service';
import {ClienteService} from '../service/model/cliente.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
              private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
    });
  }

  signup(): void {
    this.clienteService.save(this.userForm.value).subscribe(() => this.showSavedOk());
  }

  showSavedOk(): void {
    alert('Cadastrado com sucesso');
    this.router.navigate(['signin']);
  }

  back(): void {
    this.router.navigate(['signin']);
  }
}
