import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    id: null,
    name: '',
    price: null
  }
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.paramMap.get('id');
      this.productService.readById(id).subscribe(product=>{
        this.product = product;
      })
  }
  deleteProduct(): void{
    const id = this.product.id;
    this.productService.delete(id).subscribe(()=>{
      this.productService.showMsg('Produto removido com sucesso!');
      this.cancel();
    })
    
  }
  cancel(): void{
    this.router.navigate(['/products']);
  }

}
