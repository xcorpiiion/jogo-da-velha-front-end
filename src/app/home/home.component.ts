import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {ClienteService} from '../service/model/cliente.service';
import {StorageService} from '../service/storage.service';
import {Game} from '../model/game';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  player1 = 'assets/imagens/Gota.png';
  player2 = 'assets/imagens/image_icon_x_mark_pic_512x512.png';
  noPlayer = 'assets/imagens/white%20panel.png';
  currentImages: string[] = [];
  playerTurn = this.player1;
  hasWin = false;
  gameStarted = false;
  playerName = '';
  rowWin: number[] = [0, 3, 6, 1, 4, 7, 2, 5, 8];
  columnWin: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  diagonalWin: number[] = [0, 4, 8, 2, 4, 6];
  interval: any;
  game: Game;

  constructor(private clienteService: ClienteService, private storageService: StorageService, private router: Router) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 9; i++) {
      this.currentImages.push(this.noPlayer);
    }
    this.clienteService.blockSquareGame().subscribe((game) => {
      this.game = game;
      if (this.game.myId > this.game.opponentId) {
        this.game.player1 = this.player1;
        this.game.player2 = this.player2;
      } else {
        this.game.player1 = this.player2;
        this.game.player2 = this.player1;
      }
      this.storageService.setLocalGame(game);
    });
    this.game = JSON.parse(this.storageService.getLocalGame());
    console.log(this.game);
    if (this.game.player1 === this.player1) {
      this.playerTurn = this.player1;
      this.storageService.setLocalPlayerTurn(this.playerTurn);
      this.playerName = this.game.myNickname;
    } else {
      this.playerTurn = this.player1;
      this.storageService.setLocalPlayerTurn(this.playerTurn);
      this.playerName = this.game.opponentNickname;
    }
    console.log('Turno no onInit: ' + JSON.parse(this.storageService.getLocalPlayerTurn()));
    this.interval = interval(3000).subscribe(() => {
      if (JSON.parse(this.storageService.getLocalPlayerTurn()) === this.game.player2) {
        this.playerName = this.game.opponentNickname;
        this.clienteService.blockSquareGame().subscribe((game) => {
          console.log('Caiu aqui com o nome: ' + this.game.opponentNickname);
          this.playValues(game.buttonNumber, game.opponentNickname, this.game.player2);
        });
      } else {
        this.playerName = this.game.myNickname;
      }
    });
  }

  ngOnDestroy(): void {
    this.interval.unsubscribe();
  }

  handleClickInSquare(index: number): void {
    if (this.currentImages[index] !== this.noPlayer) {
      alert('Square already clicked');
      return;
    }
    console.log('playerTurn: ' + this.playerTurn);
    if (JSON.parse(this.storageService.getLocalPlayerTurn()) === this.game.player1) {
      console.log('Nickname atual: ' + this.game.myNickname);
      this.playValues(index, this.game.opponentNickname, this.game.player1);
    }
    // this.playValues(index, this.game.myNickname, this.game.player1);
    this.gameStarted = true;
  }

  private playValues(index: number, playerName, currentPlayer): void {
    if (index !== null && this.currentImages[index] === this.noPlayer) {
      this.clienteService.buttonNumber(String(index)).subscribe((value) => {
        console.log(value);
      }, error => {
        console.error(error);
      });
      this.playerName = playerName;
      this.currentImages[index] = currentPlayer;
      this.playerTurn = JSON.parse(this.storageService.getLocalPlayerTurn()) === this.game.player1 ? this.game.player2 : this.game.player1;
      this.storageService.setLocalPlayerTurn(this.playerTurn);
      this.verifyWin(currentPlayer);
    }
  }

  verifyWin(currentPlayer: string): void {
    this.checkPosition(currentPlayer, this.columnWin);
    this.checkPosition(currentPlayer, this.rowWin);
    this.checkPosition(currentPlayer, this.diagonalWin);
    this.checkNoWin();
  }

  private checkNoWin(): void {
    if (!this.hasWin && this.gameStarted) {
      for (let i = 0; i < this.currentImages.length; i++) {
        if (this.currentImages[i] === this.noPlayer) {
          return;
        }
      }
      alert('No win');
      this.router.navigate(['empresa']);
    }
  }

  private checkPosition(currentPlayer: string, position: number[]): void {
    let contador = 0;
    for (let i = 0; i < 3; i++) {
      if (this.currentImages[position[contador]] === currentPlayer &&
        this.currentImages[position[contador + 1]] === currentPlayer &&
        this.currentImages[position[contador + 2]] === currentPlayer) {
        alert('Player: ' + this.playerName + ' venceu, retire o seu prêmio no RH com o código: ' + Math.random());
        this.router.navigate(['empresa']);
        this.hasWin = true;
        break;
      }
      contador += 3;
    }
  }
}
