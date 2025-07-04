import { Component, inject, Signal } from '@angular/core';
import { MockStoreService } from '../../../shared/service/mock-store.service';
import { Question } from '../../interfaces/question.interface';
import { ListElementComponent } from './list-element/list-element.component';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-list',
  imports: [ListElementComponent, MatCard, MatCardHeader, MatCardTitle],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  public list: Signal<Question[]>;

  private readonly _mockStoreService = inject(MockStoreService);

  public constructor() {
    this.list = this._mockStoreService.getList();
  }

  public onSave(listElement: Question): void {
    this._mockStoreService.updateList(listElement);
  }
}
