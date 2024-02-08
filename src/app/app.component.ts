import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { response } from 'express';
import { url } from 'inspector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, NgFor, NgStyle, NgIf, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  
  // strings
  searchKey?: string;
  data: any;
  phonetic?: string;
  word?: string;
  audio?: string;
  wordUrl? :string;
  selectedFont = 'first';
  fontsArray = ['Serif', 'Sans Serif', 'Monospace'];
  currentFont = this.fontsArray[0]

  // array initials
  partOfSpeech: string[] = [];

  // booleans
  isDarkMode = false;
  isWordEntered = false;
  isDropdown = false;
  isDropRotated = false;
  isThereError = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  toggleDropdown() {
    this.isDropdown = !this.isDropdown;
    this.isDropRotated = !this.isDropRotated;
  }

  applyFont(font: string, i:number) {
    this.selectedFont = font;
    this.currentFont=  this.fontsArray[i]
  }

  fetchData(text?: string) {
    return fetch(`${this.url}${text}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.isWordEntered = true;

        console.log(data)
        this.data = data;
        this.word = data[0].word;
        this.phonetic = data[0].phonetic || data[0].phonetics[0].text;
        this.wordUrl = data[0].sourceUrls;

        this.partOfSpeech = data[0].meanings.flatMap(
          (meaning: { partOfSpeech: any }) => meaning.partOfSpeech || []
        );
        return data;
      })
      .catch((err) => {
        console.log(err);
        this.isThereError = true;
        this.isWordEntered = false;
      });
  }

  audioPlay() {
    let audio = new Audio();
    audio.src =
      this.data[0].phonetics[0].audio ||
      this.data[0].phonetics[1].audio ||
      this.data[0].phonetics[2].audio;

    audio.load();
    audio.play();

    const speech = this.data[0].meanings.flatMap(
      (meaning: { partOfSpeech: any }) => meaning.partOfSpeech || []
    );
  }

  getMeaningsByPartOfSpeech(speech: string) {
    const meanings = [];

    for (let partSpeech of this.data[0].meanings) {
      if (partSpeech.partOfSpeech === speech) {
        for (let definition of partSpeech.definitions) {
          meanings.push(definition.definition);
        }
      }
    }

    return meanings;
  }

  getSynonymsByPartOfSpeech(speech: string) {
    const synonyms = [];

    for (let partSpeech of this.data[0].meanings) {
      if (partSpeech.partOfSpeech === speech) {
        for (let definition of partSpeech.definitions) {
          synonyms.push(...definition.synonyms);
        }
      }
    }

    return synonyms;
  }

  getAntonymsByPartOfSpeech(speech: string) {
    const antonyms = [];

    for (let partSpeech of this.data[0].meanings) {
      if (partSpeech.partOfSpeech === speech) {
        for (let definition of partSpeech.definitions) {
          antonyms.push(...definition.antonyms);
        }
      }
    }
    return antonyms;
  }
}
