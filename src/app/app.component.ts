import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'optimization-messages';
}
