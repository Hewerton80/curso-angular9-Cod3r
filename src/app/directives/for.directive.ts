import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})
export class ForDirective implements OnInit{

  @Input('myForEm') 
  numeros: number[];

  @Input('myForUsando') 
  textoQualquer: string;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ) { }

  ngOnInit(): void{
    console.log(this.numeros);
    console.log(this.textoQualquer);
    for(let n of this.numeros){
      this.container.createEmbeddedView(this.template,{
        $implicit: n
      });
    }
    /* 
      foi criado u template para cada repetição do laço
      e dentro desse contexto do template eu quer que 
      haja um valor implicito
    */
  }

}
