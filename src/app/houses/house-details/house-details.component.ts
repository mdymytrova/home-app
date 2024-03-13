import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HouseModel } from '@houses/models/house.model';
import { HouseDetailsService } from '@houses/services/house-details.service';

@Component({
  selector: 'app-house-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [HouseDetailsService],
  templateUrl: './house-details.component.html',
  styleUrl: './house-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HouseDetailsComponent implements OnInit {
  @Input() set id(id: string) {
    this.houseDetailsService.loadHouseDetails(Number(id));
  }

  public house!: Signal<HouseModel | null>;
  public applyForm!: FormGroup;

  private houseDetailsService = inject(HouseDetailsService);
  private formBuilder = inject(FormBuilder);

  public ngOnInit(): void {
    this.initForm();
    this.house = this.houseDetailsService.houseDetails;
  }

  public onApply(): void {
    if (this.applyForm.valid) {
      const { firstName = '', lastName = '', email } = this.applyForm.value;
      this.houseDetailsService.submitApplication(firstName, lastName, email);
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
