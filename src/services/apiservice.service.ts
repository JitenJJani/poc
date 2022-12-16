import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsers } from 'src/models/users';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private httpClient: HttpClient) {

  }

  getUsers = () => {
    return this.httpClient.get("https://retoolapi.dev/TFdRxq/users");
  }

  getUsersList = () => {
    return this.httpClient.get("https://retoolapi.dev/cmB773/users");
  }

  createUser = (body: IUsers) => {
    return this.httpClient.post("https://retoolapi.dev/cmB773/users", body);
  }

  updateUser = (userID: number, body: IUsers) => {
    return this.httpClient.put("https://retoolapi.dev/cmB773/users/" + userID, body);
  }

  getUserDetails = (userID: number) => {
    return this.httpClient.get("https://retoolapi.dev/cmB773/users/" + userID);
  }

  filterUserList = (payload: string) => {
    return this.httpClient.get("https://retoolapi.dev/cmB773/users?" + payload);
  }

  deleteUser = (userID: number) => {
    return this.httpClient.delete("https://retoolapi.dev/cmB773/users/" + userID);
  }
}
