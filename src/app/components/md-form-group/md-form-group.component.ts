import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MDFormControl as MDConfFormControl } from '../../models/md-form-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-md-form-group',
  templateUrl: './md-form-group.component.html',
  styleUrls: ['./md-form-group.component.css']
})
export class MDFormGroupComponent implements OnInit, OnDestroy {

  @Input() public configFormGroup: FormGroup;
  public toUnsubscribe: Array<Subscription> = [];

  constructor() { }

  public ngOnInit() {
    Object.values(this.configFormGroup.controls).forEach((c: MDConfFormControl) => {
      this.watchDependenciesChange(c);
    });
  }

  public get controlsAsValue() {
    return Object.values(this.configFormGroup.controls) as Array<MDConfFormControl>;
  }

  // clean at the end
  public ngOnDestroy(): void {
    this.toUnsubscribe.forEach(u => u.unsubscribe());
  }

  /**
   * Watch all other controls that input control depends on to update itself
   */
  private watchDependenciesChange(control: MDConfFormControl) {
    if (!!control.dependsOn) {
      control.dependsOn().forEach(dep => {
        this.toUnsubscribe.push(dep.valueChanges.subscribe(v => {
          control.onDependencyChange(control);
        }));
      });
      // trigger on initial load
      control.onDependencyChange(control);
    }
  }

}
