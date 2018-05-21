import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MoviesService } from '../movies.service';


@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

	  private moviesList:Movie[] = [];
    private displayList:Movie[] = [];
    private movies:Movie[] = [];
    private counter: number = 0;
    private errorMessage:any = '';
    private searchTerm: string = '';
    private sortingLabels: any = [];
    private currentRadioBtnActive: string = "";    
    private noRecordsFound: boolean = true;
    private displayMoreBtn: boolean = true;

    constructor(private _moviesService:MoviesService) {}

    ngOnInit() {
      	this.getAllMovieData();
    }

    getAllMovieData() {
      //API call to fetch entire dataset
        this._moviesService.getAllMovieData()
            .subscribe(
                (movies) => {
                    this.moviesList = movies;
                    this.displayList = this.moviesList.map(obj => Object.assign({}, obj))
                    this.renderData();
                    this.createRadioBtn();
                },
                error => {
                  this.errorMessage = error;
                  this.handleError();
                } 
            );
    }

    renderData() {
      this.noRecordsFound = false;
      //This function render data. On click of "More" button it fetches the consequent 24 records.
      if(this.counter != this.displayList.length) {
        this.displayMoreBtn = true;
        //to check if the last set of data is less than 24 records.
        let records = (this.displayList.length - this.counter) < 24 ? 
                       this.displayList.length : (this.counter + 24); 
        for (let i = this.counter; i < records; i++) {
          this.movies.push(this.displayList[i]);
          this.counter++;
        }
      }
      if(this.counter == this.displayList.length) {
        this.displayMoreBtn = false;        
      }
    }

    createRadioBtn() {
      //create radio buttons dynamically
      let obj = {textField: "", sortField: ""};
      obj.textField = "by Title";
      obj.sortField = "title";
      this.sortingLabels.push(obj);
      obj = {textField: "", sortField: ""};
      obj.textField = "by Year";
      obj.sortField = "release_year";
      this.sortingLabels.push(obj);
    }

    sortData(sortField) {
      this.currentRadioBtnActive = sortField;
      this.movies = [];
      this.counter = 0;
      //to check if the sorting is to be done on the searched field
      if (sortField != "") {
          if (this.searchTerm == "") {
            //to sort the entire dataset
            this.displayList = [];  
            this.displayList = this.moviesList.map(obj => Object.assign({}, obj));
          }
          //custom sort comparator
          this.displayList.sort(function(a, b) {
            if (a[sortField] > b[sortField])
               return 1;
            else if (a[sortField] <= b[sortField])
               return -1;
          })  
        
      }
      if (this.displayList.length != 0)
         this.renderData();
      else 
        // in case of search if no results are found.
        this.noRecordsFound = true;
    }

    search(searchTerm) {
        this.counter = 0;
        this.movies = [];
        this.displayList = [];
          
            if(searchTerm != "") {
              //search based of text input
              for (let i = 0; i < this.moviesList.length; i++) {
                      if(this.moviesList[i].title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        this.moviesList[i].release_year.toString().includes(searchTerm.toLowerCase())) {
                            this.displayList.push(this.moviesList[i]);
                      }
              }
            } else {
                //if search input is blank display original data
                this.displayList = this.moviesList.map(obj => Object.assign({}, obj));
            } 
            //sort the searched data if any radio button is active
            this.sortData(this.currentRadioBtnActive);
      }

      handleError() {
        console.log("Error in fetching data from API : " + this.errorMessage);
      }
}
