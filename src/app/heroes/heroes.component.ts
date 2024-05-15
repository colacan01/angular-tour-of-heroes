import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgFor, UpperCasePipe, NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

import { HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    UpperCasePipe,
    NgIf,
    MatTableModule,
    MatSortModule,
    HeroDetailComponent,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})

export class HeroesComponent implements AfterViewInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  // heros = HEROES;
  heros:Hero[] = [];
  
  selectedHero?:Hero;
  onSelect(hero:Hero): void {
    this.selectedHero = hero;
  }

  /* mat-table */  
  heroes = new MatTableDataSource(HEROES);
  displayCols:string[] = ['id', 'name'];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.getHeroes();  
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(h => this.heros = h);
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.heroes.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
