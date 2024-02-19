import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent implements OnInit {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() errorMessage!: string;
  @Input() input: number | string = '';
  @Output() inputChange = new EventEmitter<number | string>();

  inputId: number = Math.random() * 12345;
  ngOnInit(): void {}

  handleChange(e: any): void {
    this.input = e.target.value;
    this.inputChange.emit(this.input);
  }
}
