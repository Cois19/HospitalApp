import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Equipment } from '../_models/equipment';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {
  baseUrl = environment.apiUrl;
  equipments: Equipment[] = [];
  equipmentCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getEquipments(userParams: UserParams) {
    var response = this.equipmentCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('department', userParams.department);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Equipment[]>(this.baseUrl + 'users', params, this.http)
      .pipe(map(response => {
        this.equipmentCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))
  }

  getEquipment(username: string) {
    const equipment = [...this.equipmentCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((equipment: Equipment) => equipment.username === username);

    if (equipment) {
      return of(equipment);
    }
    return this.http.get<Equipment>(this.baseUrl + 'users/' + username);
  }

  updateEquipment(equipment: Equipment) {
    return this.http.put(this.baseUrl + 'users/', equipment).pipe(
      map(() => {
        const index = this.equipments.indexOf(equipment);
        this.equipments[index] = equipment;
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addMark(username: string) {
    return this.http.post(this.baseUrl + 'marks/' + username, {});
  }

  getMarks(predicate: string, pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Equipment[]>>(this.baseUrl + 'marks', params, this.http);
  }

}
