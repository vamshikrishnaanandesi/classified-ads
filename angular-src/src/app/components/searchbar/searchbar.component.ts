import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  ul(index) {
    var underlines = document.querySelectorAll(".underline");
    for (var i = 0; i < underlines.length; i++) {
      underlines[i]['style'].transform = 'translate3d(' + index * 100 + '%,0,0)';
    }
    this.router.navigate(['list']);
  }
}
