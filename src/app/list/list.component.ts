import { Observable } from 'rxjs/Observable';
import { ListService } from './../services/list.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  providers: [ListService],
})
export class ListComponent implements OnInit {
  length: number;
  pageSize: number;
  pageIndex: number = 1;
  pageEvent: PageEvent;
  pageSizeOptions: any;
  
  //my pagination
  count: number = 0;
  offset: number = 0;
  limit: number = 10;
  range: number = 3;



  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  panelOpenState: boolean = false;
  private getList;
  queryRes = [];


  constructor(private ls: ListService) { 

    this.ls.getNews(this.pageIndex).then(
      (res) => { 
        this.getList = Object.keys(res).map(key => res[key])
        if(this.getList[0].status == 'ok'){
          console.log('status =>', this.getList[0].status);
          console.log(this.getList);

          this.getList.forEach(element => {
            if( element.results != null){
              this.queryRes = element.results;
              this.pageSize = element.pageSize;
              this.pageIndex = element.currentPage;
              this.length = element.pages;
            }
          });
        } else {
          console.log('status =>', this.getList[0].status);
        }
       },
      (err) => { console.log('error', err) }
    )

  }

  ngOnInit(){}

  refresh(){
    this.ls.getNews(this.pageIndex).then(
      (res) => { 
        this.getList = Object.keys(res).map(key => res[key])
        if(this.getList[0].status == 'ok'){
          console.log('status =>', this.getList[0].status);
          this.getList.forEach(element => {
            if( element.results != null){
              this.queryRes = element.results;
            }
          });
        } else {
          console.log('status =>', this.getList[0].status);
        }
       },
      (err) => { console.log('error', err) }
    )
  }


  pageChange(event){
    this.pageIndex = event;
    this.refresh();
  }
}



