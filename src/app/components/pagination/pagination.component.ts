import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  currentPage = 1;
  @Input() productsNum = 0;
  @Input() pageNumbers: number[] = [];
  @Input() selectNumForm!: FormControl;

  @Output() currentPageChange = new EventEmitter<number>();

  setCurrentPage(page: number) {
    this.currentPage = page; this.currentPageChange.emit(this.currentPage);
  }

  getVisiblePages() {
    const visiblePages = 3;
    let startPage = Math.max(this.currentPage - 1, 1);
    let endPage = startPage + visiblePages - 1;

    if (endPage > this.pageNumbers.length) {
      endPage = this.pageNumbers.length;
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }
    return this.pageNumbers.slice(startPage - 1, endPage);
  }
}
