import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit, OnChanges  {
  @Input() limit: number = 10;
  @Input() size: number = 1;

  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  
  // currentPage: number;
  totalPages: number = 0;
  pages: Observable<number[]>;
  constructor() { }

  ngOnInit() {
    this.getPages(this.limit, this.size);
  }

  ngOnChanges(){
    this.getPages(this.limit, this.size);
  }
  getPages(limit: number, size: number) {
    console.log('limit:', limit, 'size:', size)
    this.totalPages = this.getTotalPages(limit, size);
  }
  getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }
  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }
  selectPage(page: number, event) {
    this.cancelEvent(event);
    console.log('page', page);
    if (this.isValidPageNumber(page, this.totalPages)) {
      this.pageChange.emit(page);
    }
  }
  cancelEvent(event) {
    event.preventDefault();
  }
}
