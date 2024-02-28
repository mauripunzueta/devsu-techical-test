import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  isVisible = false;
  @Input() productName!: string;
  @Input() productId!: string;
  @Output() confirmEvent = new EventEmitter<boolean>();

  constructor(private service: ProductsService) {}

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  confirm() {
    this.service.deleteProduct(this.productId);
    this.confirmEvent.emit(true);
    this.hide();
  }

  cancel() {
    this.hide();
  }
}
