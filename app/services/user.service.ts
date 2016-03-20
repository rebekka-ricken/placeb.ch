import {BaseService} from './base.service';
import {Injectable} from 'angular2/core';
import {httpWrap} from './common/http-wrapper.service';
import {Reservation} from '../interfaces/reservation';

@Injectable()
export class UserService extends BaseService {

  public isUserFetched: boolean = false;

  public userData = null;

  constructor(public http: httpWrap) {
    super();
  }

  init(data) {
    for (var p in data) {
      if (this.userData.hasOwnProperty(p)) {
        this.userData[p] = data[p];
      }
    }
    this.isUserFetched = true;
  }

  getUser() {
    return this.isUserFetched ? this.userData : 'no data';
  }

  getCurrentUser() {
    return this.http.get(
      `${this.baseUrl}${this.userSuffix}`
    );
  }

  updateCurrentUser(id, data) {
    return this.http.patch(
      `${this.baseUrl}${this.usersSuffix}${id}`, data
    );
  }

  getUserReservations(id) {
    return this.http.get(
      `${this.baseUrl}${this.usersSuffix}${id}${this.reservationsSuffix}`
    );
  }

  getReservation(id: string) {
    return this.http.get(
      `${this.baseUrl}${this.apiSuffix}${this.reservationsSuffix}/${id}`
    )
  }

  createUserReservations(id, data:Reservation) {
    return this.http.post(
      `${this.baseUrl}${this.usersSuffix}${id}${this.reservationsSuffix}`,
      data
    );
  }

}
