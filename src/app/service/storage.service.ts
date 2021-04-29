import {Injectable} from '@angular/core';
import {LocalUser} from '../model/local-user';
import {STORAGE_KEYS} from '../const/storage_keys.config';
import {Game} from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  getLocalUser(): LocalUser {
    const localUser = localStorage.getItem(STORAGE_KEYS.localUser);
    if (localUser == null) {
      return null;
    }
    return JSON.parse(localUser);
  }

  setLocalUser(localUser: LocalUser): void {
    localUser == null ? localStorage.removeItem(STORAGE_KEYS.localUser) :
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(localUser));
  }

  getLocalNickname(): string {
    const localUser = localStorage.getItem(STORAGE_KEYS.localNickname);
    if (localUser == null) {
      return null;
    }
    return localUser;
  }

  setLocalNickname(nickname: string): void {
    nickname === null ? localStorage.removeItem(STORAGE_KEYS.localNickname) :
      localStorage.setItem(STORAGE_KEYS.localNickname, JSON.stringify(nickname));
  }

  setLocalGame(game: Game): void {
    game === null ? localStorage.removeItem(STORAGE_KEYS.localGame) :
      localStorage.setItem(STORAGE_KEYS.localGame, JSON.stringify(game));
  }

  getLocalGame(): string {
    const localGame = localStorage.getItem(STORAGE_KEYS.localGame);
    if (localGame == null) {
      return null;
    }
    return localGame;
  }

  setLocalPlayerTurn(playerTurn: string): void {
    playerTurn === null ? localStorage.removeItem(STORAGE_KEYS.localPlayerTurn) :
      localStorage.setItem(STORAGE_KEYS.localPlayerTurn, JSON.stringify(playerTurn));
  }

  getLocalPlayerTurn(): string {
    const localGame = localStorage.getItem(STORAGE_KEYS.localPlayerTurn);
    if (localGame == null) {
      return null;
    }
    return localGame;
  }

}
