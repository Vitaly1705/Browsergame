import { Component } from '@angular/core';
import { APIService } from '../API.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  textArray!: any[];
  newText!: any;
  user: string = 'Vitaly';
  userId: number = 4;
  popupSound = new Audio('assets/chatpopup.mp3');
  chatsize = 0


  constructor(private Service: APIService) { }

  ngOnInit() {
    this.chatsize = 0
    this.textArray = []
    this.Service.getText().subscribe(data => {
    this.setTime(data.textArray)
          //Scrollt die Scrollbar nach ganz unten immer zum Aktuellen Text
    const textList = document.querySelector('.text-list');
    if (textList) {
      textList.scrollTop = textList.scrollHeight;
    }
    });
    this.chatIntervarl()
  }

  chatIntervarl() {
    interval(3000).subscribe(() => {
      this.Service.getText().subscribe(data => {
        this.setTime(data.textArray)
      });
    });
  }

  setTime(data: any[]) {
    this.textArray = data
    if (this.chatsize < this.textArray.length) {
      this.popupSound.play();
      this.chatsize = this.textArray.length
    }



  }

  addText() {
    if (this.user && this.newText) {
      this.Service.postText(this.userId, this.user, this.newText).subscribe(data => {
        this.setTime(data.textArray)
        this.newText = '';
 
      });

      //Scrollt die Scrollbar nach ganz unten immer zum Aktuellen Text
      const textList = document.querySelector('.text-list');
      if (textList) {
        textList.scrollTop = textList.scrollHeight;
      }
    }

  }
}
