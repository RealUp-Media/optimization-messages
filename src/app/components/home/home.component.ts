import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { AnimateModule } from 'primeng/animate';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AnimateModule,
    AccordionModule,
    ButtonModule,
    StepperModule,
    SplitterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  activeIndex: number | number[] = 0;

  activeIndexChange(index: number | number[]) {
    this.activeIndex = index;
  }
}
