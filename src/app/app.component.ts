import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isDarkMode = false;
  url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  data: any | undefined;
  phonetic?: string;
  meaning?: [];
  isWordEntered?: boolean
  //definition?: string;
  partOfSpeech?: [];
  synonyms?: [];

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  fetchData(text: string) {
    this.isWordEntered=true
    return fetch(`${this.url}${text}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.data = data;
        this.phonetic = data[0].phonetic;
        this.meaning = data[0].meanings[0].definitions.map(
          (definition: { definition: any }) => definition.definition
        );
        this.synonyms = data[0].meanings[0].definitions.map(
          (synonym: { synonyms: any }) => synonym.synonyms
        );
        this.partOfSpeech = data[0].meanings.partOfSpeech;
        console.log(this.partOfSpeech);
        console.log(this.meaning);
      });
  }
}
