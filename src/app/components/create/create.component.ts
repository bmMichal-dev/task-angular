import { Component, inject, ViewChild } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import { QuestionType } from '../../enums/question-type.enum';
import { MockStoreService } from '../../../shared/service/mock-store.service';
import { CreateForm } from './interfaces/create-form.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { CreateDialogClose } from './enums/create-dialog-close.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [
    MatButton,
    MatCard,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatStepper,
    MatStep,
    MatStepperNext,
    MatStepLabel,
    MatStepperPrevious,
    MatCardHeader,
    MatCardTitle,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  @ViewChild('stepper') public stepper!: MatStepper;

  public questionFormType: FormGroup;
  public readonly listType = QuestionType;

  private readonly _dialog = inject(MatDialog);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _mockStoreService = inject(MockStoreService);

  public constructor() {
    this.questionFormType = this._formBuilder.nonNullable.group({
      firstStep: this._formBuilder.group({
        type: [null, Validators.required],
      }),
      secondStep: this._formBuilder.group({
        title: [null, Validators.required],
      }),
    });
  }

  public getStepAsFormGroup(step: string): FormGroup {
    return this.questionFormType.get(step) as FormGroup;
  }

  public save(): void {
    this._mockStoreService.save(this.questionFormType.value as CreateForm);
    this.openDialog();
  }

  private openDialog(): void {
    const dialogRef = this._dialog.open(CreateDialogComponent, {
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: CreateDialogClose | undefined) => {
        if (result === CreateDialogClose.goToList) {
          this._router.navigate(['/list']);
        } else if (result === CreateDialogClose.addNew) {
          this.questionFormType.reset();
          this.stepper.reset();
        }
      });
  }
}
