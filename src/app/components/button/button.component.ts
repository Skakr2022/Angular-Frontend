import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {


  @Input() text : string ="";
  @Input() apparence? : string ;
  @Input() prefixIcon! : string ;
  @Input() SuffixIcon! : string ;
  @Input() color: string = '0068B4';
  @Input() type: string = 'button';
  @Output() btnClick = new EventEmitter();
  @Input() isDisabled = false;

	constructor() {}

	onClick() {
		this.btnClick.emit();
	}

}
