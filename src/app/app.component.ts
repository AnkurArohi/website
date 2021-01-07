import { AfterViewInit, Component, ElementRef, Input, Renderer2, SystemJsNgModuleLoader, ViewChild , OnInit} from '@angular/core';
import { SelectMultipleControlValueAccessor,NgForm } from '@angular/forms';
import { logging } from 'protractor';
import { timer } from 'rxjs';
import { SubscribeService } from '../app/subscribe.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  subscribeData: any = <any>{};
  @ViewChild("textElement")
  textElement!: ElementRef;
  @ViewChild("blinkElement")
  blinkElement!: ElementRef;

  @Input() wordArray: string[] = [
    "a sustainable future",
    "a hassle free, completely automated portfolio",
    "profitable and highly effective trading algorithms"
  ];
  @Input() textColor = "black";
  @Input() fontSize = "35px";
  @Input() blinkWidth = "6px";
  @Input() typingSpeedMilliseconds = 60;
  @Input() deleteSpeedMilliseconds = 60;

  private i = 0;
  title: any;
  
  constructor(private renderer: Renderer2,
    private subscribeService:SubscribeService) {}
    
    
  ngOnInit() {}
  subscribe(subscribeForm: NgForm) {
    if (subscribeForm.invalid) {
        return;
      }
      this.subscribeService.subscribeToList(this.subscribeData)
        .subscribe(res => {
          alert('Thank you for subscribing!');
        }, (err: any) => {
          console.log(err);
        })
  }
  
  ngAfterViewInit(): void {
    this.initVariables();
    this.typingEffect();
  }

  private initVariables(): void {
    this.renderer.setStyle(
      this.textElement.nativeElement,
      "color",
      this.textColor
    );
    this.renderer.setStyle(
      this.textElement.nativeElement,
      "font-size",
      this.fontSize
    );
    this.renderer.setStyle(this.textElement.nativeElement, "padding", "0.1em");

    this.renderer.setStyle(
      this.blinkElement.nativeElement,
      "border-right-width",
      this.blinkWidth
    );
    this.renderer.setStyle(
      this.blinkElement.nativeElement,
      "border-right-color",
      this.textColor
    );
    this.renderer.setStyle(
      this.blinkElement.nativeElement,
      "font-size",
      this.fontSize
    );
  }

  private typingEffect(): void {
    const word = this.wordArray[this.i].split("");

    const loopTyping = () => {
  
      if (word.length > 0) {

        this.textElement.nativeElement.innerHTML += word.shift();
      } else {
        setTimeout(() => {
        this.deletingEffect();},400);
        
        return;
      }
      
      setTimeout(loopTyping, this.typingSpeedMilliseconds);
    };
    loopTyping();
  }

  private deletingEffect(): void {
    const word = this.wordArray[this.i].split("");
    
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        this.textElement.nativeElement.innerHTML = word.join("");
      } else {
        if (this.wordArray.length > this.i + 1) {
          this.i++;
        } else {
          this.i = 0;
        }
        this.typingEffect();
        return false;
      }
      setTimeout(loopDeleting, this.deleteSpeedMilliseconds);
      return
    };
    loopDeleting();
  }
}


