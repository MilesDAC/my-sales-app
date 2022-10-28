import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Category } from './category.dto';
import { CategoryService } from './category.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: [`
    .full-width-table {
      width: 100%;
    }
    
  `]
})
export class CategoriesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Category>;
  
  dataSource!: MatTableDataSource<Category>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // RE_ADD DESCRIPTION LATER
  displayedColumns = ['id', 'name', 'description', 'actions'];

  showForm: boolean = false;
  showLoading: boolean = false;
  showLoadingForm: boolean = false;
  
  category!: Category;

  constructor(private categoryService: CategoryService) { }
  
  ngOnInit(): void {
    this.refreshData();
  }
  
  onBackForm(){
    this.showForm = false;
    this.refreshData();
  }

  onSave(category:Category){
    console.log("save on category.component.ts", category)
    this.showLoadingForm = true;

    this.categoryService.save(category).subscribe((categorySaved => {
      console.log('Category saved:', categorySaved);
      this.showForm = false;
      this.refreshData();
      this.showLoadingForm = false;
    }));
  }
  
  onEditCategoryClick(category:Category){
    console.log("edit category", category)
    this.showForm = true;
    this.category = category;
  }
  
  onNewCategoryClick(){
    this.category = {
      id: 0,
      name: '',
      description: ''
    }
    this.showForm = true;
  }

  onDeleteCategoryClick(category:Category){
    console.log("delete category", category)

    if(confirm(`Delete "${category.name}" with id ${category.id} ?`)){
      this.categoryService.delete(category.id).subscribe( 
        () => this.refreshData()
      )
    }
  }

  async refreshData() {
    this.showLoading = true;

    /* 
    this.categoryService.getAll().subscribe(
      categories => {
        this.dataSource = new MatTableDataSource(categories);
        //this.table.dataSource = this.dataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.showLoading = false;
      }
    ) */
    try{
      const categories: Category[] = await lastValueFrom(
        this.categoryService.getAll()
      );
      this.dataSource = new MatTableDataSource(categories);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    } catch (error){
      console.log("jinkies!", error);
    } finally{
      this.showLoading = false;
    }
  }
}
