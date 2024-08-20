import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';


@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal(''); 
  private placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;

  

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService.loadUserPlaces()
      .subscribe({
        error : (error : Error)=>{
          console.log(error);
          this.error.set(error.message);
        },
        complete:()=>{
          this.isFetching.set(false);
        }
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
