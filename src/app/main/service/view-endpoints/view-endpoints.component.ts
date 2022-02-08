import { Component, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-view-endpoints',
  templateUrl: './view-endpoints.component.html',
  styleUrls: ['./view-endpoints.component.scss'],
  animations: [
    trigger('toastMessage', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(300, style({ opacity: 0 }))
      ]),
    ])
  ]
})
export class ViewEndpointsComponent implements OnInit {

  @Input() title!: string;
  successToast!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.successToast = false;
    setTimeout(() => {
      this.successToast = true;
    }, 1500);
  }

  closeToast(): void {
    this.successToast = true;
  }
}
