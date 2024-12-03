import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { loadProducts, Product } from '../../store/products/product.reducer';
import { Store } from '@ngrx/store';
import { selectAllProducts } from '../../store/products/product.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectAllProducts);
  }

  ngOnInit(): void {
    console.log('Dispatching loadProducts');
    this.store.dispatch(loadProducts());
  }
}
