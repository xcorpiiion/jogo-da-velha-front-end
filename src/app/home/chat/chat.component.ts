import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ClienteService} from '../../service/model/cliente.service';
import {interval} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../../service/storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy, OnChanges {

  messages = [] = [];
  interval: any;
  message = '';
  mensagemForm: FormGroup;
  yourMessage = '';

  constructor(private formBuilder: FormBuilder,
              private clienteService: ClienteService, private changeDetector: ChangeDetectorRef,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.yourMessage = JSON.parse(this.storageService.getLocalNickname());
    this.mensagemForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
    this.interval = interval(3000).subscribe(() => {
      this.clienteService.getMessage().subscribe((messages) => {
        if (messages) {
          this.messages = messages;
          this.changeDetector.detectChanges();
          console.log(this.messages);
          this.clienteService.messegeReceived().subscribe(() => {

          }, error => console.error(error));
        }
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.messages) {
      console.log('Mudou');
    }
  }

  ngOnDestroy(): void {
    this.interval.unsubscribe();
  }

  handleClick(): void {
    this.yourMessage = JSON.parse(this.storageService.getLocalNickname());
    this.yourMessage += ': ' + this.mensagemForm.controls.message.value;
    this.messages.push(this.yourMessage);
    console.log('Mensagem: ' + this.yourMessage);
    this.clienteService.sendMessage(this.yourMessage).subscribe(() => {
      console.log('Enviado');
    }, error => console.error(error));
  }

}
