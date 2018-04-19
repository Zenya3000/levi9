import { ListService } from './../../services/list.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-onenew',
  templateUrl: './onenew.component.html',
  styleUrls: ['./onenew.component.sass'],
  providers: [ListService]
})
export class OnenewComponent implements OnInit {
  @Input() title;
  @Input() apiUrl;
  @Input() webUrl;

  mark: boolean = false;
  private value;
  article: any;
  constructor(private ls: ListService) { }

  ngOnInit() {
  }
  
  getArticle(){
    this.mark = !this.mark;
    if(this.mark){
      this.ls.getArticle(this.apiUrl).then(
        (res) => { 
          this.value = Object.keys(res).map(key => res[key])
          if(this.value[0].status == 'ok'){
            this.value.forEach(element => {
              if( element.content != null){
                this.article = element.content;
              }
            });
          }
         },
        (err) => { console.log('error', err) }
      )
    }
    
  }
}
