import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

// Imports

import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CardModule } from 'primeng/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('crowdposting', [
      // Crowdposting
      state(
        'open',
        style({
          opacity: 1,
          filter: 'drop-shadow(1px 1px 20px #d8007f)',
          transform: 'scale(1.5)',
          left: '30%',
          zIndex: 1,
        })
      ),
      state(
        'close',
        style({
          opacity: 0.3,
          zIndex: 0,
        })
      ),
      transition('open => close', [animate('0.7s ease-in-out')]),
      transition('close => open', [animate('0.7s ease-in-out')]),
    ]),

    trigger('ugc', [
      // UGC
      state(
        'open',
        style({
          opacity: 1,
          filter: 'drop-shadow(1px 1px 20px #d8007f)',
          transform: 'scale(1.5)',
          left: '30%',

          zIndex: 1,
        })
      ),
      state(
        'close',
        style({
          opacity: 0.3,
          zIndex: 0,
        })
      ),
      transition('open => close', [animate('0.7s ease-in-out')]),
      transition('close => open', [animate('0.7s ease-in-out')]),
    ]),
    trigger('brand', [
      // UGC
      state(
        'open',
        style({
          opacity: 1,
          filter: 'drop-shadow(1px 1px 20px #d8007f)',
          transform: 'scale(1.5)',
          left: '30%',

          zIndex: 1,
        })
      ),
      state(
        'close',
        style({
          opacity: 0.3,
          zIndex: 0,
        })
      ),
      transition('open => close', [animate('0.7s ease-in-out')]),
      transition('close => open', [animate('0.7s ease-in-out')]),
    ]),

    trigger('row-crowdposting', [
      // UGC
      state(
        'open',
        style({
          transform: 'rotate(-90deg)',
        })
      ),
      state('close', style({})),
      transition('open => close', [animate('0.7s ease-in-out')]),
      transition('close => open', [animate('0.7s ease-in-out')]),
    ]),

    trigger('row-ugc', [
      // UGC
      state(
        'open',
        style({
          transform: 'rotate(-90deg)',
        })
      ),
      state('close', style({})),
      transition('open => close', [animate('0.7s ease-in-out')]),
      transition('close => open', [animate('0.7s ease-in-out')]),
    ]),

    trigger('row-brand', [
      // UGC
      state(
        'open',
        style({
          transform: 'rotate(-90deg)',
        })
      ),
      state('close', style({})),
      transition('open => close', [animate('0.7s ease-in-out')]),
      transition('close => open', [animate('0.7s ease-in-out')]),
    ]),
  ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    MultiSelectModule,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
    CalendarModule,
    AccordionModule,
    CarouselModule,
    InputTextModule,
    FloatLabelModule,
    InputTextareaModule,
    DropdownModule,
    RippleModule,
    SelectButtonModule,
  ],
})
export class HomeComponent {
  imagen = 'assets/images/MOCKUP CELULAR Brand.png';

  showImageUGC: boolean;
  showImageCrowdposting: boolean;
  showImageBrand: boolean;

  constructor(private router: Router) {
    (this.showImageUGC = false),
      (this.showImageCrowdposting = false),
      (this.showImageBrand = false);
  }

  ngOnInit(): void {}

  linkUCG() {
    const url = `ugc`;
    window.open(url, '_self');
    // window.open('/app-realup-front/ugc', '_self');
  }

  linkCrowdposting() {
    const url = `crowdposting`;
    window.open(url, '_self');
    // window.open('/app-realup-front/crowdposting', '_self');
  }

  linkBrand() {
    const url = `brand-ambassador`;
    window.open(url, '_self');
    // window.open('/app-realup-front/brand-ambassador', '_self');
  }

  isOpenCrowdposting = true;
  isOpenUGC = false;
  isOpenBrand = false;
  isOpenRowCrowdposting = false;
  isOpenRowUGC = false;
  isOpenRowBrand = false;

  toggleCrowdposting() {
    this.isOpenRowCrowdposting = true;
    this.isOpenRowUGC = false;
    this.isOpenRowBrand = false;
    this.isOpenCrowdposting = true;
    this.isOpenUGC = false;
    this.isOpenBrand = false;
  }

  toggleUGC() {
    this.isOpenRowCrowdposting = false;
    this.isOpenRowUGC = true;
    this.isOpenRowBrand = false;
    this.isOpenUGC = true;
    this.isOpenBrand = false;
    this.isOpenCrowdposting = false;
  }

  toggleBrand() {
    this.isOpenRowCrowdposting = false;
    this.isOpenRowUGC = false;
    this.isOpenRowBrand = true;
    this.isOpenUGC = false;
    this.isOpenBrand = true;
    this.isOpenCrowdposting = false;
  }

  // Nuevo diseño
}
