import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgTemplateOutlet, MatButtonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() public img!: string;
  @Input() public title!: string;
  @Input() public set subtitle(subtitle: string | TemplateRef<unknown | null>) {
    if (subtitle instanceof TemplateRef) {
      this.subtitleAsRef = subtitle;
    } else {
      this.subtitleAsString = subtitle;
    }
  }
  @Input() public btnLabel!: string;
  @Output() public btnClick = new EventEmitter<void>();

  public subtitleAsString!: string;
  public subtitleAsRef!: TemplateRef<unknown>;
  public isClickable = false;

  public onBtnClick(): void {
    this.btnClick.emit();
  }
}
