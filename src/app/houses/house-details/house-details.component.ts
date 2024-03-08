import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HouseListService } from '../services/house-list.service';
import { HouseModel } from '../models/house.model';

@Component({
  selector: 'app-house-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './house-details.component.html',
  styleUrl: './house-details.component.scss',
})
export class HouseDetailsComponent implements OnInit {
  @Input() set id(id: string) {
    this.houseListService.loadHouseDetails(Number(id));
  }

  public house!: Signal<HouseModel | null>;
  public applyForm!: FormGroup;

  private houseListService = inject(HouseListService);
  private formBuilder = inject(FormBuilder);

  public ngOnInit(): void {
    this.initForm();
    this.house = this.houseListService.houseDetails;
  }

  public onApply(): void {
    if (this.applyForm.valid) {
      const { firstName = '', lastName = '', email } = this.applyForm.value;
      this.houseListService.submitApplication(firstName, lastName, email);
    }
  }

  private initForm(): void {
    this.applyForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
