import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CHAMBER_INFO } from '@shared/const/info-acc';

@Component({
  selector: 'app-footer-modal',
  imports: [MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './footer-modal.component.html',
  styleUrl: './footer-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterModalComponent {
  public whatsapp = CHAMBER_INFO.whatsapp;

  isEnglish = input<boolean>(false);
}
