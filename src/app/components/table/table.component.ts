import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from './TableColumn';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  
  public tableDataSource = new MatTableDataSource();
  public displayedColumns!: string[];
  @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator;

  @Input() isPageable = false;
  @Input() isFilterable = false;
  @Input() tableColumns!: TableColumn[];
  @Input() rowActionIcon!: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteButton = new EventEmitter();
  @Output() editButton = new EventEmitter();

  onDelete(id:any) {
		this.deleteButton.emit(id);
	}

  onEdit(id:any) {
		this.editButton.emit(id);
	}
  
  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any) {
    this.setTableDataSource(data);
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.rowActionIcon) {
      this.displayedColumns = [this.rowActionIcon, ...columnNames];
    } else {
      this.displayedColumns = columnNames;
    }
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }


  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = this.matPaginator;
  }


  emitRowAction(row: any) {
    this.rowAction.emit(row);
  }

}
