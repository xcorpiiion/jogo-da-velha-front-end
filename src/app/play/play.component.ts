import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth/auth.service';
import {Router} from '@angular/router';
import {ClienteService} from '../service/model/cliente.service';
import {interval} from 'rxjs';
import {StorageService} from '../service/storage.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {

  playForm: FormGroup;
  @Input() playModal: any;
  interval: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
              private clienteService: ClienteService, private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.playForm = this.formBuilder.group({
      ip: [''],
      port: ['', Validators.required],
      playerName: ['', Validators.required],
      email: ['']
    });
    this.interval = interval(10000).subscribe(x => {
      this.clienteService.isAllowed().subscribe((isAllowed) => {
        if (isAllowed) {
          alert('Opponent found');
          this.playModal.close();
          this.storageService.setLocalNickname(String(this.playForm.get('playerName').value));
          this.router.navigate(['home']);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.interval.unsubscribe();
  }

  handleTestConnection(): void {
    this.clienteService.testConnection(this.playForm.value).subscribe(() => {
    }, error => {
      console.error('Erro de conexão');
      alert('Erro de conexão');
    });
  }

  handlePlay(): void {
    this.playForm.get('email').setValue(this.authService.getEmail());
    this.clienteService.play(this.playForm.value).subscribe(() => {
      alert('Waiting opponent...');
    }, error => {
      console.error('Erro de conexão');
      alert('Erro de conexão');
    });
  }

}
