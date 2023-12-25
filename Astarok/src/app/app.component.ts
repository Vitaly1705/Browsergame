import { Component } from '@angular/core';
import { APIService } from './API.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  textArray!: any[];
  newText!: any;
  user: string = 'Vitaly';
  userId: number = 4;


  constructor(private Service: APIService) { }

  ngOnInit() {
    this.textArray = []

    interval(2000).subscribe(() => {
      this.Service.getText().subscribe(data => {
        this.setTime(data.textArray)
      });
    });

  }

  setTime(data:any[]){
    data.forEach(item => {
      const timestamp = new Date(item.timestamp);
      const hours = timestamp.getHours().toString().padStart(2, '0');
      const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    
      // Die formatierte Uhrzeit ersetzt den ursprünglichen Timestamp
      item.timestamp = `${hours}:${minutes}`;
    });

    this.textArray = data

    //Scrollt die Scrollbar nach ganz unten immer zum Aktuellen Text
    const textList = document.querySelector('.text-list');
    if (textList) {
      textList.scrollTop = textList.scrollHeight;
    }
  }

  addText() {
    if(this.user && this.newText){
      this.Service.postText(this.userId,this.user, this.newText).subscribe(data => {
        this.setTime(data.textArray)
        this.newText = '';
      });
    }

  }
}
