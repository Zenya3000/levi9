import { Observable } from 'rxjs/Observable';
import { ListService } from './../services/list.service';
import { Component, OnInit } from '@angular/core';
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

  onPaginateChange(event){
     this.pageIndex = event.pageIndex +1;
     this.refresh();
  }

}



