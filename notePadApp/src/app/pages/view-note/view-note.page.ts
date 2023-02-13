import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {

  noteTitle: any
  noteDescription: any
  noteOwner: any
  noteFavorite: any
  noteCollection: any
  noteId: any

  noteInfo: any
  newNoteInfo: any
  newNoteDescription: any

  constructor(private router: Router, private httpClient: HttpClient, private route: ActivatedRoute) { }

  sub: any

  ngOnInit() {
    this.noteTitle = this.route.snapshot.paramMap.get("title")
    this.noteOwner = this.route.snapshot.paramMap.get("owner")
    this.noteFavorite = this.route.snapshot.paramMap.get("favorite")
    this.noteCollection = this.route.snapshot.paramMap.get("collection")
    this.noteId = this.route.snapshot.paramMap.get("_id")
    
    this.noteInfo = this.route.snapshot.paramMap.get("info")
    this.newNoteInfo = this.noteInfo

    this.noteDescription = this.route.snapshot.paramMap.get("description")
    this.newNoteDescription = this.noteDescription


  }

  saveNote() {
    let newInfo = {
      id: this.noteId,
      info: this.newNoteInfo,
      description: this.newNoteDescription
    }
    console.log(newInfo)
    this.httpClient.post('http://localhost:3000/notes/updateNote', { updatedNote: newInfo }).subscribe(res => {
      this.router.navigateByUrl('/', { replaceUrl: false })
    }

    )
  }

}



