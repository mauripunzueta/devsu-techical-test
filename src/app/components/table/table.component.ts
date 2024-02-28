import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  productsNum = 0;
  pageNumbers: number[] = [];
  @Input() currentPage = 1;
  @Input() selectNum = 5;
  @Output() productsChange = new EventEmitter<Product[]>();
  @Output() filteredProductsChange = new EventEmitter<Product[]>();
  @Output() productsNumChange = new EventEmitter<number>();
  @Output() pageNumbersChange = new EventEmitter<number[]>();

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.service.getProducts().subscribe({
      next: (data) => {
        this.products = data; this.productsChange.emit(this.products);
        this.filteredProducts = [...this.products]; this.filteredProductsChange.emit(this.filteredProducts);
        this.productsNum = this.products.length; this.productsNumChange.emit(this.productsNum);
        this.pageNumbers = Array(Math.ceil(this.filteredProducts.length / this.selectNum)).fill(0).map((x, i) => i + 1); this.pageNumbersChange.emit(this.pageNumbers);
      },
      error: (error) => {
        console.error('There was an error fetching the products!', error);
      },
      complete: () => {
        // Handle any cleanup or final steps after the stream completes, if necessary
        console.log('Products fetch completed');
      }
    });
  }

  handleCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
  }

}
