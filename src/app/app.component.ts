import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isDarkMode = false
  url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  word = 'hello';
  searchWord = `${this.url}${this.word}` 

  toggleTheme(){
    this.isDarkMode= !this.isDarkMode
  }

  fetchData() {
    this.word = 'hello';

    fetch(this.searchWord)
    .then((response) => response.json())
    .then((data)=> console.log(data))
  }

 
}
