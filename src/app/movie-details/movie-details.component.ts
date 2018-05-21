import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';


@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  
  @Input()	
  movie: Movie;
  

  private displayTooltip: boolean = false;
  private movieDetail: Movie;   
  constructor() { }

  ngOnInit() {
  }

  showTooltip(movieDetail) {
  	this.displayTooltip = true;
  	this.movieDetail= movieDetail;
  }

  hideTooltip() {
  	this.displayTooltip = false;
  }
}
