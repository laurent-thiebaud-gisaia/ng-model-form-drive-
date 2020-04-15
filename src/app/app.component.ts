import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MDSelectFormControl, MDInputFormControl } from './models/md-form-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'model-driven-form';

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {

    this.formGroup = formBuilder.group({
      name: new MDInputFormControl(
        '',
        'Layer name',
        'Layer is used to distinguish from other layers in ARLAS-exploration',
      ),
      layerMode: new MDSelectFormControl(
        '',
        'Layer mode',
        'Kind of layer',
        [
          { key: 'features', value: 'Features' },
          { key: 'features-metric', value: 'Features Metric' },
          { key: 'cluster', value: 'Cluster' }
        ]
      ),
      dependantField: new MDInputFormControl(
        '',
        'Dependant field',
        'Field displayed only with layer mode cluster',
        'number',
        {
          dependsOn: () => [this.layerMode],
          onDependencyChange: (control: MDInputFormControl) => {
            if (this.layerMode.value === 'cluster') {
              control.enable();
            } else {
              control.disable();
            }
          }
        }
      )
    });
  }

  get layerMode() {
    return this.formGroup.controls.layerMode as MDSelectFormControl;
  }
}
