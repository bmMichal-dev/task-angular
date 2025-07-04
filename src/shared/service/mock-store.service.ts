import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { CreateForm } from '../../app/components/create/interfaces/create-form.interface';
import { Question } from '../../app/interfaces/question.interface';

@Injectable({ providedIn: 'root' })
export class MockStoreService {
  private list: WritableSignal<Question[]> = signal<Question[]>([]);

  public save(formValue: CreateForm) {
    this.list.update((list: Question[]) => {
      return [
        {
          title: formValue.secondStep.title,
          type: formValue.firstStep.type,
          answer: null,
        },
        ...list,
      ];
    });
  }

  public getList(): Signal<Question[]> {
    return this.list.asReadonly();
  }

  public updateList(listElement: Question) {
    this.list.update((list: Question[]) => {
      return list.map((element) =>
        element.title === listElement.title ? listElement : element,
      );
    });
  }
}
