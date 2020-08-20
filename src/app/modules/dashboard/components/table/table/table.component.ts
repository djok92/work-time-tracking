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
import { FormGroup } from '@angular/forms';
import { SortData } from 'src/app/interfaces/sort-data';
import { MatSort } from '@angular/material/sort';
import { DisplayModeData } from 'src/app/interfaces/display-mode-data';

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
  tableForm: FormGroup;
  @Output()
  emitMoreDetailsEvent: EventEmitter<User> = new EventEmitter<User>();
  @Output()
  emitSearchValue: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  emitSortData: EventEmitter<SortData> = new EventEmitter<SortData>();
  @Output()
  emitDisplayMode: EventEmitter<DisplayModeData> = new EventEmitter<DisplayModeData>();
  @Output()
  emitDisplayAll: EventEmitter<DisplayModeData> = new EventEmitter<DisplayModeData>();

  public matTableDataSource = new MatTableDataSource<User>();
  public batchOfUsers: User[] = [];
  public paginationData: PaginationData = {
    length: null,
    pageSize: 10,
    previousPageIndex: 0,
    pageIndex: 0
  };
  public sortData: SortData = {
    active: null,
    direction: null
  };
  public displayActiveUsersMode = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource.currentValue) {
      this.sliceBatchOfUsers(
        this.dataSource,
        this.paginationData.pageIndex * this.paginationData.pageSize,
        this.paginationData.pageIndex * this.paginationData.pageSize + this.paginationData.pageSize
      );
      this.matTableDataSource = new MatTableDataSource<User>(this.batchOfUsers);
      this.sort.disableClear = true;
    }
  }

  public runMoreDetailsEvent(user: User): void {
    this.emitMoreDetailsEvent.emit(user);
  }

  public runEmitSearchValue(): void {
    this.emitSearchValue.emit(this.tableForm.value.searchValue);
  }

  public runEmitSort(sortData: SortData): void {
    this.sortData = { ...sortData };
    this.emitSortData.emit(sortData);
  }

  public runEmitDisplayMode(): void {
    this.displayActiveUsersMode = !this.displayActiveUsersMode;
    this.emitDisplayMode.emit({
      displayActiveUsersMode: this.displayActiveUsersMode,
      sortData: this.sortData
    });
  }

  public runEmitDisplayAll(): void {
    this.displayActiveUsersMode = null;
    this.emitDisplayAll.emit({
      displayActiveUsersMode: null,
      sortData: this.sortData
    });
  }

  public changePage(paginationData: PaginationData): void {
    this.paginationData = Object.assign({}, paginationData);
    this.sliceBatchOfUsers(
      this.dataSource,
      this.paginationData.pageIndex * this.paginationData.pageSize,
      this.paginationData.pageIndex * this.paginationData.pageSize + this.paginationData.pageSize
    );
  }

  private sliceBatchOfUsers(dataSource: User[], startIndex: number, endIndex: number): void {
    this.batchOfUsers = Object.assign([], dataSource.slice(startIndex, endIndex));
  }
}
