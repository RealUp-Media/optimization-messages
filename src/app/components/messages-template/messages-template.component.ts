import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-messages-template',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    IconFieldModule,
    InputIconModule,
    CardModule,
    InputTextareaModule,
  ],
  templateUrl: './messages-template.component.html',
  styleUrl: './messages-template.component.css',
})
export class MessagesTemplateComponent {
  inputText: string = '';
  nombres: string[] = [];

  inputBrands: string = '';

  inputCampaing: string = '';

  inputAditionalText: string = '';

  inputNameManager: string = '';

  separarNombres() {
    this.nombres = this.inputText.split(',').map((nombre) => nombre.trim());
  }
}
