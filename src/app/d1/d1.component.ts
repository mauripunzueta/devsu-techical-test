import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-d1',
  templateUrl: './d1.component.html',
  styleUrl: './d1.component.css'
})

export class D1Component {
  @Input() currentPage = 1;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  productsNum = 0;
  selectNum = 5;
  pageNumbers: number[] = [];
  searchTerm: string = '';
  searchControl: FormControl = new FormControl('');
  selectNumForm: FormControl = new FormControl('5');

  constructor(private router: Router) {}

  ngOnInit() {
    this.selectNumForm.valueChanges.subscribe(value => {
      this.selectNum = value;
      this.currentPage = 1;
      this.updatePageNumbers();
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(200), // Wait for 200ms pause in events
      distinctUntilChanged() // Only emit if the current value is different than the last
    ).subscribe(term => {
      this.searchTerm = term;
      this.filterProducts();
    });
  }

  navigateToD2() {
    this.router.navigate(['/d2']);
  }

  handleProductsChange(products: Product[]) {
    this.products = products;
  }
  handleFilteredProductsChange(filteredProducts: Product[]) {
    this.filteredProducts = filteredProducts;
  }
  handleProductsNumChange(productsNum: number) {
    this.productsNum = productsNum;
  }
  handlePageNumbersChange(pageNumbers: number[]) {
    this.pageNumbers = pageNumbers;
  }
  handleCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
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

}
