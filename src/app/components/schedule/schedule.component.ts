import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ScheduleService } from '../../services/schedule.service';

interface Schedule {
  id?: string;
  name?: string;
  link?: string;
  contentType?: string;
  outboundLink?: string;
  actualReleaseDate?: string;
  expectedReleaseDate?: string;
}
@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [TableModule, InputTextModule, CommonModule, FormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent {
  constructor(private scheduleService: ScheduleService) {}

  schedules!: Schedule[];

  ngOnInit() {
    this.schedules = this.scheduleService.getScheduleData();
  }
}
