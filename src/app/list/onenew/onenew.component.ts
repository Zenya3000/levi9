import { ListService } from './../../services/list.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit  } from '@angular/core';
import { Directive } from '@angular/core';
import { trigger, state, style, stagger, transition, animate, keyframes, useAnimation, query } from '@angular/animations';
import { fadeIn, fadeOut, lightSpeedIn, slideInDown, slideInUp } from 'ng-animate';
@Component({
  selector: 'app-onenew',
  templateUrl: './onenew.component.html',
  styleUrls: ['./onenew.component.sass'],
  providers: [ListService],
  animations: [
    trigger('contentAnimation', [
      // state( 'articles', style({})),
      transition('void => *', [
        useAnimation(fadeIn)
        // animate('1000ms', style({transition: "400ms ease", "max-height": '100%', }))
      ]),
      transition('* => void', [
        useAnimation(fadeOut)
        // style({height: '*',}),
        // animate('400ms', style({"max-height": '*'}))
      ])
    ])
  ],
})
export class OnenewComponent implements OnInit {
  @Input() index;
  @Input() title;
  @Input() apiUrl;
  @Input() webUrl;
  aNode: any = [];
  myStyles = {};
  mark: boolean = false;
  autoHeight: number = 0;
  maxHeight: number = 0;
  isCollapsed: boolean = false;
  heightDiv;
  private value;
  article: any;
  item = [];
  constructor(private ls: ListService,private elementRef: ElementRef) { }

  ngOnInit() {
  }
  ngOnChanges(article){
    console.log('changes', article)
  }
  
  getArticle(){
    this.mark = !this.mark;
    // console.log('mark', this.mark);
    if(!this.article){
      this.autoHeight = 20;
      this.ls.getArticle(this.apiUrl).then(
        (res) => { 
          this.value = Object.keys(res).map(key => res[key])
          if(this.value[0].status == 'ok'){
            this.value.forEach(element => {
              if( element.content != null){
                this.article = element.content;
                console.log('!!', this.article)
                
                setTimeout(() => {
                  var test =  document.getElementById('x' + this.index)
                  this.autoHeight = test.clientHeight;
                }, 1);
                

                  
                


                // let currentHeight = this.elementRef.nativeElement.getElementsByClassName('getHeight').offsetHeight;
                // console.log('g', currentHeight)
                // this.autoHeight = currentHeight + "px";
                // //collapsable only if the contents make container exceed the max height
                // if (currentHeight >= this.maxHeight) {
                //     this.isCollapsed = true;
                //     this.isCollapsable = true;
                // }

              }


            });
          }
         },
        (err) => { console.log('error', err) }
      )
    }
    this.isCollapsed = !this.isCollapsed;

    // console.log("this.isCollapsed", this.isCollapsed);

   
  //   console.log('111', test);
  // setTimeout(function(){
  //   for(let x of test){
  //     // console.log('x', x);
  //     var currentHeight = x.offsetHeight; 
  //     console.log('CH', currentHeight)
  //     this.autoHeight = currentHeight + "px";
  //     console.log('AH', this.autoHeight)
  //     console.log('true?', currentHeight >= 40)
  //     if (currentHeight >= 40) {
  //           this.isCollapsed = true;

  //       } else {
  //         this.isCollapsed = false;
  //       }
  //   }
  // }, 100);
  }
  
//   ngAfterViewInit() {
//     // Inportant !!
//     // wait a tick to avoid one-time devMode
//     // unidirectional-data-flow-violation error
//     setTimeout(_ => {
//             let currentHeight = this.elementRef.nativeElement.getElementsByClassName('content_of_acc')[0].offsetHeight;
//             console.log('g', currentHeight)
//             this.autoHeight = currentHeight + "px";
//             //collapsable only if the contents make container exceed the max height
//             if (currentHeight >= this.maxHeight) {
//                 this.isCollapsed = true;
//                 this.isCollapsable = true;
//             }
//         }
//     );
// }
}
