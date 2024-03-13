import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Signal,
  computed,
  effect,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import { debounceTime, distinctUntilChanged } from 'rxjs';

import { CityModel } from '@cities/models/city.model';
import { AddHouseService } from '@houses/services/add-house.service';
import { StateModel } from '@states/models/state.model';
import { AddHouseModel } from '@houses/models/add-house.model';
import { ServerErrorKeyEnum } from '@houses/enums/server-error-key.enum';

@Component({
  selector: 'app-add-house',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  providers: [AddHouseService],
  templateUrl: './add-house.component.html',
  styleUrl: './add-house.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddHouseComponent {
  private formBuilder = inject(FormBuilder);
  private addHouseService = inject(AddHouseService);
  private changeDetector = inject(ChangeDetectorRef);
  private router = inject(Router);
  private selectedCity!: Signal<string | CityModel>;
  private selectedState!: Signal<string>;
  private cities!: Signal<CityModel[]>;
  private states!: Signal<StateModel[]>;

  public addForm = this.getAddForm();
  public stateControl = new FormControl<string>('');
  public filteredCities!: Signal<CityModel[]>;
  public filteredStates!: Signal<StateModel[]>;

  constructor() {
    this.cities = this.addHouseService.cities;
    this.states = this.addHouseService.states;
    this.initCitySignals();
    this.initStateSignals();
    effect(() => {
      const errors = this.addHouseService.errors();
      if (errors[ServerErrorKeyEnum.Exist]) {
        const nameControl = this.addForm.get('name');
        nameControl?.setErrors({
          serverError: errors[ServerErrorKeyEnum.Exist],
        });
        this.changeDetector.detectChanges();
      }
    });
  }

  public displayFn(city: CityModel): string {
    return (city && city.name) || '';
  }

  public onAdd(): void {
    const { name, photoUrl, units, wifi, laundry, city, state } =
      this.addForm.value;
    const house: AddHouseModel = {
      name,
      photoUrl,
      availableUnits: units,
      wifi,
      laundry,
      cityId: city && city.cityId ? city.cityId : null,
      stateId: state.stateId,
      ownerId: 1,
    };

    this.addHouseService.addHouse(house).subscribe({
      next: () => this.router.navigate(['houses']),
    });
  }

  private getAddForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      photoUrl: ['', [Validators.required]],
      units: [null, Validators.required],
      wifi: [false],
      laundry: [false],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  private initCitySignals(): void {
    this.selectedCity = toSignal(
      (this.addForm.get('city') as FormControl).valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(300)
      ),
      { initialValue: '' }
    );

    this.filteredCities = computed(() => {
      const selectedCity = this.selectedCity();
      if (selectedCity && typeof selectedCity === 'string') {
        return this.cities().filter(
          this.getFilteredItems<CityModel>(selectedCity)
        );
      } else {
        return this.cities();
      }
    });
  }

  private initStateSignals(): void {
    this.selectedState = toSignal(
      (this.stateControl as FormControl).valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(300)
      ),
      { initialValue: '' }
    );

    this.filteredStates = computed(() => {
      const selectedState = this.selectedState();
      if (selectedState && typeof selectedState === 'string') {
        return this.states().filter(
          this.getFilteredItems<StateModel>(selectedState)
        );
      } else {
        return this.states();
      }
    });
  }

  private getFilteredItems<T extends { name: string }>(
    name: string
  ): (item: T) => boolean {
    return (item: T) =>
      item.name.toLowerCase().includes(name.trim().toLowerCase());
  }
}
