import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularModule } from '@shared/modules';

@Component({
    selector: 'app-breadcams',
    imports: [AngularModule],
    templateUrl: './breadcams.component.html',
    styleUrl: './breadcams.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcamsComponent {}
