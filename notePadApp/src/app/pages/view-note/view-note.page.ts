import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient, private route: ActivatedRoute) { }

sub: any

  ngOnInit() {

      }

  }


  


