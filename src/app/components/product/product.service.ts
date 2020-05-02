import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Product } from '../product/product.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = 'http://localhost:3001/products';
  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMsg(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition:'right',
      verticalPosition: 'top',
      panelClass: isError? ['msg-error']: ['msg-success']
    })
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(err=>this.handlerErro(err))
    );
  }
  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(err=>this.handlerErro(err))
    );
  }
  readById(id: string):Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(err=>this.handlerErro(err))
    );
  }
  update(product: Product):Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url,product).pipe(
      map(obj => obj),
      catchError(err=>this.handlerErro(err))
    );
  }

  delete(id: number):Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(err=>this.handlerErro(err))
    );
  }

  handlerErro(err: any): Observable<any>{
    console.log(err);
    this.showMsg('Ocorreu um erro na operação! :(',true)
    return EMPTY;//observable do tipo vazio
  }
}
