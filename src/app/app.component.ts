import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, NgFor, NgStyle, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isDarkMode = false;
  url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  data: any;
  phonetic?: string;
  meaning: string[] = [];
  isWordEntered = false;
  partOfSpeech: string[] = [];
  synonyms: string[] = [];
  isDropdown = false;
  isDropRotated = false;
  selectedFont = 'first';
  isThereError = false;
  word?: string;
  audio?: string;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  toggleDropdown() {
    this.isDropdown = !this.isDropdown;
    this.isDropRotated = !this.isDropRotated;
  }

  applyFont(font: string) {
    this.selectedFont = font;
  }

  fetchData(text: string) {
    return fetch(`${this.url}${text}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.isWordEntered = true;
        this.data = data;
        this.word = data[0].word;
        this.phonetic = data[0].phonetic;
        this.meaning = data[0].meanings[0].definitions.map(
          (definition: { definition: any }) => definition.definition
        );
        this.synonyms = data[0].meanings[0].definitions.flatMap(
          (definition: { synonyms: any }) => definition.synonyms || []
        );
        this.partOfSpeech = data[0].meanings.flatMap(
          (meaning: { partOfSpeech: any }) => meaning.partOfSpeech || []
        );
        //this.audio = data[0].phonetics[1]?.audio;
        console.log(this.partOfSpeech);
        console.log(this.meaning);
        return data;
      })
      .catch((err) => {
        console.log(err);
        this.isThereError = true;
        this.isWordEntered = false;
      });
  }

  audioPlay(){
    let audio = new Audio;
    audio.src = this.data[0].phonetics[0].audio ;
    audio.load();
    audio.play();
  }

}
