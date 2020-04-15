import { Component, OnInit, Input } from '@angular/core';
import { MDFormControl as MDFormControl, MDSelectFormControl as MDSelectFormControl, MDInputFormControl as MDInputFormControl } from 'src/app/models/md-form-model';

@Component({
  selector: 'app-md-form-control',
  templateUrl: './md-form-control.component.html',
  styleUrls: ['./md-form-control.component.css']
})
export class MDFormControlComponent implements OnInit {

  @Input() public control: MDFormControl;

  constructor() { }

  public ngOnInit() {
  }

  public isSelect(): MDSelectFormControl | null {
    return this.control instanceof MDSelectFormControl ? this.control as MDSelectFormControl : null;
  }

  public isInput(): MDInputFormControl | null {
    return this.control instanceof MDInputFormControl ? this.control as MDInputFormControl : null;
  }

}
