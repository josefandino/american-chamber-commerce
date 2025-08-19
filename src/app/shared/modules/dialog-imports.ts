import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BannerComponent } from '@shared/components/banner/banner.component';
import { FooterModalComponent } from '@shared/components/footer-modal/footer-modal.component';

export const dialogImports = [
  BannerComponent,
  MatDialogModule,
  MatIconModule,
  MatButtonModule,
  FooterModalComponent,
];
