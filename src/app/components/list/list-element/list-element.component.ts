import {
  Component,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { Question } from '../../../interfaces/question.interface';
import { QuestionType } from '../../../enums/question-type.enum';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-list-element',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatButton,
  ],
  templateUrl: './list-element.component.html',
  styleUrl: './list-element.component.scss',
})
export class ListElementComponent implements OnInit {
  public listElement: InputSignal<Question> = input.required<Question>();
  public save: OutputEmitterRef<Question> = output<Question>();

  public answerFormControl = new FormControl<null | boolean | string>(null);
  public readonly questionType = QuestionType;

  public ngOnInit(): void {
    this.initialAnswer();
  }

  public get isAnswered(): boolean {
    return this.listElement().answer !== null;
  }

  public onSave(): void {
    this.save.emit({
      ...this.listElement(),
      answer: this.answerFormControl.value,
    });
  }

  private initialAnswer(): void {
    this.answerFormControl.setValue(this.listElement().answer);

    if (this.isAnswered) {
      this.answerFormControl.disable();
    }
  }
}
