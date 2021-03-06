import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SavedViewConfig } from 'src/app/data/saved-view-config';
import { GENERAL_SETTINGS } from 'src/app/data/storage-keys';
import { DocumentListViewService } from 'src/app/services/document-list-view.service';
import { SavedViewConfigService } from 'src/app/services/saved-view-config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingsForm = new FormGroup({
    'documentListItemPerPage': new FormControl(+localStorage.getItem(GENERAL_SETTINGS.DOCUMENT_LIST_SIZE) || GENERAL_SETTINGS.DOCUMENT_LIST_SIZE_DEFAULT)
  })

  constructor(
    private savedViewConfigService: SavedViewConfigService,
    private documentListViewService: DocumentListViewService
  ) { }

  ngOnInit(): void {
  }

  deleteViewConfig(config: SavedViewConfig) {
    this.savedViewConfigService.deleteConfig(config)
  }

  saveSettings() {
    localStorage.setItem(GENERAL_SETTINGS.DOCUMENT_LIST_SIZE, this.settingsForm.value.documentListItemPerPage)
    this.documentListViewService.updatePageSize()
  }
}
