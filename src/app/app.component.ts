import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ang-dictionary';

  url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  word = 'hello';
  searchWord = `${this.url}${this.word}` 

  fetchData() {
    this.word = 'hello';

    fetch(this.searchWord)
    .then((response) => response.json())
    .then((data)=> console.log(data))
  }
}
