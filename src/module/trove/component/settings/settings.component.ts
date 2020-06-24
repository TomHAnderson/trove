import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@module/data/service/settings.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  private settings;
  public form: FormGroup;

  constructor(
    private settingsService: SettingsService
  ) {
    this.settingsService.get().subscribe(settings => {
      this.settings = settings;

      this.form = new FormGroup({
        showEtreeDbSouceLink: new FormControl(this.settings?.showEtreeDbSouceLink),
      });

      this.form.valueChanges.subscribe(value => {
        this.settings = value;
        this.settingsService.set(value);
      });
    });
  }
}
