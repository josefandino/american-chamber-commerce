import { Component } from '@angular/core';

import { AngularModule, MaterialModule } from '@shared/modules';

@Component({
    selector: 'app-table-weks',
    templateUrl: './table-weks.component.html',
    styleUrl: './table-weks.component.scss',
    imports: [AngularModule, MaterialModule]
})
export class TableWeksComponent {}
