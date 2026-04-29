import { Component, OnInit } from '@angular/core';
import { UiStateService } from '../header/uiState.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  imports: [CommonModule],
  templateUrl: './forbidden.html',
  styleUrl: './forbidden.scss',
})
export class ForbiddenComponent
{

}
