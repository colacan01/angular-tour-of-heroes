import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { NgFor, UpperCasePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    NgFor,
    UpperCasePipe,
    NgIf,
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  constructor(
    public messageService: MessageService
  ) {}

}
