import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../../store/products/product.reducer';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      price: 100,
      stock: 10,
      imageUrl: 'https://example.com/image1.jpg',
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'Product 2',
      price: 200,
      stock: 5,
      imageUrl: 'https://example.com/image2.jpg',
      category: 'Home',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all products', () => {
    service.getAllProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should add a new product', () => {
    const newProduct: Product = {
      id: '3',
      name: 'Product 3',
      price: 300,
      stock: 20,
      imageUrl: 'https://example.com/image3.jpg',
      category: 'Fashion',
    };

    service.addProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(newProduct);
  });

  it('should remove a product by ID', () => {
    const productId = '1';

    service.removeProduct(productId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/products/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
