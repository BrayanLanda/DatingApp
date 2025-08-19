import { Injectable, inject, signal } from '@angular/core';
import { environment } from  '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  likesIds = signal<number[]>([]);

  toggleLike(targedId: number){
    return this.http.post(`${this.baseUrl}/likes/${this.likesIds}`, {});
  }

  getLikes(predicate: string){
    return this.http.get<Member[]>(`${this.baseUrl}/likes?predicate=${predicate}`);
  }

  getLikesIds(){
    return this.http.get<number[]>(`${this.baseUrl}/likes/list`).subscribe({
      next: ids => this.likesIds.set(ids)
    })
  }
}
