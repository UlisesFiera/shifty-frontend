import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, FormsModule ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  protected value = "";
}
