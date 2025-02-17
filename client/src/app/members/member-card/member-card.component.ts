import { Component, input, inject, computed } from '@angular/core';
import { Member } from '../../_models/member';
import { LikesService } from '../../_services/likes.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  private likeService = inject(LikesService);
  member = input.required<Member>();
  hasLiked = computed(() => this.likeService.likesIds().includes(this.member().id));
  //isOnline = computed(() => )

  toggleLike(){
    this.likeService.toggleLike(this.member().id).subscribe({
      next: () => {
        if(this.hasLiked()){
          this.likeService.likesIds.update(ids => ids.filter(x => x !== this.member().id))
        }else {
          this.likeService.likesIds.update(ids => [...ids, this.member().id])
        }
      }
    });
  }
}
