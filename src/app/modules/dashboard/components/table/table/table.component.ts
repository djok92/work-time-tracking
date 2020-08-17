import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { User } from 'src/app/classes/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PaginationData } from 'src/app/interfaces/pagination-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {
  @Input()
  dataSource: User[];
  @Input()
  tableColumnNames: string[];
  @Input()
  originalDataSourceLength: number;
  @Output()
  emitPaginatorEvent: EventEmitter<PaginationData> = new EventEmitter<PaginationData>();
  @Output()
  emitMoreDetailsEvent: EventEmitter<User> = new EventEmitter<User>();

  public matTableDataSource = new MatTableDataSource<User>();
  public paginationData: PaginationData = {
    length: null,
    pageSize: 10,
    previousPageIndex: 0,
    pageIndex: 0
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource.firstChange) {
      this.matTableDataSource = new MatTableDataSource<User>(this.dataSource);
      this.paginationData.length = this.originalDataSourceLength;
      setTimeout(() => {
        this.runEmitPaginatorEvent(this.paginationData);
      });
    }
  }

  public runEmitPaginatorEvent(paginationData: PaginationData): void {
    this.emitPaginatorEvent.emit(paginationData);
  }

  public runMoreDetailsEvent(user: User): void {
    this.emitMoreDetailsEvent.emit(user);
  }
}
