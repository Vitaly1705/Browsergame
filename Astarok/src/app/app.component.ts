import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  textArray!: any[];
  newText!: any;
  user: string = 'King';


  constructor(private ChatService: ChatService) { }

  ngOnInit() {
    this.textArray = [{ user: 'King', text: 'hallo', timestamp: '2023-12-24T23:26:58.849Z' },]

    // this.textArray.forEach(item => {
    //   const timestamp = new Date(item.timestamp);
    //   const formattedTime = timestamp.toLocaleTimeString();
    
    //   // Das formatierte Datum ersetzt den ursprünglichen Timestamp
    //   item.timestamp = formattedTime;
    // });

    this.textArray.forEach(item => {
      const timestamp = new Date(item.timestamp);
      const hours = timestamp.getHours().toString().padStart(2, '0');
      const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    
      // Die formatierte Uhrzeit ersetzt den ursprünglichen Timestamp
      item.timestamp = `${hours}:${minutes}`;
    });
    // interval(5000).subscribe(() => {
    //   this.ChatService.getText().subscribe(data => {
    //     this.textArray = data.textArray;
    //     console.log(this.textArray)
    //   });
    // });
    interval(3000).subscribe(() => {
      const textList = document.querySelector('.text-list');
      if (textList) {
        textList.scrollTop = textList.scrollHeight;
      }
    });
  }

  addText() {
    // if(this.user && this.newText){
    //   this.ChatService.postText(this.user, this.newText).subscribe(data => {
    //     this.textArray = data.textArray;
    //     this.newText = '';
    //   });
    // }

  }
}
