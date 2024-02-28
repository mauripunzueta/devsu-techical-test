import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() currentPage = 1;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  productsNum = 0;
  selectNum = 5;
  pageNumbers: number[] = [];
  searchTerm: string = '';
  searchControl: FormControl = new FormControl('');
  selectNumForm: FormControl = new FormControl('5');
  dropdownIndex: number | null = null;

  constructor(private router: Router, private service: ProductsService) {}

  ngOnInit() {
    this.onSubscribe();
  }

  onSubscribe() {
    this.service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
        this.productsNum = this.products.length;
        this.pageNumbers = Array(Math.ceil(this.filteredProducts.length / this.selectNum)).fill(0).map((x, i) => i + 1);
      },
    });

    this.selectNumForm.valueChanges.subscribe(value => {
      this.selectNum = value;
      this.currentPage = 1;
      this.updatePageNumbers();
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.filterProducts();
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updatePageNumbers();
    this.currentPage = 1;
  }

  updatePageNumbers() {
    this.productsNum = this.filteredProducts.length;
    this.pageNumbers = Array(Math.ceil(this.productsNum / this.selectNum)).fill(0).map((x, i) => i + 1);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
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

  handleCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
  }

  toggleDropdown(index: number) {
    this.dropdownIndex = this.dropdownIndex === index ? null : index;
  }

  editProduct(product: Product) {

  }

  handleConfirmation(result: boolean) {
    if (result) {
      this.currentPage = 1;
      this.dropdownIndex = null;
      this.onSubscribe();
    }
  }

}
